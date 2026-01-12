import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createGroup, joinGroup } from './initialSetup';

export default function GroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    setIsLoading(true);
    try {
      await createGroup(groupName);
      // 成功したらトップページへ遷移 (履歴をリセットして置換)
      router.replace('/');
    } catch (err) {
      console.error(err);
      Alert.alert('エラー', 'グループの作成に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!groupCode.trim()) return;
    setIsLoading(true);
    try {
      await joinGroup(groupCode);
      // 成功したらトップページへ遷移
      router.replace('/');
    } catch (err) {
      console.error(err);
      Alert.alert('エラー', 'グループへの参加に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>グループを作成</Text>
        <TextInput
          style={styles.input}
          value={groupName}
          onChangeText={setGroupName}
          placeholder="グループ名"
        />
        <Button title="作成" onPress={handleCreateGroup} disabled={isLoading} />
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.title}>グループに参加</Text>
        <Text style={styles.description}>グループコードをお持ちですか？</Text>
        <TextInput
          style={styles.input}
          value={groupCode}
          onChangeText={setGroupCode}
          placeholder="グループコード"
          autoCapitalize="none"
        />
        <Button title="参加" onPress={handleJoinGroup} disabled={isLoading} />
      </View>
      
      {isLoading && <ActivityIndicator style={styles.loader} size="large" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  }
});