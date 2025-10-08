import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Frown,
  Smile,
  Meh,
  Flag,
  Send,
  Reply,
  Archive,
  Tag
} from 'lucide-react';

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSentiment, setFilterSentiment] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    avgRating: 0,
    responseRate: 0
  });

  // フィルターオプション
  const typeOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'bug', label: 'バグ報告' },
    { value: 'feature', label: '機能要望' },
    { value: 'complaint', label: '苦情' },
    { value: 'compliment', label: '称賛' },
    { value: 'suggestion', label: '提案' },
    { value: 'question', label: '質問' }
  ];

  const sentimentOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'positive', label: 'ポジティブ' },
    { value: 'negative', label: 'ネガティブ' },
    { value: 'neutral', label: 'ニュートラル' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'high', label: '高' },
    { value: 'medium', label: '中' },
    { value: 'low', label: '低' }
  ];

  // データを読み込み
  useEffect(() => {
    loadFeedbacks();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...feedbacks];

    if (searchTerm) {
      filtered = filtered.filter(feedback =>
        feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(feedback => feedback.type === filterType);
    }

    if (filterSentiment !== 'all') {
      filtered = filtered.filter(feedback => feedback.sentiment === filterSentiment);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(feedback => feedback.priority === filterPriority);
    }

    setFilteredFeedbacks(filtered);
  }, [feedbacks, searchTerm, filterType, filterSentiment, filterPriority]);

  // 統計を更新
  useEffect(() => {
    const total = feedbacks.length;
    const positive = feedbacks.filter(f => f.sentiment === 'positive').length;
    const negative = feedbacks.filter(f => f.sentiment === 'negative').length;
    const neutral = feedbacks.filter(f => f.sentiment === 'neutral').length;
    const avgRating = feedbacks.length > 0 ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length : 0;
    const responseRate = feedbacks.length > 0 ? (feedbacks.filter(f => f.response).length / feedbacks.length) * 100 : 0;

    setStats({ total, positive, negative, neutral, avgRating, responseRate });
  }, [feedbacks]);

  // モックフィードバックデータ
  const loadFeedbacks = () => {
    const mockFeedbacks = [
      {
        id: 'FB_001',
        type: 'feature',
        sentiment: 'positive',
        priority: 'high',
        title: '動画の再生速度調整機能の追加',
        content: '動画の再生速度を0.5倍、1.25倍、1.5倍、2倍に調整できる機能があると便利です。学習用途で使用しているため、ゆっくり再生したい場面が多くあります。',
        userName: '田中太郎',
        userEmail: 'tanaka@example.com',
        rating: 5,
        tags: ['動画', '機能要望', '学習'],
        createdAt: new Date('2025-01-10T10:00:00'),
        status: 'open',
        response: null,
        responseAt: null,
        assignedTo: null,
        votes: 15,
        comments: 3,
        attachments: []
      },
      {
        id: 'FB_002',
        type: 'bug',
        sentiment: 'negative',
        priority: 'high',
        title: 'ログイン時にエラーが発生する',
        content: 'ログイン時に「サーバーエラーが発生しました」というメッセージが表示され、ログインできません。Chromeブラウザで発生しています。',
        userName: '佐藤花子',
        userEmail: 'sato@example.com',
        rating: 1,
        tags: ['ログイン', 'エラー', 'Chrome'],
        createdAt: new Date('2025-01-09T15:30:00'),
        status: 'in_progress',
        response: 'ご報告いただき、ありがとうございます。現在調査中です。',
        responseAt: new Date('2025-01-09T16:00:00'),
        assignedTo: '技術チーム',
        votes: 8,
        comments: 1,
        attachments: ['screenshot.png']
      },
      {
        id: 'FB_003',
        type: 'compliment',
        sentiment: 'positive',
        priority: 'low',
        title: 'UIがとても使いやすい',
        content: '他のプラットフォームと比べて、UIがとても直感的で使いやすいです。特に動画の検索機能が優秀だと思います。',
        userName: '山田次郎',
        userEmail: 'yamada@example.com',
        rating: 5,
        tags: ['UI', '使いやすさ', '検索'],
        createdAt: new Date('2025-01-08T14:20:00'),
        status: 'closed',
        response: 'ありがとうございます！今後も使いやすさを追求していきます。',
        responseAt: new Date('2025-01-08T15:00:00'),
        assignedTo: 'デザインチーム',
        votes: 12,
        comments: 0,
        attachments: []
      },
      {
        id: 'FB_004',
        type: 'complaint',
        sentiment: 'negative',
        priority: 'medium',
        title: '課金システムに問題がある',
        content: '課金が二重に発生してしまいました。返金処理をお願いします。',
        userName: '鈴木あい',
        userEmail: 'suzuki@example.com',
        rating: 2,
        tags: ['課金', '返金', '問題'],
        createdAt: new Date('2025-01-07T11:15:00'),
        status: 'resolved',
        response: 'ご迷惑をおかけして申し訳ありません。返金処理を完了いたしました。',
        responseAt: new Date('2025-01-07T12:00:00'),
        assignedTo: 'カスタマーサポート',
        votes: 5,
        comments: 2,
        attachments: ['receipt.pdf']
      },
      {
        id: 'FB_005',
        type: 'suggestion',
        sentiment: 'neutral',
        priority: 'medium',
        title: 'ダークモードの追加',
        content: '目が疲れるので、ダークモードがあると助かります。',
        userName: '高橋健一',
        userEmail: 'takahashi@example.com',
        rating: 4,
        tags: ['ダークモード', 'UI', '目への配慮'],
        createdAt: new Date('2025-01-06T09:30:00'),
        status: 'open',
        response: null,
        responseAt: null,
        assignedTo: null,
        votes: 23,
        comments: 5,
        attachments: []
      }
    ];
    setFeedbacks(mockFeedbacks);
  };

  // フィードバックに返信
  const respondToFeedback = (feedbackId, response) => {
    setFeedbacks(prev =>
      prev.map(feedback =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              response,
              responseAt: new Date(),
              status: 'responded'
            }
          : feedback
      )
    );
    setShowResponseModal(null);
  };

  // ステータスを更新
  const updateStatus = (feedbackId, newStatus) => {
    setFeedbacks(prev =>
      prev.map(feedback =>
        feedback.id === feedbackId
          ? { ...feedback, status: newStatus }
          : feedback
      )
    );
  };

  // 優先度を更新
  const updatePriority = (feedbackId, newPriority) => {
    setFeedbacks(prev =>
      prev.map(feedback =>
        feedback.id === feedbackId
          ? { ...feedback, priority: newPriority }
          : feedback
      )
    );
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'responded': return 'text-purple-600 bg-purple-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 優先度の色を取得
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 感情のアイコンを取得
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-500" />;
      case 'neutral': return <Meh className="w-5 h-5 text-gray-500" />;
      default: return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  // タイプのアイコンを取得
  const getTypeIcon = (type) => {
    switch (type) {
      case 'bug': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'feature': return <Plus className="w-5 h-5 text-blue-500" />;
      case 'complaint': return <Flag className="w-5 h-5 text-orange-500" />;
      case 'compliment': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'suggestion': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'question': return <MessageSquare className="w-5 h-5 text-gray-500" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">顧客フィードバック</h1>
          <p className="text-gray-600">ユーザーフィードバックの収集・分析・対応管理</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>エクスポート</span>
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>更新</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総フィードバック</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Smile className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ポジティブ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.positive}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Frown className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ネガティブ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.negative}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均評価</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Reply className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">返信率</p>
              <p className="text-2xl font-bold text-gray-900">{stats.responseRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">対応中</p>
              <p className="text-2xl font-bold text-gray-900">
                {feedbacks.filter(f => f.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="フィードバックを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {typeOptions.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {sentimentOptions.map(sentiment => (
                <option key={sentiment.value} value={sentiment.value}>
                  {sentiment.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {priorityOptions.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>詳細フィルター</span>
            </button>
          </div>
        </div>
      </div>

      {/* フィードバック一覧 */}
      <div className="space-y-4">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getTypeIcon(feedback.type)}
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                    {feedback.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feedback.priority)}`}>
                    {feedback.priority}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getSentimentIcon(feedback.sentiment)}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{feedback.content}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{feedback.userName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{feedback.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{feedback.votes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{feedback.comments}</span>
                  </div>
                </div>

                {/* タグ */}
                {feedback.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {feedback.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 返信 */}
                {feedback.response && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Reply className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700">返信</span>
                      <span className="text-xs text-blue-500">
                        {feedback.responseAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">{feedback.response}</p>
                  </div>
                )}

                {/* 担当者 */}
                {feedback.assignedTo && (
                  <div className="text-sm text-gray-600">
                    担当: {feedback.assignedTo}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedFeedback(feedback)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowResponseModal(feedback)}
                  className="text-green-600 hover:text-green-900"
                >
                  <Reply className="w-5 h-5" />
                </button>
                <button className="text-purple-600 hover:text-purple-900">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 返信モーダル */}
      {showResponseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">フィードバックに返信</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  返信内容
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="4"
                  placeholder="返信内容を入力してください"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowResponseModal(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => respondToFeedback(showResponseModal.id, '返信内容')}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  返信
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;
