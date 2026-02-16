# Expo E2E Example App

This is an example app demonstrating an E2E testing setup using [MSW](https://mswjs.io/docs/) to mock network requests.

## Getting Started

1. **Setup your environment**

   Make sure your environment is setup up for local development with Expo and React Native [following Expo's guide](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local&platform=android&device=physical).

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start the project**

The app is running against an example API that doesn't exist. It only makes sense to run it in E2E mode.

`npm run e2e:android` or

`APP_PROFILE=e2e-test npx expo run:android` or

`APP_PROFILE=e2e-test npx expo run:android --device`

## MSW setup

The hook `useSetupMsw()` is called to only import MSW, the handlers and start the MSW server if the app is started with the appProfile=e2e-test.

You can modify the handlers in `/test/handlers.ts`

### Mocked backend service

`/test/handlers.ts` is using MockAccountService for the /account endpoints to mock the backend saving data.
