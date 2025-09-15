# TinderCat

A minimal React Native app built with Expo.

## Requirements

- Node.js 18+ and npm or Yarn
- iOS/Android tooling if running on a simulator or device
  - iOS: Xcode (macOS only)
  - Android: Android Studio + emulator
- Expo Go app (optional) for running on a physical device

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn
```

2. Start the development server (choose one):

```bash
npm run start      # Open Expo Dev Tools
npm run ios        # iOS simulator (macOS)
npm run android    # Android emulator
npm run web        # Web
```

- To open on a physical device, scan the QR code in Expo Dev Tools with the Expo Go app.

## Project Structure

- `App.tsx` – Root application component
- `index.ts` – Entry point
- `assets/` – App icons and splash assets
- `app.json` – Expo configuration

## Troubleshooting

- Clear Metro/Expo cache if things act weird:

```bash
npx expo start -c
```
