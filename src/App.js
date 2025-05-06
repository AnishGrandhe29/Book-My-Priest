// src/App.js
import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import { APP_COLORS } from './config';

// Auth Screens
import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';

// Priest Screens
import PriestHomeScreen from './screens/priest/HomeScreen';
import PriestBookingsScreen from './screens/priest/BookingsScreen';
import PriestEarningsScreen from './screens/priest/EarningsScreen';
import PriestProfileScreen from './screens/priest/ProfileScreen';
import PriestNotificationsScreen from './screens/priest/NotificationsScreen';
import BookingDetailsScreen from './screens/priest/BookingDetailsScreen';
import ProfileSetupScreen from './screens/priest/ProfileSetupScreen';

// Devotee Screens
import DevoteeHomeScreen from './screens/devotee/HomeScreen';
import DevoteeBookingsScreen from './screens/devotee/BookingsScreen';
import DevoteeProfileScreen from './screens/devotee/ProfileScreen';
import PriestSearchScreen from './screens/devotee/PriestSearchScreen';
import PriestDetailsScreen from './screens/devotee/PriestDetailsScreen';
import BookingScreen from './screens/devotee/BookingScreen';
import PaymentScreen from './screens/devotee/PaymentScreen';
import BookingConfirmationScreen from './screens/devotee/BookingConfirmationScreen';

// Help & Support
import HelpScreen from './screens/common/HelpScreen';

// Ignore specific warnings
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

// Priest Tabs
const PriestTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Bookings') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Earnings') {
          iconName = focused ? 'wallet' : 'wallet-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications' : 'notifications-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: APP_COLORS.primary,
      tabBarInactiveTintColor: APP_COLORS.gray,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={PriestHomeScreen} />
    <Tab.Screen name="Bookings" component={PriestBookingsScreen} />
    <Tab.Screen name="Earnings" component={PriestEarningsScreen} />
    <Tab.Screen name="Profile" component={PriestProfileScreen} />
    <Tab.Screen name="Notifications" component={PriestNotificationsScreen} />
  </Tab.Navigator>
);

// Devotee Tabs
const DevoteeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Bookings') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Ceremonies') {
          iconName = focused ? 'flame' : 'flame-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: APP_COLORS.primary,
      tabBarInactiveTintColor: APP_COLORS.gray,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={DevoteeHomeScreen} />
    <Tab.Screen name="Bookings" component={DevoteeBookingsScreen} />
    <Tab.Screen name="Ceremonies" component={DevoteeHomeScreen} />
    <Tab.Screen name="Chat" component={DevoteeHomeScreen} />
    <Tab.Screen name="Profile" component={DevoteeProfileScreen} />
  </Tab.Navigator>
);

// Priest Stack
const PriestStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PriestTabs" component={PriestTabNavigator} />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

// Devotee Stack
const DevoteeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DevoteeTabs" component={DevoteeTabNavigator} />
    <Stack.Screen name="PriestSearch" component={PriestSearchScreen} />
    <Stack.Screen name="PriestDetails" component={PriestDetailsScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

const App = () => {
  const { userInfo, userToken, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    // Show splash screen or loading indicator
    return null;
  }

  let stackToShow = <AuthStack />;

  if (userToken) {
    if (userInfo?.userType === 'priest') {
      if (!userInfo.profileCompleted) {
        stackToShow = (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          </Stack.Navigator>
        );
      } else {
        stackToShow = <PriestStack />;
      }
    } else {
      stackToShow = <DevoteeStack />;
    }
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={APP_COLORS.primary}
        barStyle="light-content"
      />
      {stackToShow}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;