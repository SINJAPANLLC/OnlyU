import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Ban, 
  UserCheck, 
  AlertTriangle, 
  MessageSquare, 
  Eye, 
  Edit3, 
  Trash2,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState(null);
  const [showBanModal, setShowBanModal] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(null);
  const [selectedUserForBan, setSelectedUserForBan] = useState(null);
  const [banReason, setBanReason] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    banned: 0,
    pending: 0,
    creators: 0
  });

  // フィルターオプション
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'active', label: 'アクティブ' },
    { value: 'banned', label: 'BAN済み' },
    { value: 'pending', label: '承認待ち' },
    { value: 'suspended', label: '一時停止' }
  ];

  const roleOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'user', label: '一般ユーザー' },
    { value: 'creator', label: 'クリエイター' },
    { value: 'admin', label: '管理者' }
  ];

  // ユーザーデータを読み込み
  useEffect(() => {
    loadUsers();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...users];

    // 検索フィルタ
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ステータスフィルタ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    // ロールフィルタ
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterStatus, filterRole]);

  // 統計を更新
  useEffect(() => {
    const newStats = {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      banned: users.filter(u => u.status === 'banned').length,
      pending: users.filter(u => u.status === 'pending').length,
      creators: users.filter(u => u.role === 'creator').length
    };
    setStats(newStats);
  }, [users]);

  // モックユーザーデータ
  const loadUsers = () => {
    const mockUsers = [
      {
        id: '1',
        username: 'user001',
        email: 'user001@example.com',
        displayName: '田中太郎',
        role: 'creator',
        status: 'active',
        createdAt: new Date('2024-12-01'),
        lastLogin: new Date('2025-01-10T09:30:00'),
        postsCount: 25,
        followersCount: 1250,
        followingCount: 89,
        totalEarnings: 125000,
        reportsCount: 0,
        isVerified: true,
        kycStatus: 'verified',
        banReason: null,
        banDate: null
      },
      {
        id: '2',
        username: 'user002',
        email: 'user002@example.com',
        displayName: '佐藤花子',
        role: 'user',
        status: 'active',
        createdAt: new Date('2024-11-15'),
        lastLogin: new Date('2025-01-09T14:20:00'),
        postsCount: 0,
        followersCount: 0,
        followingCount: 15,
        totalEarnings: 0,
        reportsCount: 0,
        isVerified: false,
        kycStatus: 'pending',
        banReason: null,
        banDate: null
      },
      {
        id: '3',
        username: 'user003',
        email: 'user003@example.com',
        displayName: '山田次郎',
        role: 'creator',
        status: 'banned',
        createdAt: new Date('2024-10-20'),
        lastLogin: new Date('2025-01-05T16:45:00'),
        postsCount: 8,
        followersCount: 320,
        followingCount: 45,
        totalEarnings: 45000,
        reportsCount: 3,
        isVerified: true,
        kycStatus: 'verified',
        banReason: '不適切なコンテンツの投稿',
        banDate: new Date('2025-01-08T10:00:00')
      },
      {
        id: '4',
        username: 'user004',
        email: 'user004@example.com',
        displayName: '鈴木美咲',
        role: 'creator',
        status: 'pending',
        createdAt: new Date('2025-01-08'),
        lastLogin: new Date('2025-01-10T11:15:00'),
        postsCount: 0,
        followersCount: 0,
        followingCount: 5,
        totalEarnings: 0,
        reportsCount: 0,
        isVerified: false,
        kycStatus: 'pending',
        banReason: null,
        banDate: null
      },
      {
        id: '5',
        username: 'user005',
        email: 'user005@example.com',
        displayName: '高橋健一',
        role: 'user',
        status: 'suspended',
        createdAt: new Date('2024-09-10'),
        lastLogin: new Date('2025-01-07T13:30:00'),
        postsCount: 0,
        followersCount: 0,
        followingCount: 8,
        totalEarnings: 0,
        reportsCount: 1,
        isVerified: false,
        kycStatus: 'not_verified',
        banReason: 'スパム行為',
        banDate: new Date('2025-01-09T09:00:00')
      }
    ];
    setUsers(mockUsers);
  };

  // ユーザーをBAN
  const banUser = (userId, reason) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'banned', banReason: reason, banDate: new Date() }
          : user
      )
    );
    setShowBanModal(null);
    setSelectedUserForBan(null);
    setBanReason('');
    alert(`ユーザー ${userId} をBANしました。理由: ${reason}`);
  };

  // BANモーダルを開く
  const openBanModal = (user) => {
    setSelectedUserForBan(user);
    setShowBanModal(true);
  };

  // BANモーダルを閉じる
  const closeBanModal = () => {
    setShowBanModal(false);
    setSelectedUserForBan(null);
    setBanReason('');
  };

  // バルクアクション機能
  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      alert('ユーザーを選択してください');
      return;
    }

    switch (action) {
      case 'ban':
        if (window.confirm(`${selectedUsers.length}人のユーザーをBANしますか？`)) {
          selectedUsers.forEach(userId => {
            const user = users.find(u => u.id === userId);
            if (user) {
              banUser(userId, 'バルクBAN');
            }
          });
          setSelectedUsers([]);
          setShowBulkActions(false);
        }
        break;
      case 'unban':
        if (window.confirm(`${selectedUsers.length}人のユーザーのBANを解除しますか？`)) {
          selectedUsers.forEach(userId => {
            const user = users.find(u => u.id === userId);
            if (user) {
              setUsers(prev => prev.map(u => 
                u.id === userId ? { ...u, status: 'active', banDate: null, banReason: null } : u
              ));
            }
          });
          setSelectedUsers([]);
          setShowBulkActions(false);
        }
        break;
      case 'activate':
        if (window.confirm(`${selectedUsers.length}人のユーザーをアクティブにしますか？`)) {
          selectedUsers.forEach(userId => {
            setUsers(prev => prev.map(u => 
              u.id === userId ? { ...u, status: 'active' } : u
            ));
          });
          setSelectedUsers([]);
          setShowBulkActions(false);
        }
        break;
      case 'suspend':
        if (window.confirm(`${selectedUsers.length}人のユーザーを一時停止しますか？`)) {
          selectedUsers.forEach(userId => {
            setUsers(prev => prev.map(u => 
              u.id === userId ? { ...u, status: 'suspended' } : u
            ));
          });
          setSelectedUsers([]);
          setShowBulkActions(false);
        }
        break;
      case 'delete':
        if (window.confirm(`${selectedUsers.length}人のユーザーを削除しますか？この操作は取り消せません。`)) {
          setUsers(prev => prev.filter(u => !selectedUsers.includes(u.id)));
          setSelectedUsers([]);
          setShowBulkActions(false);
        }
        break;
      default:
        break;
    }
  };

  // エクスポート機能
  const handleExport = () => {
    const dataToExport = filteredUsers.map(user => ({
      ID: user.id,
      名前: user.name,
      メール: user.email,
      ステータス: user.status,
      ロール: user.role,
      登録日: user.joinDate,
      '最終ログイン': user.lastLogin,
      '投稿数': user.posts,
      'フォロワー数': user.followers
    }));

    if (exportFormat === 'csv') {
      const csvContent = convertToCSV(dataToExport);
      downloadCSV(csvContent, 'users.csv');
    } else if (exportFormat === 'excel') {
      // Excelエクスポートの実装
      console.log('Excel export:', dataToExport);
    }
    setShowExportModal(false);
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ];
    return csvRows.join('\n');
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ユーザーのBANを解除
  const unbanUser = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'active', banReason: null, banDate: null }
          : user
      )
    );
  };

  // ユーザーを承認
  const approveUser = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'active', isVerified: true }
          : user
      )
    );
  };

  // ユーザーを拒否
  const rejectUser = (userId, reason) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: 'banned', banReason: reason, banDate: new Date() }
          : user
      )
    );
  };

  // 複数選択
  const toggleSelection = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // 全選択
  const selectAll = () => {
    setSelectedUsers(filteredUsers.map(u => u.id));
  };

  // 選択解除
  const deselectAll = () => {
    setSelectedUsers([]);
  };


  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'banned': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // ロールの色を取得
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'creator': return 'text-pink-600 bg-pink-100';
      case 'user': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
          <p className="text-gray-600">ユーザーの管理、BAN対応、通報処理を行います</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowExportModal(true)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>エクスポート</span>
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>インポート</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総ユーザー数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">アクティブ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Ban className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">BAN済み</p>
              <p className="text-2xl font-bold text-gray-900">{stats.banned}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">承認待ち</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">クリエイター</p>
              <p className="text-2xl font-bold text-gray-900">{stats.creators}</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 検索 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ユーザーを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* ステータスフィルター */}
          <div className="md:w-48">
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

          {/* ロールフィルター */}
          <div className="md:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ユーザー一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">ユーザー一覧</h2>
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
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">|</span>
                  <select
                    onChange={(e) => bulkAction(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">一括操作</option>
                    <option value="ban">BAN</option>
                    <option value="unban">BAN解除</option>
                    <option value="approve">承認</option>
                    <option value="reject">拒否</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ユーザー
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ロール
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  統計
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最終ログイン
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelection(user.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-pink-600">
                            {user.displayName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName}
                          {user.isVerified && (
                            <CheckCircle className="inline w-4 h-4 text-blue-500 ml-1" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    {user.banReason && (
                      <div className="text-xs text-red-600 mt-1">
                        {user.banReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>投稿: {user.postsCount}</div>
                    <div>フォロワー: {user.followersCount}</div>
                    <div>収益: ¥{user.totalEarnings.toLocaleString()}</div>
                    {user.reportsCount > 0 && (
                      <div className="text-red-600">通報: {user.reportsCount}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowUserDetail(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowSupportModal(user)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      {user.status === 'banned' ? (
                        <button
                          onClick={() => unbanUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => openBanModal(user)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BANモーダル */}
      {showBanModal && selectedUserForBan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-red-600">ユーザーをBAN</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ユーザー
                </label>
                <p className="text-sm text-gray-600">
                  {selectedUserForBan.displayName} ({selectedUserForBan.email})
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BAN理由
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="BAN理由を入力してください"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeBanModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => banUser(selectedUserForBan.id, banReason)}
                  disabled={!banReason.trim()}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  BAN実行
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* エクスポートモーダル */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">データエクスポート</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    エクスポート形式
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    エクスポート対象
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="exportTarget" value="all" defaultChecked className="mr-2" />
                      全ユーザー
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="exportTarget" value="filtered" className="mr-2" />
                      フィルター済みユーザー
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="exportTarget" value="selected" className="mr-2" />
                      選択されたユーザー ({selectedUsers.length}人)
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                >
                  エクスポート
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
