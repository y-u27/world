# World Map SNS

### 【サイトURL】  
https://world-frontend.vercel.app/

---

### 【サイト概要】
各国の魅力や情報などを投稿・共有できる、世界地図を利用したSNS風アプリです。

---

### 【機能一覧】  
・ログイン  
・ログアウト  
・新規登録  
・Googleログイン  
・投稿機能  
・1投稿の編集（更新）  
・1投稿の削除  
・「いいね」機能  
・投稿したユーザーの情報表示  
・ユーザーページ  
・ユーザーコメント保存・編集  

---

### 【サイト説明】
1.「新規登録」または「ログイン（Googleログイン可能）」  
※テストアカウント  
  →メールアドレス：test6789@example  
  →パスワード：testatd278  
 
2.ログイン後、Google Mapが表示されるため、自分が興味ある国などを選択してください。  
※マウスポインタが国から外れて、海に焦点が当たってしまうことがあります。その際はページをリロードしてください。（修正予定）

3.国を表示させることで、右側に「投稿一覧」ボタンが表示されます。

4.「投稿一覧」の「投稿」ボタンから実際に投稿することができます。

## アプリ操作デモ

![アプリの操作デモ](/frontend/public/demo/output.gif)

---

### 【使用技術】  
| カテゴリ       | 使用技術            |
|---------------|----------------------|
| **フロントエンド** | React, Next.js, TypeScript, Chakra UI |
| **外部API** | Google Map API |
| **バックエンド**   | Node.js, Prisma      |
| **認証**         | Next-auth             |
| **データベース**   | Supabase             |
| **デプロイ**     | Vercel               |

---

## 【データベース設計（ER図）】

### 🧑‍💻 Userテーブル

| カラム名  | 型     | 説明         |
|-----------|--------|--------------|
| id        | int4   | 主キー       |
| name      | text   | ユーザー名   |
| image     | text   | アイコン画像URL |
| email     | text   | メールアドレス |
| password  | text   | パスワード   |
| comment   | text   | 自己紹介文   |

---

### 📝 Postテーブル

| カラム名     | 型       | 説明                  |
|--------------|----------|-----------------------|
| id           | int4     | 主キー                |
| title        | text     | 投稿タイトル          |
| content      | text     | 投稿内容              |
| createdAt    | timestamp| 作成日時              |
| countryName  | text     | 国名                  |
| userId       | int4     | 投稿者（Userの外部キー）|

---

### ❤️ Likesテーブル

| カラム名 | 型   | 説明                      |
|----------|------|---------------------------|
| id       | int4 | 主キー                    |
| userId   | int4 | 「いいね」したユーザーID  |
| postId   | int4 | 「いいね」された投稿ID    |

---

### 🔗 テーブル間のリレーション

- **User 1 : N Post**  
  （1人のユーザーが複数の投稿を持つ）

- **User 1 : N Likes**  
  （1人のユーザーが複数の投稿にいいねできる）

- **Post 1 : N Likes**  
  （1つの投稿に複数のいいねが付く）

---

### 【こだわった点】
[サイトのデザイン]  
各国に焦点を当て、ズームした際、どこに「投稿一覧」を表示させるかや各投稿記事の見た目などにもこだわりました。

---

### 【苦戦した点】
[各国に焦点を当てる実装]  


[いいね機能]  
「いいね」のボタンをクリックするだけではなく、データベースに専用のテーブルを作成し、そこにユーザーと投稿を紐づけて実装していくということを知り、どうユーザーと投稿を紐づければいいか、これらを踏まえてどう実装すればいいかという点に苦戦しました。


---

### 【追加予定の機能】
