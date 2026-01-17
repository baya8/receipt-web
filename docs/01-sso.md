あるアプリケーションで、googleアカウントによるsso認証を実装しようとしています。

フロントはreact native expoで、バックエンドはgolang + ginです。

アプリケーションの認証認可は、以下のフローで実装しようとしています。
plantumlです。

```
@startuml
autonumber
skinparam backgroundColor #FFFFFF
skinparam sequenceMessageAlign center

actor "ユーザー" as User
participant "React Native\n(Expo App)" as App
participant "Google\n(OAuth Provider)" as Google
participant "Firebase Auth\n(GCP)" as Firebase
participant "Go Backend\n(Gin)" as Backend
database "Database" as DB

== 1. Googleログイン (クライアントサイド) ==
User -> App: 「Googleでログイン」をタップ
App -> Google: 認証リクエスト (AuthSession等)
Google -> User: ログイン画面・同意画面の表示
User -> Google: ログイン情報の入力
Google -> App: **Google ID Token** を返却

== 2. Firebaseへのサインイン ==
App -> Firebase: signInWithCredential(Google ID Token)
Firebase -> Firebase: トークン検証とユーザー作成/確認
Firebase -> App: **Firebase ID Token (JWT)** を返却

== 3. バックエンドでの認証検証 ==
App -> Backend: APIリクエスト\nAuthorization: Bearer **<Firebase ID Token>**
Backend -> Firebase: [Firebase Admin SDK] トークン検証 (VerifyIDToken)
Firebase -> Backend: 検証結果 (UID, Email等のペイロード)

== 4. セッション確立 ==
Backend -> DB: ユーザー情報の取得・更新 (UIDをキーに)
DB -> Backend: ユーザーデータ
Backend -> App: 200 OK (カスタムトークンやプロファイル情報)
App -> User: ログイン完了・ホーム画面へ

@enduml
```

いまのプロジェクトの実装を見て、上記ssoを実装するのに必要なライブラリがあれば教えてください。
ライブラリが充足している場合、ssoの実装を教えてください。