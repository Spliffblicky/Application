import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { AuthProvider, AuthContext } from './screens/AuthContext';

// Auth flow screens
import OnboardingWelcomeScreen from './screens/OnboardingWelcomeScreen';
import OnboardingPermissionsScreen from './screens/OnboardingPermissionsScreen';
import OnboardingFinishScreen from './screens/OnboardingFinishScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import AuthScreen from './screens/AuthScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';

// Main app flow screens
import BottomTabNavigation from './screens/BottomTabNavigation';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import SignOutScreen from './screens/SignOutScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import OpenSourceScreen from './screens/OpenSourceScreen';
import CCPAPreferencesScreen from './screens/CCPAPreferencesScreen';
import ManagePlanScreen from './screens/ManagePlanScreen';
import ReportBugScreen from './screens/ReportBugScreen';
import BackupLoadingScreen from './screens/BackupLoadingScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import TwoFactorScreen from './screens/TwoFactorScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

// Auth stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="OnboardingPermissions" component={OnboardingPermissionsScreen} />
      <Stack.Screen name="OnboardingFinish" component={OnboardingFinishScreen} />
      <Stack.Screen name="AddAccount" component={AddAccountScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
    </Stack.Navigator>
  );
}

// Main app stack
function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigation} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="SignOut" component={SignOutScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="OpenSource" component={OpenSourceScreen} />
      <Stack.Screen name="CCPAPreferences" component={CCPAPreferencesScreen} />
      <Stack.Screen name="ManagePlan" component={ManagePlanScreen} />
      <Stack.Screen name="ReportBug" component={ReportBugScreen} />
      <Stack.Screen name="BackupLoading" component={BackupLoadingScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="TwoFactor" component={TwoFactorScreen} />
    </Stack.Navigator>
  );
}

// Loading component
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0061FF" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

// Conditional navigator
function AppNavigator() {
  const { jwt, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return jwt ? <MainAppStack /> : <AuthStack />;
}

// Root app
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}