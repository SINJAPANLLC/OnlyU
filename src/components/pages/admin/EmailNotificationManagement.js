import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Filter,
  Search,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const EmailNotificationManagement = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [emailCampaigns, setEmailCampaigns] = useState([]);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showTemplateDetail, setShowTemplateDetail] = useState(null);
  const [showCampaignDetail, setShowCampaignDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // テンプレート作成フォーム
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'general',
    variables: []
  });

  // キャンペーン作成フォーム
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    templateId: '',
    targetAudience: 'all',
    scheduledAt: '',
    subject: '',
    content: ''
  });

  useEffect(() => {
    loadEmailTemplates();
    loadEmailCampaigns();
  }, []);

  const loadEmailTemplates = () => {
    // モックデータ
    const mockTemplates = [
      {
        id: '1',
        name: 'ウェルカムメール',
        subject: 'OnlyUへようこそ！',
        content: '{{userName}}さん、OnlyUにご登録いただきありがとうございます。',
        type: 'welcome',
        variables: ['userName', 'userEmail'],
        status: 'active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        usageCount: 1250
      },
      {
        id: '2',
        name: '支払い確認',
        subject: 'お支払いが完了しました',
        content: '{{userName}}さん、{{amount}}円のお支払いが完了しました。',
        type: 'payment',
        variables: ['userName', 'amount', 'paymentDate'],
        status: 'active',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20'),
        usageCount: 890
      },
      {
        id: '3',
        name: 'アカウント停止通知',
        subject: 'アカウントが停止されました',
        content: '{{userName}}さん、利用規約違反によりアカウントが停止されました。',
        type: 'account',
        variables: ['userName', 'reason'],
        status: 'active',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
        usageCount: 45
      }
    ];
    setEmailTemplates(mockTemplates);
  };

  const loadEmailCampaigns = () => {
    // モックデータ
    const mockCampaigns = [
      {
        id: '1',
        name: '新機能リリース告知',
        templateId: '1',
        targetAudience: 'all',
        status: 'sent',
        sentAt: new Date('2024-01-25'),
        recipients: 5000,
        opened: 3200,
        clicked: 800,
        unsubscribed: 50
      },
      {
        id: '2',
        name: 'クリエイター向けキャンペーン',
        templateId: '2',
        targetAudience: 'creators',
        status: 'scheduled',
        scheduledAt: new Date('2024-02-01'),
        recipients: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0
      },
      {
        id: '3',
        name: 'メンテナンス通知',
        templateId: '3',
        targetAudience: 'all',
        status: 'draft',
        scheduledAt: null,
        recipients: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0
      }
    ];
    setEmailCampaigns(mockCampaigns);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'welcome': return 'bg-green-100 text-green-800';
      case 'payment': return 'bg-blue-100 text-blue-800';
      case 'account': return 'bg-red-100 text-red-800';
      case 'marketing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'sent':
        return <CheckCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const createTemplate = () => {
    const newTemplate = {
      id: Date.now().toString(),
      ...templateForm,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0
    };
    setEmailTemplates(prev => [newTemplate, ...prev]);
    setTemplateForm({
      name: '',
      subject: '',
      content: '',
      type: 'general',
      variables: []
    });
    setShowCreateTemplate(false);
  };

  const createCampaign = () => {
    const newCampaign = {
      id: Date.now().toString(),
      ...campaignForm,
      status: 'draft',
      createdAt: new Date(),
      recipients: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0
    };
    setEmailCampaigns(prev => [newCampaign, ...prev]);
    setCampaignForm({
      name: '',
      templateId: '',
      targetAudience: 'all',
      scheduledAt: '',
      subject: '',
      content: ''
    });
    setShowCreateCampaign(false);
  };

  const sendCampaign = (campaignId) => {
    setEmailCampaigns(prev =>
      prev.map(campaign =>
        campaign.id === campaignId
          ? {
              ...campaign,
              status: 'sent',
              sentAt: new Date(),
              recipients: 1000,
              opened: Math.floor(Math.random() * 800) + 200,
              clicked: Math.floor(Math.random() * 200) + 50,
              unsubscribed: Math.floor(Math.random() * 20) + 5
            }
          : campaign
      )
    );
    alert('キャンペーンが送信されました！');
  };

  const deleteTemplate = (templateId) => {
    setEmailTemplates(prev => prev.filter(template => template.id !== templateId));
  };

  const deleteCampaign = (campaignId) => {
    setEmailCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
  };

  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredCampaigns = emailCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">メール通知管理</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateTemplate(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>テンプレート作成</span>
          </button>
          <button
            onClick={() => setShowCreateCampaign(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>キャンペーン作成</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総テンプレート数</p>
              <p className="text-2xl font-bold text-gray-900">{emailTemplates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Send className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">送信済みキャンペーン</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCampaigns.filter(c => c.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">予定済み</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCampaigns.filter(c => c.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総送信数</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCampaigns.reduce((sum, c) => sum + c.recipients, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="検索..."
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
              <option value="all">すべてのタイプ</option>
              <option value="welcome">ウェルカム</option>
              <option value="payment">支払い</option>
              <option value="account">アカウント</option>
              <option value="marketing">マーケティング</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">すべてのステータス</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
              <option value="draft">下書き</option>
              <option value="sent">送信済み</option>
              <option value="scheduled">予定済み</option>
            </select>
          </div>
          <div>
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>フィルター</span>
            </button>
          </div>
        </div>
      </div>

      {/* タブ */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button className="py-4 px-1 border-b-2 border-pink-500 text-pink-600 font-medium">
              テンプレート
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              キャンペーン
            </button>
          </nav>
        </div>

        {/* テンプレート一覧 */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(template.status)}`}>
                        {template.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      使用回数: {template.usageCount}回 | 
                      作成日: {template.createdAt.toLocaleDateString()} | 
                      更新日: {template.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowTemplateDetail(template)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* テンプレート作成モーダル */}
      {showCreateTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">テンプレート作成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">テンプレート名</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タイプ</label>
                <select
                  value={templateForm.type}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="general">一般</option>
                  <option value="welcome">ウェルカム</option>
                  <option value="payment">支払い</option>
                  <option value="account">アカウント</option>
                  <option value="marketing">マーケティング</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">件名</label>
                <input
                  type="text"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <textarea
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, content: e.target.value }))}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="メールの内容を入力してください。変数は {{変数名}} の形式で使用できます。"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCreateTemplate(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={createTemplate}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* テンプレート詳細モーダル */}
      {showTemplateDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">テンプレート詳細</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">テンプレート名</label>
                <p className="text-sm text-gray-600">{showTemplateDetail.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">件名</label>
                <p className="text-sm text-gray-600">{showTemplateDetail.subject}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">{showTemplateDetail.content}</pre>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">変数</label>
                <div className="flex flex-wrap gap-2">
                  {showTemplateDetail.variables.map((variable, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowTemplateDetail(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailNotificationManagement;
