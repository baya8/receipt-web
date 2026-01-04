import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack, useRootNavigationState, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';

// This is the configuration for static rendering with Expo Router.
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  // TODO: 実際のアプリでは、ここをContextやストレージから取得した認証状態に置き換えてください
  const isAuthenticated = false;

  // ナビゲーションの準備が完了するまで待機します。
  // この間、スプラッシュスクリーンが表示されたままになります。
  if (!navigationState?.key) {
    return null;
  }

  const inAuthGroup = segments[0] === '(auth)';

  // ユーザーが認証されておらず、かつ認証グループ（例: /login）にいない場合、
  // ログイン画面にリダイレクトします。
  if (!isAuthenticated && !inAuthGroup) {
    return <Redirect href="/login" />;
  }
  // ユーザーが認証済みで、かつ認証グループにいる場合（例: ログイン後にブラウザバックで/loginに戻った場合）、
  // メイン画面（'/'）にリダイレクトします。
  if (isAuthenticated && inAuthGroup) {
    return <Redirect href="/" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
