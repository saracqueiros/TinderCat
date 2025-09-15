import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { Gesture, GestureDetector } from 'react-native-gesture-handler';
  import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
  import theme from '../theme/theme';
  
  const SWIPE_THRESHOLD = theme.screen.width * 0.25;
  
  type Props<T> = {
    data: T[];
    renderCard: (item: T) => React.ReactNode;
    onSwipeLeft?: (item: T) => void;
    onSwipeRight?: (item: T) => void;
    onEndReached?: () => void;
  };
  
  export type SwipeDeckRef = {
    swipeLeft: () => void;
    swipeRight: () => void;
  };
  
  const SWIPE_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
  } as const;
  
  type SwipeDirection = typeof SWIPE_DIRECTION[keyof typeof SWIPE_DIRECTION];
  
  function SwipeDeck<T extends { id: string }>(
    { data, renderCard, onSwipeLeft, onSwipeRight, onEndReached }: Props<T>,
    ref: React.Ref<SwipeDeckRef>
  ) {
    const [index, setIndex] = useState(0);
  
    const dataLengthRef = useRef(data.length);
    const firstItemIdRef = useRef(data[0]?.id);
  
    useEffect(() => {
      if (data.length > 0 && data[0]?.id !== firstItemIdRef.current) {
        setIndex(0);
        firstItemIdRef.current = data[0]?.id;
      }
      dataLengthRef.current = data.length;
    }, [data]);
  
    const top = data[index];
    const next = data[index + 1];
  
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isAnimatingOut = useSharedValue(false);
  
    const topOpacity = useSharedValue(1);
  
    const endTriggerForLengthRef = useRef<number | null>(null);
  
    const advance = useCallback(
      (dir: SwipeDirection, item: T) => {
        if (dir === SWIPE_DIRECTION.LEFT) onSwipeLeft?.(item);
        else onSwipeRight?.(item);
        setIndex((i) => i + 1);
      },
      [onSwipeLeft, onSwipeRight]
    );
  
    const animateSwipe = useCallback(
      (direction: SwipeDirection) => {
        if (isAnimatingOut.value || !top) return;
  
        isAnimatingOut.value = true;
        const toX =
          (direction === SWIPE_DIRECTION.RIGHT ? 1 : -1) *
          theme.screen.width *
          1.2;
  
        translateX.value = withTiming(toX, { duration: 200 }, () => {
          'worklet';
          runOnJS(advance)(direction, top as T);
        });
      },
      [advance, top]
    );
  
    const swipeLeft = useCallback(() => {
      animateSwipe(SWIPE_DIRECTION.LEFT);
    }, [animateSwipe]);
  
    const swipeRight = useCallback(() => {
      animateSwipe(SWIPE_DIRECTION.RIGHT);
    }, [animateSwipe]);
  
    useImperativeHandle(
      ref,
      () => ({
        swipeLeft,
        swipeRight,
      }),
      [swipeLeft, swipeRight]
    );
  
    useEffect(() => {
      const nearEnd = index >= data.length - 2; // penúltimo
      if (nearEnd && endTriggerForLengthRef.current !== data.length) {
        endTriggerForLengthRef.current = data.length;
        onEndReached?.();
      }
    }, [index, data.length, onEndReached]);
  
    useEffect(() => {
      // Start new top invisible, then fade in quickly to hide any layout blink
      translateX.value = 0;
      translateY.value = 0;
  
      topOpacity.value = withTiming(1, { duration: 160 });
      isAnimatingOut.value = false;
    }, [index, topOpacity, translateX, translateY, isAnimatingOut]);
  
    const pan = useMemo(
      () =>
        Gesture.Pan()
          .onUpdate((e) => {
            if (isAnimatingOut.value) return;
            translateX.value = e.translationX;
            translateY.value = e.translationY;
          })
          .onEnd((e) => {
            if (isAnimatingOut.value) return;
  
            const dx = translateX.value;
            const shouldDismiss =
              Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(e.velocityX) > 800;
  
            if (!shouldDismiss) {
              translateX.value = withSpring(0);
              translateY.value = withSpring(0);
              return;
            }
  
            isAnimatingOut.value = true;
            const dir: SwipeDirection =
              dx > 0 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT;
  
            const toX =
              (dir === SWIPE_DIRECTION.RIGHT ? 1 : -1) *
              theme.screen.width *
              1.2;
  
            translateX.value = withTiming(toX, { duration: 200 }, () => {
              'worklet';
              runOnJS(advance)(dir, top as T);
            });
          }),
      [advance, top?.id]
    );
  
    const topStyle = useAnimatedStyle((): any => {
      const rotate = interpolate(
        translateX.value,
        [-theme.screen.width, 0, theme.screen.width],
        [-15, 0, 15],
        Extrapolation.CLAMP
      );
      return {
        opacity: topOpacity.value,
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate: `${rotate}deg` },
        ],
      };
    });
  
    const nextStyle = useAnimatedStyle((): any => {
      // As you drag more, scale and opacity of the next card increase.
      const progress = isAnimatingOut.value ? SWIPE_THRESHOLD : Math.abs(translateX.value);
      const scale = interpolate(
        progress,
        [0, SWIPE_THRESHOLD],
        [0.95, 1],
        Extrapolation.CLAMP
      );
      const opacity = interpolate(
        progress,
        [0, SWIPE_THRESHOLD],
        [0.6, 1],
        Extrapolation.CLAMP
      );
      return { transform: [{ scale }], opacity };
    });
  
    if (!top) return <View style={styles.container} />;
  
    return (
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          {next && (
            <Animated.View
              key={`next-${next.id}`}
              pointerEvents="none"
              style={[styles.card, styles.nextCard, nextStyle]}
            >
              {renderCard(next)}
            </Animated.View>
          )}
          <Animated.View
            key={`top-${top.id}`}
            style={[styles.card, styles.topCard, topStyle]}
          >
            {renderCard(top)}
          </Animated.View>
        </View>
      </GestureDetector>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'center',
    },
    card: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backfaceVisibility: 'hidden',
    },
    topCard: {
      zIndex: 2,
    },
    nextCard: {
      zIndex: 1,
    },
  });
  
  export default forwardRef(SwipeDeck) as <T extends { id: string }>(
    props: Props<T> & { ref?: React.Ref<SwipeDeckRef> }
  ) => React.ReactElement;
  