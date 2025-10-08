#!/bin/bash

# EC2 Deploy Script for OnlyU App

echo "🚀 Starting deployment to EC2..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Build frontend
echo "🔨 Building frontend..."
npm run build

# 3. Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# 4. Start backend server
echo "🚀 Starting backend server..."
cd backend
npm start &

# 5. Serve frontend (using serve package)
echo "🌐 Serving frontend..."
cd ..
npx serve -s build -l 3000 &

echo "✅ Deployment complete!"
echo "Frontend: http://your-ec2-ip:3000"
echo "Backend API: http://your-ec2-ip:5000"
