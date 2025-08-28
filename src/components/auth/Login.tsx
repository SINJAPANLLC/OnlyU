import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const mockUsers = {
  fan: {
    id: '1',
    username: 'fan_user',
    displayName: 'ファンユーザー',
    email: 'fan@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    bio: '素晴らしいコンテンツを楽しみます',
    followers: 45,
    following: 120,
    isVerified: false,
    joinedDate: '2023-06-15',
    role: 'fan' as const,
    status: 'active' as const,
    createdAt: '2023-06-15'
  },
  creator: {
    id: '2',
    username: 'sakura_chan',
    displayName: '桜子',
    email: 'sakura@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    bio: 'クリエイター｜毎日投稿中✨',
    followers: 15420,
    following: 892,
    isVerified: true,
    joinedDate: '2023-01-15',
    role: 'creator' as const,
    status: 'active' as const,
    createdAt: '2023-01-15'
  }
};

const Login = () => {
  const [email, setEmail] = useState('sakura@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'fan' | 'creator'>('creator');

  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (authContext) {
        const userToLogin = mockUsers[selectedRole];
        authContext.login(userToLogin);
        
        // Navigate based on role - use replace to prevent double rendering
        if (selectedRole === 'creator') {
          window.location.href = '/creator';
        } else {
          window.location.href = '/';
        }
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            MyFansへおかえりなさい
          </h1>
          <p className="text-gray-600">アカウントにログインしてください</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              どちらとしてログインしますか？
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('fan')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'fan'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 text-lg">❤️</span>
                </div>
                <div className="font-medium">ファン</div>
                <div className="text-xs opacity-80">コンテンツを楽しむ</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('creator')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'creator'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-lg">🎨</span>
                </div>
                <div className="font-medium">クリエイター</div>
                <div className="text-xs opacity-80">コンテンツを作成</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                <span className="ml-2 text-sm text-gray-600">ログイン状態を保持</span>
              </label>
              <Link to="#" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                パスワードを忘れた方
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {selectedRole === 'creator' ? 'クリエイターとしてログイン中...' : 'ファンとしてログイン中...'}
                </div>
              ) : (
                `${selectedRole === 'creator' ? 'クリエイター' : 'ファン'}としてログイン`
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              アカウントをお持ちでない方は{' '}
              <Link to="/register" className="text-pink-600 hover:text-pink-700 font-medium">
                新規登録
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;