# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
3. create 2 files: .env and env.d.ts
   .env
      - HOST=...

      - EXPO_PUBLIC_API_GetMachines=${HOST}
      - EXPO_PUBLIC_API_GetMachineById=${HOST}/api/...
      - EXPO_PUBLIC_API_AddMachine=${HOST}/api/...
      - EXPO_PUBLIC_API_UpdateMachine=${HOST}/api/...
      - EXPO_PUBLIC_API_GetWashingTypes=${HOST}/api/...
      - and more
   env.d.ts
      