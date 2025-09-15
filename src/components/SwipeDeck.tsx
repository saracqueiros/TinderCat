import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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
};

const SWIPE_DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type SwipeDirection = typeof SWIPE_DIRECTION[keyof typeof SWIPE_DIRECTION];

export default function SwipeDeck<T>({ data, renderCard, onSwipeLeft, onSwipeRight }: Props<T>) {
  const [index, setIndex] = useState(0);
  const top = data[index];
  const next = data[index + 1];

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isAnimatingOut = useSharedValue(false);

  const advance = useCallback((dir: SwipeDirection, item: T) => {
    if (dir === 'left') onSwipeLeft?.(item);
    else onSwipeRight?.(item);
    setIndex(i => i + 1);
    translateX.value = 0;
    translateY.value = 0;
  }, [onSwipeLeft, onSwipeRight]);

  const pan = useMemo(() => Gesture.Pan()
    .onUpdate(e => {
      if (isAnimatingOut.value) return;
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(e => {
      if (isAnimatingOut.value) return;
      const dx = translateX.value;
      const shouldDismiss = Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(e.velocityX) > 800;
      if (!shouldDismiss) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        return;
      }
      isAnimatingOut.value = true;
      const dir: SwipeDirection = dx > 0 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT;
      const toX = (dir === 'right' ? 1 : -1) * theme.screen.width * 1.2;
      translateX.value = withTiming(toX, { duration: 200 }, () => {
        'worklet';
        runOnJS(advance)(dir, top as T);
        isAnimatingOut.value = false;
      });
    })
  , [advance, top]);

  const topStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-theme.screen.width, 0, theme.screen.width], [-15, 0, 15], Extrapolation.CLAMP);
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const nextStyle = useAnimatedStyle(() => {
    const progress = isAnimatingOut.value ? SWIPE_THRESHOLD : Math.abs(translateX.value);
    const scale = interpolate(progress, [0, SWIPE_THRESHOLD], [0.95, 1], Extrapolation.CLAMP);
    return { transform: [{ scale }], opacity: 1 };
  });

  if (!top) return <View style={styles.container} />;

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        {next && (
          <Animated.View key={`card-${index + 1}`} pointerEvents="none" style={[styles.card, nextStyle]}>
            {renderCard(next)}
          </Animated.View>
        )}
        <Animated.View key={`card-${index}`} style={[styles.card, topStyle]}>
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
});