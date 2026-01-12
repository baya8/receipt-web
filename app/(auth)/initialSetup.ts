import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_HOST } from '../../config';

// ログイン時に保存したトークンのキー（ログイン処理の実装と合わせる必要があります）
const TOKEN_KEY = 'auth_token';

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * ニックネームを登録します。
 * @param nickname - 登録するニックネーム
 */
export const createNickname = async (nickname: string) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_HOST}/initial/create/nickname`, { nickname }, { headers });
};

/**
 * 新しいグループを作成します。
 * @param groupName - 作成するグループ名
 */
export const createGroup = async (groupName: string) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_HOST}/initial/create/group`, { groupName }, { headers });
};

/**
 * 既存のグループに参加します。
 * @param groupCode - 参加するグループのコード
 */
export const joinGroup = async (groupCode: string) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_HOST}/initial/create/join`, { groupCode }, { headers });
};

/**
 * ユーザーアカウントを作成します。
 * @param email - メールアドレス
 * @param password - パスワード
 * @param displayName - 表示名
 */
export const createUser = async (email: string, password: string, displayName: string) => {
  return axios.post(`${API_HOST}/initial/create/user`, { email, password, displayName });
};