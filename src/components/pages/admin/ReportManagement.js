import React, { useState, useEffect } from 'react';
import { 
  Flag, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Filter,
  Search,
  Download,
  RefreshCw,
  Plus,
  Calendar,
  User,
  MessageSquare,
  Ban,
  UserCheck,
  Clock,
  AlertCircle,
  FileText,
  Image,
  Video,
  MoreHorizontal,
  Edit3,
  Trash2,
  Send,
  Archive
} from 'lucide-react';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedReports, setSelectedReports] = useState([]);
  const [showReportDetail, setShowReportDetail] = useState(null);
  const [showActionModal, setShowActionModal] = useState(null);
  const [selectedReportForAction, setSelectedReportForAction] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0
  });

  // フィルターオプション
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'pending', label: '未処理' },
    { value: 'in_progress', label: '処理中' },
    { value: 'resolved', label: '解決済み' },
    { value: 'rejected', label: '却下' }
  ];

  const typeOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'spam', label: 'スパム' },
    { value: 'harassment', label: 'ハラスメント' },
    { value: 'inappropriate', label: '不適切なコンテンツ' },
    { value: 'copyright', label: '著作権侵害' },
    { value: 'fake', label: '偽アカウント' },
    { value: 'other', label: 'その他' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'urgent', label: '緊急' },
    { value: 'high', label: '高' },
    { value: 'medium', label: '中' },
    { value: 'low', label: '低' }
  ];

  // データを読み込み
  useEffect(() => {
    loadReports();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...reports];

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(report => report.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.type === filterType);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(report => report.priority === filterPriority);
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, filterStatus, filterType, filterPriority]);

  // 統計を更新
  useEffect(() => {
    const newStats = {
      total: reports.length,
      pending: reports.filter(r => r.status === 'pending').length,
      inProgress: reports.filter(r => r.status === 'in_progress').length,
      resolved: reports.filter(r => r.status === 'resolved').length,
      rejected: reports.filter(r => r.status === 'rejected').length
    };
    setStats(newStats);
  }, [reports]);

  // モック通報データ
  const loadReports = () => {
    const mockReports = [
      {
        id: 'RPT_001',
        type: 'inappropriate',
        priority: 'high',
        status: 'pending',
        reporterId: 'user001',
        reporterName: '田中太郎',
        reporterEmail: 'tanaka@example.com',
        reportedUserId: 'user003',
        reportedUserName: '山田次郎',
        reportedUserEmail: 'yamada@example.com',
        reportedContentId: 'post_123',
        reportedContentType: 'post',
        reportedContentTitle: '不適切な投稿',
        description: '暴力的な内容が含まれています。',
        evidence: ['screenshot1.png', 'screenshot2.png'],
        createdAt: new Date('2025-01-10T10:00:00'),
        updatedAt: new Date('2025-01-10T10:00:00'),
        assignedTo: null,
        resolution: null,
        resolutionDate: null,
        adminNotes: []
      },
      {
        id: 'RPT_002',
        type: 'spam',
        priority: 'medium',
        status: 'in_progress',
        reporterId: 'user002',
        reporterName: '佐藤花子',
        reporterEmail: 'sato@example.com',
        reportedUserId: 'user004',
        reportedUserName: '鈴木あい',
        reportedUserEmail: 'suzuki@example.com',
        reportedContentId: 'post_456',
        reportedContentType: 'post',
        reportedContentTitle: 'スパム投稿',
        description: '同じ内容を繰り返し投稿しています。',
        evidence: ['screenshot3.png'],
        createdAt: new Date('2025-01-09T15:30:00'),
        updatedAt: new Date('2025-01-09T16:00:00'),
        assignedTo: '管理者A',
        resolution: null,
        resolutionDate: null,
        adminNotes: ['調査中です。']
      },
      {
        id: 'RPT_003',
        type: 'harassment',
        priority: 'urgent',
        status: 'resolved',
        reporterId: 'user005',
        reporterName: '高橋健一',
        reporterEmail: 'takahashi@example.com',
        reportedUserId: 'user006',
        reportedUserName: '山田美咲',
        reportedUserEmail: 'yamada_m@example.com',
        reportedContentId: 'message_789',
        reportedContentType: 'message',
        reportedContentTitle: 'ハラスメントメッセージ',
        description: '個人を中傷するメッセージを送信しています。',
        evidence: ['message_screenshot.png'],
        createdAt: new Date('2025-01-08T14:20:00'),
        updatedAt: new Date('2025-01-09T10:00:00'),
        assignedTo: '管理者B',
        resolution: 'ユーザーをBANしました。',
        resolutionDate: new Date('2025-01-09T10:00:00'),
        adminNotes: ['証拠を確認し、BANを実行しました。']
      },
      {
        id: 'RPT_004',
        type: 'copyright',
        priority: 'high',
        status: 'rejected',
        reporterId: 'user007',
        reporterName: '鈴木次郎',
        reporterEmail: 'suzuki_j@example.com',
        reportedUserId: 'user008',
        reportedUserName: '田中花子',
        reportedUserEmail: 'tanaka_h@example.com',
        reportedContentId: 'post_101',
        reportedContentType: 'post',
        reportedContentTitle: '著作権侵害の疑い',
        description: '他人の画像を無断使用している可能性があります。',
        evidence: ['original_image.png', 'used_image.png'],
        createdAt: new Date('2025-01-07T11:15:00'),
        updatedAt: new Date('2025-01-08T09:00:00'),
        assignedTo: '管理者C',
        resolution: '証拠不十分のため却下',
        resolutionDate: new Date('2025-01-08T09:00:00'),
        adminNotes: ['著作権の証拠が不十分でした。']
      }
    ];
    setReports(mockReports);
  };

  // 通報のステータスを更新
  const updateReportStatus = (reportId, newStatus, resolution = null) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? {
              ...report,
              status: newStatus,
              resolution,
              resolutionDate: newStatus === 'resolved' || newStatus === 'rejected' ? new Date() : null,
              updatedAt: new Date()
            }
          : report
      )
    );
  };

  // 通報に担当者を割り当て
  const assignReport = (reportId, assignee) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? { ...report, assignedTo: assignee, status: 'in_progress', updatedAt: new Date() }
          : report
      )
    );
  };

  // 通報を削除
  const deleteReport = (reportId) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
  };

  // 複数選択
  const toggleSelection = (id) => {
    setSelectedReports(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // 全選択
  const selectAll = () => {
    setSelectedReports(filteredReports.map(r => r.id));
  };

  // 選択解除
  const deselectAll = () => {
    setSelectedReports([]);
  };

  // 一括処理
  const bulkAction = (action) => {
    selectedReports.forEach(reportId => {
      if (action === 'assign') {
        assignReport(reportId, '管理者A');
      } else if (action === 'resolve') {
        updateReportStatus(reportId, 'resolved', '一括処理により解決');
      } else if (action === 'reject') {
        updateReportStatus(reportId, 'rejected', '一括処理により却下');
      }
    });
    setSelectedReports([]);
    alert(`${selectedReports.length}件の通報を${action}しました。`);
  };

  // アクションモーダルを開く
  const openActionModal = (report, action) => {
    setSelectedReportForAction(report);
    setActionType(action);
    setActionReason('');
    setShowActionModal(true);
  };

  // アクションを実行
  const executeAction = () => {
    if (!actionReason.trim()) {
      alert('理由を入力してください。');
      return;
    }

    if (actionType === 'resolve') {
      updateReportStatus(selectedReportForAction.id, 'resolved', actionReason);
    } else if (actionType === 'reject') {
      updateReportStatus(selectedReportForAction.id, 'rejected', actionReason);
    } else if (actionType === 'ban') {
      updateReportStatus(selectedReportForAction.id, 'resolved', `ユーザーをBAN: ${actionReason}`);
    }

    setShowActionModal(false);
    setSelectedReportForAction(null);
    setActionType('');
    setActionReason('');
    alert('アクションを実行しました。');
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 優先度の色を取得
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // タイプの色を取得
  const getTypeColor = (type) => {
    switch (type) {
      case 'spam': return 'text-gray-600 bg-gray-100';
      case 'harassment': return 'text-red-600 bg-red-100';
      case 'inappropriate': return 'text-orange-600 bg-orange-100';
      case 'copyright': return 'text-purple-600 bg-purple-100';
      case 'fake': return 'text-yellow-600 bg-yellow-100';
      case 'other': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">通報管理</h1>
          <p className="text-gray-600">ユーザーからの通報を管理・処理します</p>
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
            <Flag className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総通報数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">未処理</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">処理中</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">解決済み</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">却下</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
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
                placeholder="通報を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
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

      {/* 一括操作 */}
      {selectedReports.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedReports.length}件選択中
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => bulkAction('assign')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                担当者割当
              </button>
              <button
                onClick={() => bulkAction('resolve')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                一括解決
              </button>
              <button
                onClick={() => bulkAction('reject')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                一括却下
              </button>
              <button
                onClick={deselectAll}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
              >
                選択解除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 通報一覧 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200" style={{minWidth: '1200px'}}>
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                    onChange={selectedReports.length === filteredReports.length ? deselectAll : selectAll}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                </th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                <th className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">通報者</th>
                <th className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">対象者</th>
                <th className="w-32 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">内容</th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">優先度</th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
                <th className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日時</th>
                <th className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => toggleSelection(report.id)}
                      className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-600 max-w-24">
                    <div className="truncate">
                      <div className="font-medium truncate">{report.reporterName}</div>
                      <div className="text-gray-500 truncate text-xs">{report.reporterEmail}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-600 max-w-24">
                    <div className="truncate">
                      <div className="font-medium truncate">{report.reportedUserName}</div>
                      <div className="text-gray-500 truncate text-xs">{report.reportedUserEmail}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-600 max-w-32">
                    <div className="truncate" title={report.reportedContentTitle}>
                      {report.reportedContentTitle}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-600 max-w-20">
                    <div className="truncate">
                      {report.assignedTo || '未割当'}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-600 max-w-24">
                    <div className="truncate">
                      {report.createdAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm font-medium max-w-24">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setShowReportDetail(report)}
                        className="text-blue-600 hover:text-blue-900"
                        title="詳細"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {report.status === 'pending' && (
                        <button
                          onClick={() => assignReport(report.id, '管理者A')}
                          className="text-green-600 hover:text-green-900"
                          title="担当者割当"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      {report.status !== 'resolved' && report.status !== 'rejected' && (
                        <>
                          <button
                            onClick={() => openActionModal(report, 'resolve')}
                            className="text-green-600 hover:text-green-900"
                            title="解決"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openActionModal(report, 'reject')}
                            className="text-red-600 hover:text-red-900"
                            title="却下"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openActionModal(report, 'ban')}
                            className="text-red-600 hover:text-red-900"
                            title="BAN"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteReport(report.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 通報詳細モーダル */}
      {showReportDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">通報詳細</h3>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">通報ID</label>
                  <p className="text-sm text-gray-600">{showReportDetail.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">タイプ</label>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(showReportDetail.type)}`}>
                    {showReportDetail.type}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">通報者</label>
                  <p className="text-sm text-gray-600">{showReportDetail.reporterName} ({showReportDetail.reporterEmail})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">対象者</label>
                  <p className="text-sm text-gray-600">{showReportDetail.reportedUserName} ({showReportDetail.reportedUserEmail})</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">通報内容</label>
                <p className="text-sm text-gray-600">{showReportDetail.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">証拠</label>
                <div className="flex space-x-2">
                  {showReportDetail.evidence.map((file, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-600 ml-1">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">優先度</label>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(showReportDetail.priority)}`}>
                    {showReportDetail.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(showReportDetail.status)}`}>
                    {showReportDetail.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">担当者</label>
                <p className="text-sm text-gray-600">{showReportDetail.assignedTo || '未割当'}</p>
              </div>
              {showReportDetail.resolution && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">解決内容</label>
                  <p className="text-sm text-gray-600">{showReportDetail.resolution}</p>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowReportDetail(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* アクションモーダル */}
      {showActionModal && selectedReportForAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {actionType === 'resolve' ? '通報を解決' :
               actionType === 'reject' ? '通報を却下' :
               actionType === 'ban' ? 'ユーザーをBAN' : 'アクション実行'}
            </h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  通報ID
                </label>
                <p className="text-sm text-gray-600">{selectedReportForAction.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  理由
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="理由を入力してください"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={executeAction}
                  disabled={!actionReason.trim()}
                  className={`px-4 py-2 text-white rounded-lg ${
                    actionType === 'ban' ? 'bg-red-500 hover:bg-red-600' :
                    actionType === 'reject' ? 'bg-red-500 hover:bg-red-600' :
                    'bg-green-500 hover:bg-green-600'
                  } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  実行
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagement;
