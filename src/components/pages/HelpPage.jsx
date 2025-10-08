import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Search,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  BookOpen,
  Shield,
  CreditCard,
  Users,
  Settings,
  Bell,
  User,
  Globe,
  Star,
  UserPlus,
  UserMinus,
  Flag,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
  Trash2,
  RefreshCw,
  Calendar,
  FileText,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    { id: 'all', name: 'すべて', icon: HelpCircle, color: 'blue' },
    { id: 'getting-started', name: 'はじめに', icon: BookOpen, color: 'green' },
    { id: 'account', name: 'アカウント', icon: User, color: 'purple' },
    { id: 'settings', name: '設定', icon: Settings, color: 'orange' },
    { id: 'billing', name: '料金・支払い', icon: CreditCard, color: 'red' },
    { id: 'safety', name: '安全・プライバシー', icon: Shield, color: 'yellow' },
    { id: 'troubleshooting', name: 'トラブルシューティング', icon: AlertTriangle, color: 'pink' }
  ];

  const helpArticles = [
    // はじめに
    {
      id: 'what-is-onlyu',
      title: 'OnlyUとは？',
      category: 'getting-started',
      content: 'OnlyUは、クリエイターとファンが直接つながるプラットフォームです。',
      icon: Star
    },
    {
      id: 'how-to-signup',
      title: 'アカウント作成方法',
      category: 'getting-started',
      content: 'メールアドレスまたは電話番号でアカウントを作成できます。',
      icon: UserPlus
    },
    {
      id: 'first-steps',
      title: '初回ログイン後の手順',
      category: 'getting-started',
      content: 'プロフィール設定、興味のあるジャンル選択、フォローするクリエイターを見つけましょう。',
      icon: CheckCircle
    },

    // アカウント
    {
      id: 'profile-setup',
      title: 'プロフィール設定方法',
      category: 'account',
      content: 'プロフィール写真、自己紹介、興味のあるジャンルを設定できます。',
      icon: User
    },
    {
      id: 'change-password',
      title: 'パスワード変更方法',
      category: 'account',
      content: '設定 > アカウント > パスワード変更から変更できます。',
      icon: Lock
    },
    {
      id: 'delete-account',
      title: 'アカウント削除方法',
      category: 'account',
      content: '設定 > アカウント > アカウント削除から削除できます。',
      icon: Trash2
    },

    // 設定
    {
      id: 'notification-settings',
      title: '通知設定の変更方法',
      category: 'settings',
      content: '設定 > メール通知設定から各種通知をON/OFFできます。',
      icon: Bell
    },
    {
      id: 'language-settings',
      title: '言語設定の変更方法',
      category: 'settings',
      content: '設定 > 言語設定から表示言語を変更できます。',
      icon: Globe
    },
    {
      id: 'privacy-settings',
      title: 'プライバシー設定',
      category: 'settings',
      content: '設定 > プライバシーからプロフィールの公開範囲を設定できます。',
      icon: Eye
    },

    // 料金・支払い
    {
      id: 'payment-methods',
      title: '支払い方法の登録',
      category: 'billing',
      content: 'クレジットカード、デビットカード、PayPalで支払いできます。',
      icon: CreditCard
    },
    {
      id: 'subscription-management',
      title: 'サブスクリプション管理',
      category: 'billing',
      content: '設定 > サブスクリプションからプランの変更・解約ができます。',
      icon: Calendar
    },
    {
      id: 'billing-history',
      title: '支払い履歴の確認',
      category: 'billing',
      content: '設定 > 支払い履歴から過去の支払いを確認できます。',
      icon: FileText
    },

    // 安全・プライバシー
    {
      id: 'report-content',
      title: '不適切なコンテンツの報告',
      category: 'safety',
      content: '投稿の「...」メニューから「報告」を選択して報告できます。',
      icon: Flag
    },
    {
      id: 'block-user',
      title: 'ユーザーのブロック方法',
      category: 'safety',
      content: 'プロフィールページの「...」メニューから「ブロック」を選択できます。',
      icon: UserMinus
    },
    {
      id: 'privacy-policy',
      title: 'プライバシーポリシー',
      category: 'safety',
      content: '個人情報の取り扱いについて詳しく説明しています。',
      icon: Shield
    },

    // トラブルシューティング
    {
      id: 'login-issues',
      title: 'ログインできない',
      category: 'troubleshooting',
      content: 'パスワードリセット、アカウント復旧手順をご案内します。',
      icon: AlertTriangle
    },
    {
      id: 'app-crashes',
      title: 'アプリがクラッシュする',
      category: 'troubleshooting',
      content: 'アプリの再起動、最新版への更新を試してください。',
      icon: RefreshCw
    },
    {
      id: 'slow-loading',
      title: '読み込みが遅い',
      category: 'troubleshooting',
      content: 'インターネット接続、アプリのキャッシュクリアを試してください。',
      icon: Clock
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId) => {
    const category = helpCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : HelpCircle;
  };

  const getCategoryColor = (categoryId) => {
    const category = helpCategories.find(cat => cat.id === categoryId);
    return category ? category.color : 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-pink-600 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          <HelpCircle className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-lg font-semibold text-gray-900">ヘルプ</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="ヘルプを検索..."
              className="flex-1 outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">カテゴリ</h2>
          <div className="grid grid-cols-2 gap-3">
            {helpCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? `bg-${category.color}-100 border-2 border-${category.color}-500`
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedCategory === 'all' ? 'すべての記事' : helpCategories.find(cat => cat.id === selectedCategory)?.name}
              <span className="text-sm text-gray-500 ml-2">({filteredArticles.length}件)</span>
            </h2>
          </div>
          
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => {
              const CategoryIcon = getCategoryIcon(article.category);
              const categoryColor = getCategoryColor(article.category);
              
              return (
                <div key={article.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-${categoryColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <CategoryIcon className={`w-5 h-5 text-${categoryColor}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{article.content}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 bg-${categoryColor}-100 text-${categoryColor}-700 rounded-full`}>
                          {helpCategories.find(cat => cat.id === article.category)?.name}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>該当する記事が見つかりませんでした。</p>
              <p className="text-sm mt-1">検索キーワードを変更してお試しください。</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">サポートに連絡</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">チャットサポート</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">メールサポート</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">電話サポート</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">よくある質問</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="font-medium text-gray-900">Q. アカウントを削除した後、復旧できますか？</h3>
              <p className="text-sm text-gray-600 mt-1">A. アカウント削除後30日以内であれば復旧可能です。サポートまでお問い合わせください。</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-900">Q. 支払い方法を変更するには？</h3>
              <p className="text-sm text-gray-600 mt-1">A. 設定 > 支払い方法から変更できます。</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900">Q. 通知が届きません</h3>
              <p className="text-sm text-gray-600 mt-1">A. 設定 > メール通知設定で通知が有効になっているか確認してください。</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HelpPage;
