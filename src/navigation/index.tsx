import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Image } from "react-native";
import bell from "../assets/bell.png";
import newspaper from "../assets/newspaper.png";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import { WebView } from "./screens/WebView";
import { useIsSignedIn, useIsSignedOut } from "../auth/AuthContext";
import { Login } from "./screens/Login";
import { BankIDAuth } from "./screens/BankIDAuth";

export type HomeTabParamList = {
  Home: undefined;
  WebView: {
    urlSuffix?: string;
  };
};

const HomeTabNavigator = createBottomTabNavigator<HomeTabParamList>();

function HomeTabs() {
  return (
    <HomeTabNavigator.Navigator>
      <HomeTabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={newspaper}
              tintColor={color}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }}
      />
      <HomeTabNavigator.Screen
        name="WebView"
        component={WebView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={bell}
              tintColor={color}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }}
      />
    </HomeTabNavigator.Navigator>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      if: useIsSignedOut,
      screen: Login,
      options: {
        title: "Login",
      },
    },
    BankIDAuth: {
      if: useIsSignedOut,
      screen: BankIDAuth,
    },
    HomeTabs: {
      if: useIsSignedIn,
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
