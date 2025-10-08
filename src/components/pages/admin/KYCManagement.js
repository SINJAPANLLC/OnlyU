import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Camera,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Image as ImageIcon,
  Video,
  FileImage
} from 'lucide-react';

const KYCManagement = () => {
  const [kycApplications, setKycApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showApplicationDetail, setShowApplicationDetail] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    expired: 0
  });

  // フィルターオプション
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'pending', label: '審査中' },
    { value: 'approved', label: '承認済み' },
    { value: 'rejected', label: '拒否' },
    { value: 'expired', label: '期限切れ' }
  ];

  const typeOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'creator', label: 'クリエイター' },
    { value: 'premium', label: 'プレミアム' },
    { value: 'withdrawal', label: '出金' }
  ];

  // データを読み込み
  useEffect(() => {
    loadKYCApplications();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...kycApplications];

    // 検索フィルタ
    if (searchTerm) {
      filtered = filtered.filter(application =>
        application.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ステータスフィルタ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(application => application.status === filterStatus);
    }

    // タイプフィルタ
    if (filterType !== 'all') {
      filtered = filtered.filter(application => application.type === filterType);
    }

    setFilteredApplications(filtered);
  }, [kycApplications, searchTerm, filterStatus, filterType]);

  // 統計を更新
  useEffect(() => {
    const newStats = {
      total: kycApplications.length,
      pending: kycApplications.filter(a => a.status === 'pending').length,
      approved: kycApplications.filter(a => a.status === 'approved').length,
      rejected: kycApplications.filter(a => a.status === 'rejected').length,
      expired: kycApplications.filter(a => a.status === 'expired').length
    };
    setStats(newStats);
  }, [kycApplications]);

  // モックKYC申請データ
  const loadKYCApplications = () => {
    const mockApplications = [
      {
        id: 'KYC_001',
        type: 'creator',
        status: 'pending',
        userName: '田中花子',
        email: 'hanako@example.com',
        phone: '090-1234-5678',
        dateOfBirth: '1995-05-15',
        address: '東京都渋谷区恵比寿1-1-1',
        createdAt: new Date('2025-01-10T10:00:00'),
        submittedAt: new Date('2025-01-10T10:30:00'),
        reviewedAt: null,
        reviewedBy: null,
        documents: {
          idFront: '/api/documents/id_front_001.jpg',
          idBack: '/api/documents/id_back_001.jpg',
          selfie: '/api/documents/selfie_001.jpg',
          additional: []
        },
        verification: {
          ageVerified: true,
          identityVerified: false,
          addressVerified: false,
          faceMatch: null,
          documentQuality: 'good',
          issues: []
        },
        notes: '',
        rejectionReason: null
      },
      {
        id: 'KYC_002',
        type: 'premium',
        status: 'approved',
        userName: '佐藤次郎',
        email: 'jiro@example.com',
        phone: '090-2345-6789',
        dateOfBirth: '1988-12-03',
        address: '大阪府大阪市北区梅田2-2-2',
        createdAt: new Date('2025-01-09T14:20:00'),
        submittedAt: new Date('2025-01-09T14:45:00'),
        reviewedAt: new Date('2025-01-09T16:30:00'),
        reviewedBy: 'admin001',
        documents: {
          idFront: '/api/documents/id_front_002.jpg',
          idBack: '/api/documents/id_back_002.jpg',
          selfie: '/api/documents/selfie_002.jpg',
          additional: ['/api/documents/utility_bill_002.pdf']
        },
        verification: {
          ageVerified: true,
          identityVerified: true,
          addressVerified: true,
          faceMatch: 0.95,
          documentQuality: 'excellent',
          issues: []
        },
        notes: '書類が鮮明で本人確認が容易でした',
        rejectionReason: null
      },
      {
        id: 'KYC_003',
        type: 'creator',
        status: 'rejected',
        userName: '山田太郎',
        email: 'taro@example.com',
        phone: '090-3456-7890',
        dateOfBirth: '2000-08-20',
        address: '愛知県名古屋市中区栄3-3-3',
        createdAt: new Date('2025-01-08T09:15:00'),
        submittedAt: new Date('2025-01-08T09:30:00'),
        reviewedAt: new Date('2025-01-08T11:00:00'),
        reviewedBy: 'admin002',
        documents: {
          idFront: '/api/documents/id_front_003.jpg',
          idBack: '/api/documents/id_back_003.jpg',
          selfie: '/api/documents/selfie_003.jpg',
          additional: []
        },
        verification: {
          ageVerified: false,
          identityVerified: false,
          addressVerified: false,
          faceMatch: 0.45,
          documentQuality: 'poor',
          issues: ['年齢が18歳未満', '書類が不鮮明', '顔認証が一致しない']
        },
        notes: '年齢確認ができませんでした',
        rejectionReason: '年齢が18歳未満のため申請を拒否しました'
      },
      {
        id: 'KYC_004',
        type: 'withdrawal',
        status: 'expired',
        userName: '鈴木あい',
        email: 'ai@example.com',
        phone: '090-4567-8901',
        dateOfBirth: '1992-03-10',
        address: '福岡県福岡市博多区博多駅前4-4-4',
        createdAt: new Date('2025-01-05T16:30:00'),
        submittedAt: new Date('2025-01-05T16:45:00'),
        reviewedAt: null,
        reviewedBy: null,
        documents: {
          idFront: '/api/documents/id_front_004.jpg',
          idBack: '/api/documents/id_back_004.jpg',
          selfie: '/api/documents/selfie_004.jpg',
          additional: []
        },
        verification: {
          ageVerified: true,
          identityVerified: false,
          addressVerified: false,
          faceMatch: null,
          documentQuality: 'good',
          issues: []
        },
        notes: '',
        rejectionReason: null
      }
    ];
    setKycApplications(mockApplications);
  };

  // 申請を承認
  const approveApplication = (applicationId, reviewerId) => {
    setKycApplications(prev =>
      prev.map(application =>
        application.id === applicationId
          ? { 
              ...application, 
              status: 'approved',
              reviewedAt: new Date(),
              reviewedBy: reviewerId
            }
          : application
      )
    );
    setShowVerificationModal(null);
  };

  // 申請を拒否
  const rejectApplication = (applicationId, reason, reviewerId) => {
    setKycApplications(prev =>
      prev.map(application =>
        application.id === applicationId
          ? { 
              ...application, 
              status: 'rejected',
              reviewedAt: new Date(),
              reviewedBy: reviewerId,
              rejectionReason: reason
            }
          : application
      )
    );
    setShowVerificationModal(null);
  };

  // 複数選択
  const toggleSelection = (id) => {
    setSelectedApplications(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // 全選択
  const selectAll = () => {
    setSelectedApplications(filteredApplications.map(a => a.id));
  };

  // 選択解除
  const deselectAll = () => {
    setSelectedApplications([]);
  };

  // 一括操作
  const bulkAction = (action) => {
    selectedApplications.forEach(applicationId => {
      switch (action) {
        case 'approve':
          approveApplication(applicationId, 'admin_bulk');
          break;
        case 'reject':
          rejectApplication(applicationId, '一括拒否', 'admin_bulk');
          break;
      }
    });
    setSelectedApplications([]);
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // タイプの色を取得
  const getTypeColor = (type) => {
    switch (type) {
      case 'creator': return 'text-pink-600 bg-pink-100';
      case 'premium': return 'text-blue-600 bg-blue-100';
      case 'withdrawal': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 年齢を計算
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KYC管理</h1>
          <p className="text-gray-600">本人確認・年齢確認機能（身分証＋セルフィー＋年齢チェック）</p>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総申請数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">審査中</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">承認済み</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">拒否</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-gray-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">期限切れ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 検索 */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="申請を検索..."
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
        </div>
      </div>

      {/* 申請一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">申請一覧</h2>
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
              {selectedApplications.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">|</span>
                  <select
                    onChange={(e) => bulkAction(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">一括操作</option>
                    <option value="approve">承認</option>
                    <option value="reject">拒否</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredApplications.map(application => (
            <div key={application.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedApplications.includes(application.id)}
                  onChange={() => toggleSelection(application.id)}
                  className="mt-1 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                
                {/* 書類プレビュー */}
                <div className="flex-shrink-0">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                      <img 
                        src={application.documents.idFront} 
                        alt="身分証表面"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                      <img 
                        src={application.documents.selfie} 
                        alt="セルフィー"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 申請情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {application.userName}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(application.type)}`}>
                        {application.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowApplicationDetail(application)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {application.status === 'pending' && (
                        <button
                          onClick={() => setShowVerificationModal(application)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">年齢:</span> {calculateAge(application.dateOfBirth)}歳
                    </div>
                    <div>
                      <span className="font-medium">電話:</span> {application.phone}
                    </div>
                    <div>
                      <span className="font-medium">申請日:</span> {application.submittedAt.toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">顔認証:</span> 
                      {application.verification.faceMatch ? 
                        ` ${(application.verification.faceMatch * 100).toFixed(1)}%` : 
                        ' 未実施'
                      }
                    </div>
                  </div>

                  {/* 検証状況 */}
                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {application.verification.ageVerified ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> : 
                        <XCircle className="w-4 h-4 text-red-500" />
                      }
                      <span className="text-sm">年齢確認</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {application.verification.identityVerified ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> : 
                        <XCircle className="w-4 h-4 text-red-500" />
                      }
                      <span className="text-sm">身分証確認</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {application.verification.addressVerified ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> : 
                        <XCircle className="w-4 h-4 text-red-500" />
                      }
                      <span className="text-sm">住所確認</span>
                    </div>
                  </div>

                  {/* 問題点 */}
                  {application.verification.issues.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm text-red-600">
                        問題点: {application.verification.issues.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* 拒否理由 */}
                  {application.rejectionReason && (
                    <div className="mt-2">
                      <div className="text-sm text-red-600">
                        拒否理由: {application.rejectionReason}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 検証モーダル */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">KYC検証</h3>
            
            {/* 書類表示 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium mb-2">身分証表面</h4>
                <img 
                  src={showVerificationModal.documents.idFront} 
                  alt="身分証表面"
                  className="w-full h-48 object-cover border rounded"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">セルフィー</h4>
                <img 
                  src={showVerificationModal.documents.selfie} 
                  alt="セルフィー"
                  className="w-full h-48 object-cover border rounded"
                />
              </div>
            </div>

            {/* 申請者情報 */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">申請者情報</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>名前: {showVerificationModal.userName}</div>
                <div>年齢: {calculateAge(showVerificationModal.dateOfBirth)}歳</div>
                <div>電話: {showVerificationModal.phone}</div>
                <div>メール: {showVerificationModal.email}</div>
                <div className="col-span-2">住所: {showVerificationModal.address}</div>
              </div>
            </div>

            {/* 検証結果 */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">検証結果</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>年齢確認:</span>
                  <span className={showVerificationModal.verification.ageVerified ? 'text-green-600' : 'text-red-600'}>
                    {showVerificationModal.verification.ageVerified ? 'OK' : 'NG'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>身分証確認:</span>
                  <span className={showVerificationModal.verification.identityVerified ? 'text-green-600' : 'text-red-600'}>
                    {showVerificationModal.verification.identityVerified ? 'OK' : 'NG'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>住所確認:</span>
                  <span className={showVerificationModal.verification.addressVerified ? 'text-green-600' : 'text-red-600'}>
                    {showVerificationModal.verification.addressVerified ? 'OK' : 'NG'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>顔認証:</span>
                  <span>
                    {showVerificationModal.verification.faceMatch ? 
                      `${(showVerificationModal.verification.faceMatch * 100).toFixed(1)}%` : 
                      '未実施'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* 操作ボタン */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowVerificationModal(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                キャンセル
              </button>
              <button
                onClick={() => rejectApplication(showVerificationModal.id, '書類不備', 'admin')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                拒否
              </button>
              <button
                onClick={() => approveApplication(showVerificationModal.id, 'admin')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                承認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCManagement;
