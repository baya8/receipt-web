import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNickname } from './initialSetup';

export default function NicknameScreen() {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('エラー', 'ニックネームを入力してください。');
      return;
    }

    setIsLoading(true);
    try {
      await createNickname(nickname);
      // 成功したらグループ設定画面へ遷移
      router.push('/(auth)/group');
    } catch (err) {
      console.error(err);
      Alert.alert('エラー', 'ニックネームの登録に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ニックネームを入力</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="ニックネーム"
        autoCapitalize="none"
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="次へ" onPress={handleSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
});