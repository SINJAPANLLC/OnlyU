import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Edit3,
  Save,
  X,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // 個人情報の状態
  const [personalInfo, setPersonalInfo] = useState({
    name: '田中 太郎',
    nameKana: 'タナカ タロウ',
    birthDate: '1990-05-15',
    gender: 'male',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    address: {
      postalCode: '100-0001',
      prefecture: '東京都',
      city: '千代田区',
      address1: '千代田1-1-1',
      address2: 'マンション101'
    },
    emergencyContact: {
      name: '田中 花子',
      relationship: '配偶者',
      phone: '090-9876-5432'
    }
  });

  const [formData, setFormData] = useState(personalInfo);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    setPersonalInfo(formData);
    setIsEditing(false);
    console.log('Personal info saved:', formData);
    alert('個人情報を保存しました');
  };

  const handleCancel = () => {
    setFormData(personalInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-pink-600 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center flex-1">
          <User className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-lg font-semibold text-gray-900">個人情報</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-pink-600"
        >
          {isEditing ? <X size={24} /> : <Edit3 size={24} />}
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* 基本情報 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            基本情報
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">フリガナ</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nameKana}
                  onChange={(e) => handleInputChange('nameKana', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.nameKana}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">生年月日</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {personalInfo.birthDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">性別</label>
              {isEditing ? (
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                  <option value="prefer_not_to_say">回答しない</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  {personalInfo.gender === 'male' ? '男性' : 
                   personalInfo.gender === 'female' ? '女性' : 
                   personalInfo.gender === 'other' ? 'その他' : '回答しない'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 連絡先情報 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            連絡先情報
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {personalInfo.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {personalInfo.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 住所情報 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            住所情報
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">郵便番号</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address.postalCode}
                  onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.address.postalCode}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">都道府県</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address.prefecture}
                    onChange={(e) => handleInputChange('address.prefecture', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.address.prefecture}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">市区町村</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.address.city}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">住所1</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address.address1}
                  onChange={(e) => handleInputChange('address.address1', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.address.address1}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">住所2（建物名・部屋番号）</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address.address2}
                  onChange={(e) => handleInputChange('address.address2', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.address.address2}</p>
              )}
            </div>
          </div>
        </div>

        {/* 緊急連絡先 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            緊急連絡先
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.emergencyContact.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">続柄</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{personalInfo.emergencyContact.relationship}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {personalInfo.emergencyContact.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 編集ボタン */}
        {isEditing && (
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>保存</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>キャンセル</span>
            </button>
          </div>
        )}

        {/* プライバシー情報 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">プライバシーについて</h4>
              <p className="text-sm text-blue-700">
                個人情報は適切に管理され、第三者に提供されることはありません。
                詳細についてはプライバシーポリシーをご確認ください。
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PersonalInfoPage;