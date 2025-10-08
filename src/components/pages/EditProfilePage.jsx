import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Camera,
    Upload,
    Save,
    X,
    User,
    Mail,
    Globe,
    Calendar,
    MapPin,
    Edit3,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff,
    Lock,
    Shield
} from 'lucide-react';
import BottomNavigationWithCreator from '../BottomNavigationWithCreator';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);
    
    const [formData, setFormData] = useState({
        name: 'ミルク',
        emoji: '🍼',
        username: 'milk_av',
        bio: 'Twitter: @milk_av\n\n会った女の子たちと\nOOOOOOO\nOOOOOOOOO',
        email: 'milk@example.com',
        website: 'https://twitter.com/milk_av',
        birthday: '1995-03-15',
        location: '東京, 日本',
        isPrivate: false,
        allowMessages: true,
        showOnlineStatus: true,
        allowTagging: true
    });

    const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face');
    const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=200&fit=crop');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // エラーをクリア
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = '名前は必須です';
        }
        
        if (!formData.username.trim()) {
            newErrors.username = 'ユーザー名は必須です';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'ユーザー名は英数字とアンダースコアのみ使用できます';
        }
        
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }
        
        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
            newErrors.website = '有効なURLを入力してください（http://またはhttps://で始まる）';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // 実際のアプリではAPIを呼び出し
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/profile/milk_av');
            }, 2000);
        } catch (error) {
            console.error('プロフィール保存に失敗しました:', error);
            alert('プロフィールの保存に失敗しました。しばらくしてからお試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('変更を保存せずに終了しますか？')) {
            navigate(-1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                <button onClick={handleCancel} className="p-1">
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">プロフィールを編集</h1>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 disabled:bg-gray-300 transition-colors"
                >
                    {isLoading ? '保存中...' : '保存'}
                </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 m-4">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <p className="text-green-700">プロフィールが正常に保存されました！</p>
                    </div>
                </div>
            )}

            <div className="p-4 space-y-6">
                {/* Profile Images */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">プロフィール画像</h2>
                    
                    {/* Avatar */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative">
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -bottom-1 -right-1 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
                            >
                                <Camera size={16} />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">プロフィール画像</h3>
                            <p className="text-sm text-gray-500">推奨サイズ: 400x400px</p>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900">カバー画像</h3>
                        <div className="relative">
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => coverInputRef.current?.click()}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                            >
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                    <Upload size={20} className="text-white" />
                                </div>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">推奨サイズ: 1200x400px</p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                    />
                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                    />
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        基本情報
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                名前 *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="名前を入力"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                絵文字・アイコン
                            </label>
                            <input
                                type="text"
                                name="emoji"
                                value={formData.emoji}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="🍼"
                                maxLength={5}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ユーザー名 *
                            </label>
                            <div className="flex items-center">
                                <span className="text-gray-500 mr-2">@</span>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                        errors.username ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="ユーザー名を入力"
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                自己紹介
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                                placeholder="自己紹介を入力..."
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.bio.length}/500文字
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        連絡先情報
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="メールアドレスを入力"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ウェブサイト
                            </label>
                            <div className="flex items-center">
                                <Globe className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                        errors.website ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="https://example.com"
                                />
                            </div>
                            {errors.website && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.website}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                生年月日
                            </label>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                場所
                            </label>
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="場所を入力"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        プライバシー設定
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">プライベートアカウント</h3>
                                <p className="text-sm text-gray-500">フォロワーを承認制にする</p>
                            </div>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formData.isPrivate ? 'bg-pink-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        formData.isPrivate ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">メッセージ受信</h3>
                                <p className="text-sm text-gray-500">他のユーザーからのメッセージを許可</p>
                            </div>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, allowMessages: !prev.allowMessages }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formData.allowMessages ? 'bg-pink-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        formData.allowMessages ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">オンライン状態表示</h3>
                                <p className="text-sm text-gray-500">オンライン状態を他のユーザーに表示</p>
                            </div>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formData.showOnlineStatus ? 'bg-pink-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        formData.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">タグ付け許可</h3>
                                <p className="text-sm text-gray-500">他のユーザーによるタグ付けを許可</p>
                            </div>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, allowTagging: !prev.allowTagging }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formData.allowTagging ? 'bg-pink-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        formData.allowTagging ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNavigationWithCreator active="account" />
        </div>
    );
};

export default EditProfilePage;
