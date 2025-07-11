# World Map SNS

---

## このアプリについて<br/>

「World Map SNS」は、世界中の国の魅力を気軽に共有し、発見できるSNSです。

当初、エンジニア転職を目指して学習を始め、挫折しそうになった時期もありました。<br/>
それでも「自分の手で何かを形にしたい」という想いから、継続的にアプリを作り続けることを決意し、本アプリを開発しました。<br/>

---

## 【アプリURL】<br/>
https://world-frontend.vercel.app/

---

## 【アプリ概要】<br/>
各国の魅力や情報などを投稿・共有できる、世界地図を利用したSNS風アプリです。

---

## 【🎨 アプリデザイン（Figma）】<br/>

## ![デザイン画像](./frontend/public/sample/スクリーンショット%202025-04-18%200.28.58.png)

---

## 【機能一覧】<br/>
- ログイン<br/>
- ログアウト<br/>
- 新規登録<br/>
- Googleログイン<br/>
- 投稿機能<br/>
- 1投稿の編集（更新）<br/>
- 1投稿の削除<br/>
- 「いいね」機能<br/>
- 投稿したユーザーの情報表示<br/>
- ユーザーページ<br/>
- ユーザーコメント保存・編集<br/>

---

## 【アプリ説明】<br/>
```
1.  「新規登録」または「ログイン（Googleログイン可能）」  
※テストアカウント  
  - メールアドレス：test6789@example.com  
  - パスワード：testatd278  
 
2.  ログイン後、Google Mapが表示されるため、自分が興味ある国などを選択してください。  
※マウスポインタが国から外れて、海に焦点が当たってしまうことがあります。その際はページをリロードしてください。（修正予定）

3.  国を表示させることで、右側に「投稿一覧」ボタンが表示されます。

4.  「投稿一覧」の「投稿」ボタンから実際に投稿することができます。
```

## 【アプリ操作デモ】<br/>

![アプリの操作デモ](/frontend/public/demo/output.gif)

---

## 【使用技術】 <br/>
| カテゴリ       | 使用技術            |
|---------------|----------------------|
| **フロントエンド** | React, Next.js, TypeScript, Chakra UI |
| **外部API** | Google Map API |
| **バックエンド**   | Node.js, Prisma      |
| **認証**         | Next-auth             |
| **データベース**   | Supabase             |
| **デプロイ**     | Vercel               |

---

## 【データベース設計（テーブル定義）】<br/>

### 🧑‍💻 Userテーブル<br/>

| カラム名  | 型     | 説明         |
|-----------|--------|--------------|
| id        | int4   | 主キー       |
| name      | text   | ユーザー名   |
| image     | text   | アイコン画像URL |
| email     | text   | メールアドレス |
| password  | text   | パスワード   |
| comment   | text   | 自己紹介文   |

---

### 📝 Postテーブル<br/>

| カラム名     | 型       | 説明                  |
|--------------|----------|-----------------------|
| id           | int4     | 主キー                |
| title        | text     | 投稿タイトル          |
| content      | text     | 投稿内容              |
| createdAt    | timestamp| 作成日時              |
| countryName  | text     | 国名                  |
| userId       | int4     | 投稿者（Userの外部キー）|

---

### ❤️ Likesテーブル<br/>

| カラム名 | 型   | 説明                      |
|----------|------|---------------------------|
| id       | int4 | 主キー                    |
| userId   | int4 | 「いいね」したユーザーID  |
| postId   | int4 | 「いいね」された投稿ID    |

---

### 🔗 テーブル間のリレーション<br/>

- **User 1 : N Post**  
  （1人のユーザーが複数の投稿を持つ）

- **User 1 : N Likes**  
  （1人のユーザーが複数の投稿にいいねできる）

- **Post 1 : N Likes**  
  （1つの投稿に複数のいいねが付く）

---

## 【工夫した点】<br/>
[サイトのデザイン]  
各国に焦点を当て、ズームした際、どこに「投稿一覧」を表示させるかや各投稿記事の見た目などにもこだわりました。

---

## 【苦戦した点】<br/>
[いいね機能]<br>
- 「いいね」のボタンをクリックするだけではなく、データベースに専用のテーブルを作成し、そこにユーザーと投稿を紐づけて実装していくということを知り、どうユーザーと投稿を紐づければいいか、これらを踏まえてどう実装すればいいかという点に苦戦しました。<br/>
-  テーブル作成後は、「いいね」の取得・作成・削除ができるAPIをバックエンド側で作成し、専用のコンポーネントを作成、そこでfetchを使って、APIと接続できるようコードを実装していきました。<br/>

---

## 【追加予定の機能】  <br/>
-  [ ] 国ごとの投稿検索機能<br/>
-  [ ] ユーザーページにて自分の過去の投稿を確認する機能<br/>
-  [ ] 画像の投稿もできるようにする<br/>
-  [x] 検索窓の追加<br/>

---

##  【修正予定】  <br/>
-  複数回ページリロードをした際にログインページへリダイレクトされてしまう仕様の修正（再ログインもできなくなっている点）