import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Star, 
  Search, 
  Filter, 
  Ban, 
  UserCheck, 
  AlertTriangle, 
  Eye, 
  Edit3, 
  Trash2,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Download,
  Upload,
  Crown,
  TrendingUp,
  DollarSign,
  Users,
  MessageCircle,
  Settings,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';

export default function Creators() {
    const [creators, setCreators] = useState([]);
    const [filteredCreators, setFilteredCreators] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterVerification, setFilterVerification] = useState('all');
    const [selectedCreators, setSelectedCreators] = useState([]);
    const [showCreatorDetail, setShowCreatorDetail] = useState(null);
    const [showBanModal, setShowBanModal] = useState(null);
    const [showVerificationModal, setShowVerificationModal] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportFormat, setExportFormat] = useState('csv');
    const [selectedCreatorForBan, setSelectedCreatorForBan] = useState(null);
    const [banReason, setBanReason] = useState('');
    const [verificationNotes, setVerificationNotes] = useState('');
    const { t } = useTranslation();

    const [stats, setStats] = useState({
        total: 0,
        verified: 0,
        pending: 0,
        banned: 0,
        active: 0
    });

    // フィルターオプション
    const statusOptions = [
        { value: 'all', label: 'すべて' },
        { value: 'active', label: 'アクティブ' },
        { value: 'banned', label: 'BAN済み' },
        { value: 'pending', label: '承認待ち' },
        { value: 'suspended', label: '一時停止' }
    ];

    const verificationOptions = [
        { value: 'all', label: 'すべて' },
        { value: 'verified', label: '認証済み' },
        { value: 'pending', label: '認証待ち' },
        { value: 'rejected', label: '認証拒否' }
    ];

    useEffect(() => {
        // モックデータ
        const mockCreators = [
            { 
                id: 1, 
                name: "田中花子", 
                email: "hanako@example.com",
                status: "active", 
                verification: "verified",
                joinDate: "2024-01-15",
                lastLogin: "2024-01-20",
                posts: 45,
                followers: 1250,
                revenue: 125000,
                rating: 4.8,
                category: "美容・ファッション",
                bio: "美容とファッションを中心に発信しています",
                avatar: null
            },
            { 
                id: 2, 
                name: "佐藤太郎", 
                email: "taro@example.com",
                status: "pending", 
                verification: "pending",
                joinDate: "2024-01-18",
                lastLogin: "2024-01-19",
                posts: 12,
                followers: 89,
                revenue: 0,
                rating: 4.2,
                category: "テクノロジー",
                bio: "最新のテクノロジー情報をお届けします",
                avatar: null
            },
            { 
                id: 3, 
                name: "山田美咲", 
                email: "misaki@example.com",
                status: "banned", 
                verification: "verified",
                joinDate: "2024-01-10",
                lastLogin: "2024-01-15",
                posts: 23,
                followers: 456,
                revenue: 0,
                rating: 3.1,
                category: "エンターテイメント",
                bio: "エンターテイメント情報を発信",
                avatar: null
            }
        ];
        
        setCreators(mockCreators);
        setFilteredCreators(mockCreators);
        
        // 統計を計算
        setStats({
            total: mockCreators.length,
            verified: mockCreators.filter(c => c.verification === 'verified').length,
            pending: mockCreators.filter(c => c.status === 'pending').length,
            banned: mockCreators.filter(c => c.status === 'banned').length,
            active: mockCreators.filter(c => c.status === 'active').length
        });
    }, []);

    // 検索・フィルター処理
    useEffect(() => {
        let filtered = creators;

        if (searchTerm) {
            filtered = filtered.filter(creator =>
                creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                creator.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(creator => creator.status === filterStatus);
        }

        if (filterVerification !== 'all') {
            filtered = filtered.filter(creator => creator.verification === filterVerification);
        }

        setFilteredCreators(filtered);
    }, [creators, searchTerm, filterStatus, filterVerification]);

    // クリエイターの選択
    const toggleCreatorSelection = (creatorId) => {
        setSelectedCreators(prev =>
            prev.includes(creatorId)
                ? prev.filter(id => id !== creatorId)
                : [...prev, creatorId]
        );
    };

    const selectAll = () => {
        setSelectedCreators(filteredCreators.map(creator => creator.id));
    };

    const deselectAll = () => {
        setSelectedCreators([]);
    };

    // バルクアクション
    const handleBulkAction = (action) => {
        if (selectedCreators.length === 0) {
            alert('クリエイターを選択してください');
            return;
        }

        switch (action) {
            case 'verify':
                if (window.confirm(`${selectedCreators.length}人のクリエイターを認証しますか？`)) {
                    setCreators(prev => prev.map(creator =>
                        selectedCreators.includes(creator.id)
                            ? { ...creator, verification: 'verified' }
                            : creator
                    ));
                    setSelectedCreators([]);
                }
                break;
            case 'reject':
                if (window.confirm(`${selectedCreators.length}人のクリエイターの認証を拒否しますか？`)) {
                    setCreators(prev => prev.map(creator =>
                        selectedCreators.includes(creator.id)
                            ? { ...creator, verification: 'rejected' }
                            : creator
                    ));
                    setSelectedCreators([]);
                }
                break;
            case 'ban':
                if (window.confirm(`${selectedCreators.length}人のクリエイターをBANしますか？`)) {
                    setCreators(prev => prev.map(creator =>
                        selectedCreators.includes(creator.id)
                            ? { ...creator, status: 'banned' }
                            : creator
                    ));
                    setSelectedCreators([]);
                }
                break;
            case 'activate':
                if (window.confirm(`${selectedCreators.length}人のクリエイターをアクティブにしますか？`)) {
                    setCreators(prev => prev.map(creator =>
                        selectedCreators.includes(creator.id)
                            ? { ...creator, status: 'active' }
                            : creator
                    ));
                    setSelectedCreators([]);
                }
                break;
            default:
                break;
        }
    };

    // 個別アクション
    const banCreator = (creatorId, reason) => {
        setCreators(prev => prev.map(creator =>
            creator.id === creatorId
                ? { ...creator, status: 'banned', banReason: reason, banDate: new Date().toISOString() }
                : creator
        ));
        setShowBanModal(false);
        setSelectedCreatorForBan(null);
        setBanReason('');
    };

    const verifyCreator = (creatorId, notes) => {
        setCreators(prev => prev.map(creator =>
            creator.id === creatorId
                ? { ...creator, verification: 'verified', verificationNotes: notes, verificationDate: new Date().toISOString() }
                : creator
        ));
        setShowVerificationModal(false);
        setVerificationNotes('');
    };

    // エクスポート機能
    const handleExport = () => {
        const dataToExport = filteredCreators.map(creator => ({
            ID: creator.id,
            名前: creator.name,
            メール: creator.email,
            ステータス: creator.status,
            認証状況: creator.verification,
            登録日: creator.joinDate,
            '最終ログイン': creator.lastLogin,
            投稿数: creator.posts,
            フォロワー数: creator.followers,
            収益: creator.revenue,
            評価: creator.rating,
            カテゴリ: creator.category
        }));

        if (exportFormat === 'csv') {
            const csvContent = convertToCSV(dataToExport);
            downloadCSV(csvContent, 'creators.csv');
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

    // 認証状況の色を取得
    const getVerificationColor = (verification) => {
        switch (verification) {
            case 'verified': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="space-y-6">
            {/* ヘッダー */}
            <div className="flex justify-between items-center">
        <div>
                    <h1 className="text-2xl font-bold text-gray-900">クリエイター管理</h1>
                    <p className="text-gray-600">クリエイターの認証、管理、BAN対応を行います</p>
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
                        <Crown className="w-8 h-8 text-purple-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">総クリエイター数</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">認証済み</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
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
                        <Ban className="w-8 h-8 text-red-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">BAN済み</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.banned}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <TrendingUp className="w-8 h-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">アクティブ</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
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
                                placeholder="クリエイターを検索..."
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

                    {/* 認証状況フィルター */}
                    <div className="md:w-48">
                        <select
                            value={filterVerification}
                            onChange={(e) => setFilterVerification(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                            {verificationOptions.map(verification => (
                                <option key={verification.value} value={verification.value}>
                                    {verification.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* クリエイター一覧 */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">クリエイター一覧</h2>
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
                            {selectedCreators.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">|</span>
                                    <select
                                        onChange={(e) => handleBulkAction(e.target.value)}
                                        className="text-sm border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="">一括操作</option>
                                        <option value="verify">認証</option>
                                        <option value="reject">認証拒否</option>
                                        <option value="ban">BAN</option>
                                        <option value="activate">アクティブ化</option>
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
                                    <input
                                        type="checkbox"
                                        checked={selectedCreators.length === filteredCreators.length && filteredCreators.length > 0}
                                        onChange={selectedCreators.length === filteredCreators.length ? deselectAll : selectAll}
                                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    クリエイター
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ステータス
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    認証状況
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    投稿数
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    フォロワー
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    収益
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    評価
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    アクション
                                </th>
                    </tr>
                </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCreators.map((creator) => (
                                <tr key={creator.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedCreators.includes(creator.id)}
                                            onChange={() => toggleCreatorSelection(creator.id)}
                                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {creator.avatar ? (
                                                    <img className="h-10 w-10 rounded-full" src={creator.avatar} alt={creator.name} />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {creator.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{creator.name}</div>
                                                <div className="text-sm text-gray-500">{creator.email}</div>
                                                <div className="text-xs text-gray-400">{creator.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(creator.status)}`}>
                                            {creator.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVerificationColor(creator.verification)}`}>
                                            {creator.verification}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {creator.posts}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {creator.followers.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ¥{creator.revenue.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-900">{creator.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setShowCreatorDetail(creator)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {creator.verification === 'pending' && (
                                                <button
                                                    onClick={() => setShowVerificationModal(creator)}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setSelectedCreatorForBan(creator);
                                                    setShowBanModal(true);
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Ban className="w-4 h-4" />
                                </button>
                                        </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
            </div>

            {/* BANモーダル */}
            {showBanModal && selectedCreatorForBan && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">クリエイターをBAN</h3>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">
                                    クリエイター: <strong>{selectedCreatorForBan.name}</strong>
                                </p>
                                <p className="text-sm text-gray-600">
                                    メール: {selectedCreatorForBan.email}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    BAN理由
                                </label>
                                <textarea
                                    value={banReason}
                                    onChange={(e) => setBanReason(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    rows="3"
                                    placeholder="BAN理由を入力してください"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowBanModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={() => banCreator(selectedCreatorForBan.id, banReason)}
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

            {/* 認証モーダル */}
            {showVerificationModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">クリエイター認証</h3>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">
                                    クリエイター: <strong>{showVerificationModal.name}</strong>
                                </p>
                                <p className="text-sm text-gray-600">
                                    メール: {showVerificationModal.email}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    認証メモ
                                </label>
                                <textarea
                                    value={verificationNotes}
                                    onChange={(e) => setVerificationNotes(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    rows="3"
                                    placeholder="認証に関するメモを入力してください"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowVerificationModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={() => verifyCreator(showVerificationModal.id, verificationNotes)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    認証実行
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
}
