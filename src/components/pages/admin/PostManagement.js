import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Edit3, 
  Trash2,
  Shield,
  Image,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Flag,
  MoreHorizontal,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterViolation, setFilterViolation] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showPostDetail, setShowPostDetail] = useState(null);
  const [showViolationModal, setShowViolationModal] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    hidden: 0,
    flagged: 0,
    violations: 0
  });

  // フィルターオプション
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'published', label: '公開中' },
    { value: 'draft', label: '下書き' },
    { value: 'hidden', label: '非公開' },
    { value: 'flagged', label: 'フラグ付き' },
    { value: 'violation', label: '違反' }
  ];

  const typeOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'video', label: '動画' },
    { value: 'image', label: '画像' },
    { value: 'text', label: 'テキスト' }
  ];

  const violationOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'none', label: '違反なし' },
    { value: 'inappropriate', label: '不適切なコンテンツ' },
    { value: 'spam', label: 'スパム' },
    { value: 'copyright', label: '著作権侵害' },
    { value: 'harassment', label: 'ハラスメント' },
    { value: 'nudity', label: 'ヌード' },
    { value: 'violence', label: '暴力' }
  ];

  // 投稿データを読み込み
  useEffect(() => {
    loadPosts();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...posts];

    // 検索フィルタ
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ステータスフィルタ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(post => post.status === filterStatus);
    }

    // タイプフィルタ
    if (filterType !== 'all') {
      filtered = filtered.filter(post => post.type === filterType);
    }

    // 違反フィルタ
    if (filterViolation !== 'all') {
      if (filterViolation === 'none') {
        filtered = filtered.filter(post => post.violations.length === 0);
      } else {
        filtered = filtered.filter(post => 
          post.violations.some(v => v.type === filterViolation)
        );
      }
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, filterStatus, filterType, filterViolation]);

  // 統計を更新
  useEffect(() => {
    const newStats = {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      hidden: posts.filter(p => p.status === 'hidden').length,
      flagged: posts.filter(p => p.flagged).length,
      violations: posts.filter(p => p.violations.length > 0).length
    };
    setStats(newStats);
  }, [posts]);

  // モック投稿データ
  const loadPosts = () => {
    const mockPosts = [
      {
        id: '1',
        title: '特別な動画コンテンツ',
        description: '素敵な動画を投稿しました',
        creator: '田中花子',
        creatorId: 'creator_001',
        type: 'video',
        status: 'published',
        thumbnail: '/api/placeholder/300/200',
        duration: '5:30',
        views: 125000,
        likes: 8900,
        comments: 450,
        shares: 120,
        revenue: 125000,
        createdAt: new Date('2025-01-10T10:00:00'),
        publishedAt: new Date('2025-01-10T10:05:00'),
        flagged: false,
        violations: [],
        tags: ['ロマンス', '美少女'],
        isMosaicRequired: true,
        mosaicApplied: true,
        moderationNotes: ''
      },
      {
        id: '2',
        title: '不適切なコンテンツ',
        description: '問題のある投稿',
        creator: '佐藤次郎',
        creatorId: 'creator_002',
        type: 'image',
        status: 'hidden',
        thumbnail: '/api/placeholder/300/200',
        duration: null,
        views: 5000,
        likes: 200,
        comments: 50,
        shares: 10,
        revenue: 0,
        createdAt: new Date('2025-01-09T15:30:00'),
        publishedAt: new Date('2025-01-09T15:35:00'),
        flagged: true,
        violations: [
          { type: 'inappropriate', reason: '不適切なコンテンツ', date: new Date('2025-01-09T16:00:00') }
        ],
        tags: ['問題'],
        isMosaicRequired: true,
        mosaicApplied: false,
        moderationNotes: '不適切なコンテンツのため非公開にしました'
      },
      {
        id: '3',
        title: 'コスプレ動画',
        description: '可愛いコスプレを披露',
        creator: '鈴木あい',
        creatorId: 'creator_003',
        type: 'video',
        status: 'published',
        thumbnail: '/api/placeholder/300/200',
        duration: '8:15',
        views: 87000,
        likes: 6500,
        comments: 280,
        shares: 89,
        revenue: 87000,
        createdAt: new Date('2025-01-08T14:20:00'),
        publishedAt: new Date('2025-01-08T14:25:00'),
        flagged: false,
        violations: [],
        tags: ['コスプレ', '可愛い'],
        isMosaicRequired: false,
        mosaicApplied: false,
        moderationNotes: ''
      },
      {
        id: '4',
        title: 'スパム投稿',
        description: '広告ばかりの投稿',
        creator: '高橋太郎',
        creatorId: 'creator_004',
        type: 'text',
        status: 'hidden',
        thumbnail: null,
        duration: null,
        views: 1000,
        likes: 5,
        comments: 2,
        shares: 0,
        revenue: 0,
        createdAt: new Date('2025-01-07T09:15:00'),
        publishedAt: new Date('2025-01-07T09:20:00'),
        flagged: true,
        violations: [
          { type: 'spam', reason: 'スパム行為', date: new Date('2025-01-07T10:00:00') }
        ],
        tags: ['スパム'],
        isMosaicRequired: false,
        mosaicApplied: false,
        moderationNotes: 'スパム行為のため非公開にしました'
      },
      {
        id: '5',
        title: '下書き投稿',
        description: 'まだ公開していない投稿',
        creator: '山田美咲',
        creatorId: 'creator_005',
        type: 'video',
        status: 'draft',
        thumbnail: '/api/placeholder/300/200',
        duration: '3:45',
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        revenue: 0,
        createdAt: new Date('2025-01-10T11:30:00'),
        publishedAt: null,
        flagged: false,
        violations: [],
        tags: ['下書き'],
        isMosaicRequired: true,
        mosaicApplied: false,
        moderationNotes: ''
      }
    ];
    setPosts(mockPosts);
  };

  // 投稿のステータスを変更
  const changePostStatus = (postId, newStatus) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { 
              ...post, 
              status: newStatus,
              publishedAt: newStatus === 'published' ? new Date() : post.publishedAt
            }
          : post
      )
    );
  };

  // 投稿を削除
  const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // 違反を報告
  const reportViolation = (postId, violation) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { 
              ...post, 
              violations: [...post.violations, {
                type: violation.type,
                reason: violation.reason,
                date: new Date()
              }],
              flagged: true
            }
          : post
      )
    );
    setShowViolationModal(null);
  };

  // モザイクを適用/解除
  const toggleMosaic = (postId) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, mosaicApplied: !post.mosaicApplied }
          : post
      )
    );
  };

  // 複数選択
  const toggleSelection = (id) => {
    setSelectedPosts(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // 全選択
  const selectAll = () => {
    setSelectedPosts(filteredPosts.map(p => p.id));
  };

  // 選択解除
  const deselectAll = () => {
    setSelectedPosts([]);
  };

  // 一括操作
  const bulkAction = (action) => {
    selectedPosts.forEach(postId => {
      switch (action) {
        case 'publish':
          changePostStatus(postId, 'published');
          break;
        case 'hide':
          changePostStatus(postId, 'hidden');
          break;
        case 'delete':
          deletePost(postId);
          break;
        case 'apply_mosaic':
          toggleMosaic(postId);
          break;
      }
    });
    setSelectedPosts([]);
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'hidden': return 'text-red-600 bg-red-100';
      case 'flagged': return 'text-orange-600 bg-orange-100';
      case 'violation': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // タイプのアイコンを取得
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'image': return <Image className="w-5 h-5 text-green-500" />;
      case 'text': return <FileText className="w-5 h-5 text-gray-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">投稿管理</h1>
          <p className="text-gray-600">投稿の公開/非公開切替、違反検出、モザイク処理を行います</p>
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
            <FileText className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総投稿数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">公開中</p>
              <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Edit3 className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">下書き</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <EyeOff className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">非公開</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hidden}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Flag className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">フラグ付き</p>
              <p className="text-2xl font-bold text-gray-900">{stats.flagged}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">違反</p>
              <p className="text-2xl font-bold text-gray-900">{stats.violations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 検索 */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="投稿を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* ステータスフィルター */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* タイプフィルター */}
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

          {/* 違反フィルター */}
          <div>
            <select
              value={filterViolation}
              onChange={(e) => setFilterViolation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {violationOptions.map(violation => (
                <option key={violation.value} value={violation.value}>
                  {violation.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">投稿一覧</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={selectAll}
                className="text-sm text-pink-600 hover:text-pink-700"
              >
                全選択
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={deselectAll}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                選択解除
              </button>
              {selectedPosts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">|</span>
                  <select
                    onChange={(e) => bulkAction(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">一括操作</option>
                    <option value="publish">公開</option>
                    <option value="hide">非公開</option>
                    <option value="apply_mosaic">モザイク適用</option>
                    <option value="delete">削除</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPosts.map(post => (
            <div key={post.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id)}
                  onChange={() => toggleSelection(post.id)}
                  className="mt-1 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                
                {/* サムネイル */}
                <div className="flex-shrink-0">
                  {post.thumbnail ? (
                    <div className="relative w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      {post.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      )}
                      {post.isMosaicRequired && (
                        <div className="absolute top-1 right-1">
                          <Shield className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {getTypeIcon(post.type)}
                    </div>
                  )}
                </div>

                {/* 投稿情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {post.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      {post.flagged && (
                        <Flag className="w-4 h-4 text-orange-500" />
                      )}
                      {post.violations.length > 0 && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowPostDetail(post)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowViolationModal(post)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => changePostStatus(post.id, post.status === 'published' ? 'hidden' : 'published')}
                        className={post.status === 'published' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-600 truncate">{post.description}</p>
                  
                  <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                    <span>by {post.creator}</span>
                    <span>再生: {post.views.toLocaleString()}</span>
                    <span>いいね: {post.likes.toLocaleString()}</span>
                    <span>コメント: {post.comments.toLocaleString()}</span>
                    <span>収益: ¥{post.revenue.toLocaleString()}</span>
                    <span>作成: {post.createdAt.toLocaleDateString()}</span>
                  </div>

                  {/* タグ */}
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 違反情報 */}
                  {post.violations.length > 0 && (
                    <div className="mt-2">
                      {post.violations.map((violation, index) => (
                        <div key={index} className="text-xs text-red-600">
                          違反: {violation.reason} ({violation.date.toLocaleDateString()})
                        </div>
                      ))}
                    </div>
                  )}

                  {/* モザイク情報 */}
                  {post.isMosaicRequired && (
                    <div className="mt-2 flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-600">
                        モザイク必要: {post.mosaicApplied ? '適用済み' : '未適用'}
                      </span>
                      <button
                        onClick={() => toggleMosaic(post.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {post.mosaicApplied ? '解除' : '適用'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 違反報告モーダル */}
      {showViolationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">違反を報告</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  違反タイプ
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="inappropriate">不適切なコンテンツ</option>
                  <option value="spam">スパム</option>
                  <option value="copyright">著作権侵害</option>
                  <option value="harassment">ハラスメント</option>
                  <option value="nudity">ヌード</option>
                  <option value="violence">暴力</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  理由
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="違反理由を入力してください"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowViolationModal(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => reportViolation(showViolationModal.id, { type: 'inappropriate', reason: '不適切なコンテンツ' })}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  報告
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
