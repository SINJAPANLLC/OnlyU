// src/components/Auth/login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // ✅ Updated path to firebase.js
import { useTranslation } from 'react-i18next';

export default function MyFansLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isXLoading, setIsXLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Xでログインする関数
  const handleXLogin = async () => {
    try {
      setIsXLoading(true);
      setError(null);
      
      // Google認証プロバイダーを使用（Xの代わりにGoogleを使用）
      const provider = new GoogleAuthProvider();
      
      // ポップアップでログイン
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // ユーザー情報をFirestoreに保存
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // 新規ユーザーの場合、Firestoreにプロフィールを作成
        await setDoc(userRef, {
          displayName: user.displayName || 'ユーザー',
          email: user.email,
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
          lastSeen: new Date().toISOString(),
          isOnline: true,
          provider: 'google' // ログイン方法を記録
        });
      } else {
        // 既存ユーザーの場合、最終ログイン時間を更新
        await setDoc(userRef, {
          lastSeen: new Date().toISOString(),
          isOnline: true
        }, { merge: true });
      }
      
      console.log("Xでログイン成功:", user);
      
      // ホームページに遷移
      navigate("/home");
      
    } catch (error) {
      console.error("Xでログインエラー:", error);
      
      // エラーメッセージを日本語で表示
      let errorMessage = "Xでログインに失敗しました";
      
      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Google認証が有効になっていません。管理者にお問い合わせください。";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "ログインがキャンセルされました";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "ポップアップがブロックされました。ポップアップを許可してください。";
      } else {
        errorMessage = `Xでログインに失敗しました: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsXLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsVerifying(true);
    setError(null);

    try {
      // ✅ Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // ✅ Update user's online status in Firestore
      try {
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Update existing user's online status
          await updateDoc(userDocRef, {
            isOnline: true,
            lastSeen: new Date().toISOString()
          });
        } else {
          // Create user document if it doesn't exist (for existing users)
          await setDoc(userDocRef, {
            displayName: userCredential.user.displayName || 'Anonymous User',
            email: userCredential.user.email,
            photoURL: userCredential.user.photoURL || null,
            createdAt: new Date().toISOString(),
            lastSeen: new Date().toISOString(),
            isOnline: true
          });
        }
      } catch (firestoreError) {
        console.log('Error updating user status:', firestoreError);
        // Don't block login if Firestore update fails
      }

      console.log("Login successful:", userCredential.user);
      setIsVerifying(false);

      // Success → redirect to Home.jsx
      // Navigation will be handled automatically by the AuthContext
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message);
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </motion.button>
          <h1 className="text-lg font-semibold text-gray-900">{t("account.other.login")}</h1>
          <div className="w-8"></div>
        </div>

        {/* Content */}
        <div className="p-6 pt-12">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mb-12"
          >
            <div className="flex items-center gap-2">
              <img src="/logo.webp" alt="Logo" className="w-100 h-16" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4 mb-6"
          >
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder={t("account.placeholder.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder={t("account.placeholder.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={isVerifying}
            className={`w-full py-3 rounded-lg font-medium transition-colors mb-4 ${isVerifying
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
          >
            {isVerifying ? t("account.other.logging") : t("account.other.login")}
          </motion.button>

          {/* Sign in with X */}
          <motion.button
            onClick={handleXLogin}
            disabled={isXLoading || isVerifying}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg font-medium transition-colors mb-6 flex items-center justify-center gap-2 ${
              isXLoading || isVerifying
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-900 text-white"
            }`}
          >
            <X size={18} />
            {isXLoading ? "ログイン中..." : t("account.other.X")}
          </motion.button>

          {/* Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mb-8"
          >
            <button className="text-blue-500 hover:text-blue-600 text-sm underline">
              {t("account.other.forgotps")}
            </button>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">{t("account.other.dha")}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/signup")}
            className="w-full py-3 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 rounded-lg font-medium transition-colors"
          >
            {t("account.other.signup")}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
