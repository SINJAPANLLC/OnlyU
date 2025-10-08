# OnlyU デプロイメントガイド

## サーバー要件
- Ubuntu 20.04 LTS 以上
- Node.js 18.x 以上
- MongoDB 6.0 以上
- 最低 2GB RAM

## デプロイ手順

### 1. サーバーの初期設定

```bash
# システムのアップデート
sudo apt update && sudo apt upgrade -y

# Node.jsのインストール（NVMを使用している場合はスキップ）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Gitのインストール
sudo apt install -y git
```

### 2. MongoDBのインストール

Ubuntu 24.04の場合：

```bash
# MongoDB公式GPGキーをインポート
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

# MongoDBリポジトリを追加
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# MongoDBをインストール
sudo apt update
sudo apt install -y mongodb-org

# MongoDBサービスを起動
sudo systemctl start mongod
sudo systemctl enable mongod

# 状態確認
sudo systemctl status mongod
```

Ubuntu 22.04の場合：

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. プロジェクトのクローンとセットアップ

```bash
# ホームディレクトリに移動
cd ~

# リポジトリをクローン
git clone https://github.com/SINJAPANLLC/OnlyU.git
cd OnlyU

# フロントエンド依存関係をインストール
npm install

# バックエンド依存関係をインストール
cd backend
npm install
cd ..
```

### 4. 環境変数の設定

#### フロントエンド用 `.env` ファイル（プロジェクトルート）

```bash
cat > .env << 'EOF'
# React App Environment Variables
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Supabase Configuration
REACT_APP_SUPABASE_URL=https://ikvfbddbatyedwqbyntd.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=dut8xkqb8
REACT_APP_CLOUDINARY_API_KEY=966631731617248
EOF
```

**重要**: 本番環境では実際の認証情報に置き換えてください。

#### バックエンド用 `.env` ファイル（backend/）

```bash
cat > backend/.env << 'EOF'
PORT=5000
MONGO_URI=mongodb://localhost:27017/onlyu
EOF
```

### 5. プロダクションビルド

```bash
# フロントエンドをビルド
npm run build
```

### 6. アプリケーションの起動

#### 開発環境で起動

```bash
# バックエンドをバックグラウンドで起動
cd backend
npm start &
cd ..

# フロントエンド（serve）を起動
npx serve -s build -l 3000
```

#### PM2で本番環境起動（推奨）

```bash
# PM2をグローバルインストール
sudo npm install -g pm2

# バックエンドを起動
cd backend
pm2 start server.js --name onlyu-backend
cd ..

# フロントエンドを起動
pm2 start "npx serve -s build -l 3000" --name onlyu-frontend

# システム起動時に自動起動
pm2 startup
pm2 save
```

### 7. ファイアウォール設定

```bash
# UFWファイアウォールの設定
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 3000/tcp  # アプリケーション
sudo ufw enable
```

### 8. Nginxリバースプロキシ設定（オプション）

```bash
# Nginxをインストール
sudo apt install -y nginx

# 設定ファイルを作成
sudo nano /etc/nginx/sites-available/onlyu
```

以下の内容を貼り付け：

```nginx
server {
    listen 80;
    server_name your_domain.com;  # ドメイン名に変更

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /users {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /identity {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 設定を有効化
sudo ln -s /etc/nginx/sites-available/onlyu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 更新方法

```bash
cd ~/OnlyU

# 最新のコードを取得
git pull origin main

# 依存関係を更新
npm install
cd backend
npm install
cd ..

# 再ビルド
npm run build

# PM2でアプリケーションを再起動
pm2 restart all
```

## トラブルシューティング

### MongoDBが起動しない

```bash
# ログを確認
sudo journalctl -u mongod -f

# サービスを再起動
sudo systemctl restart mongod
```

### バックエンドがMongoDBに接続できない

```bash
# MongoDBが起動しているか確認
sudo systemctl status mongod

# MongoDB接続をテスト
mongosh --eval "db.adminCommand('ping')"

# backend/.envファイルが存在するか確認
cat backend/.env
```

### ポートが使用中

```bash
# ポート3000を使用しているプロセスを確認
sudo lsof -i :3000

# プロセスを停止
kill -9 <PID>
```

## セキュリティ推奨事項

1. ファイアウォールを有効にし、必要なポートのみ開放
2. MongoDBに認証を設定
3. SSL/TLS証明書を設定（Let's Encrypt推奨）
4. 環境変数ファイルの権限を制限: `chmod 600 .env backend/.env`
5. 定期的にシステムとパッケージを更新

## バックアップ

```bash
# MongoDBのバックアップ
mongodump --db onlyu --out /backup/$(date +%Y%m%d)

# 自動バックアップのcron設定
crontab -e
# 以下を追加（毎日午前2時）
0 2 * * * mongodump --db onlyu --out /backup/$(date +\%Y\%m\%d)
```

