# 🐱 TinderCat

A delightful React Native app that lets you swipe through adorable cats, Tinder-style! Built with Expo and featuring smooth animations, this app connects to The Cat API to provide an endless stream of feline friends to like or pass on.

## ✨ Features

- **Smooth Swipe Animations**: Fluid card-based interface with realistic physics
- **Dual Interaction**: Swipe gestures or tap buttons to vote on cats
- **Infinite Scrolling**: Automatically loads more cats as you swipe
- **Beautiful UI**: Modern design with smooth transitions and scaling effects
- **Cat Voting**: Like or dislike cats with API integration
- **Tab Navigation**: Clean navigation between Cats, Chat, and Profile screens

## 🚀 Tech Stack
- **React Native** with Expo
- **TypeScript** for type safety
- **React Native Reanimated** for smooth animations
- **React Native Gesture Handler** for swipe interactions
- **The Cat API** for cat data and images

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/TinderCat.git
   cd TinderCat
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file:
   ```typescript
   export const API_KEY = 'your_cat_api_key_here';
   ```

4. **Start the development server**
   ```bash
   yarn start
   # or
   npm start
   ```

5. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 🏗️ Project Structure

```
src/
├── api/                    # API layer
│   ├── index.ts           # Main API functions
│   ├── requests.ts        # HTTP request helper
│   └── types.ts          # API type definitions
├── assets/
│   └── icons/            # SVG icons
├── components/           # Reusable components
│   ├── CatCard.tsx      # Individual cat card
│   ├── DecisionButtons.tsx # Like/dislike buttons
│   └── SwipeDeck.tsx    # Main swipe container
├── config/
│   └── env.ts           # Environment configuration
├── elements/            # Basic UI elements
│   └── Button.tsx
├── hooks/               # Custom React hooks
│   └── useCatsHooks.ts  # Cat data management
├── routes/              # Navigation
│   └── TabsStack.tsx
├── screens/             # Screen components
│   ├── Cats.tsx
│   ├── Chat.tsx
│   └── Profile.tsx
└── theme/
    └── theme.ts         # Design system
```


## 📡 API Integration
The app integrates with [The Cat API](https://thecatapi.com/).

## 🙏 Acknowledgments

- [The Cat API](https://thecatapi.com/) for providing amazing cat data
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) for smooth animations
- [Expo](https://expo.dev/) for the development platform

*Swipe right for more cats!* 😸