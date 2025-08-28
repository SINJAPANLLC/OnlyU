import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.search': 'Search',
      'nav.notifications': 'Notifications',
      'nav.messages': 'Messages',
      'nav.profile': 'Profile',
      'nav.community': 'Community',
      'nav.settings': 'Settings',
      'nav.admin': 'Admin',
      'nav.creator': 'Creator',
      'settings.title': 'Settings',
      'settings.profile': 'Profile',
      'settings.privacy': 'Privacy',
      'settings.notifications': 'Notifications',
      'settings.security': 'Security',
      'settings.appearance': 'Appearance',
      'settings.language': 'Language',
      'settings.help': 'Help',
      'settings.logout': 'Logout',
      'settings.language.title': 'Language Settings',
      'settings.language.description': 'Choose your preferred language for the site',
      'settings.language.english': 'English',
      'settings.language.japanese': 'Japanese',
      'settings.language.current': 'Current Language',
      'settings.save': 'Save',
      'settings.cancel': 'Cancel',
      'common.loading': 'Loading...',
      'common.success': 'Success',
      'messages.languageChanged': 'Language changed successfully!',
      'messages.selectOption': 'Please select an option',
      'dashboard.followers': 'Followers',
      'dashboard.following': 'Following',
      'info.title': 'Information',
      'info.languageChange': 'Changing the language will immediately display the entire site in the new language.',
      'admin.dashboard.title': 'Admin Dashboard',
      'admin.dashboard.subtitle': 'Platform management and moderation',
      'admin.overview': 'Overview',
      'admin.users': 'User Management',
      'admin.posts': 'Post Management',
      'admin.reports': 'Report Management',
      'admin.totalUsers': 'Total Users',
      'admin.totalPosts': 'Total Posts',
      'admin.totalReports': 'Reports',
      'admin.bannedUsers': 'Banned Users',
      'admin.removedPosts': 'Removed Posts',
      'admin.user': 'User',
      'admin.role': 'Role',
      'admin.status': 'Status',
      'admin.joined': 'Joined',
      'admin.action': 'Action',
      'admin.ban': 'Ban',
      'admin.unban': 'Unban',
      'admin.manager': 'Manager',
      'admin.creator': 'Creator',
      'admin.fan': 'Fan',
      'admin.active': 'Active',
      'admin.banned': 'Banned',
      'creator.dashboard.title': 'Creator Dashboard',
      'creator.dashboard.subtitle': 'Content management and fan connections',
      'creator.overview': 'Overview',
      'creator.posts': 'Post Management',
      'creator.analytics': 'Analytics',
      'creator.fans': 'Fan Management',
      'creator.subscriptions': 'Subscriptions',
      'creator.settings': 'Settings',
      'creator.newPost': 'New Post',
      'creator.followers': 'Followers',
      'creator.totalViews': 'Total Views',
      'creator.totalLikes': 'Total Likes',
      'creator.totalEarnings': 'Total Earnings',
      'creator.postManagement': 'Post Management',
      'creator.postManagementDesc': 'Post management features will be displayed here',
      'creator.analyticsDesc': 'Analytics data will be displayed here',
      'creator.fanManagement': 'Fan Management',
      'creator.fanManagementDesc': 'Fan management features will be displayed here',
      'creator.subscriptionsDesc': 'Subscription management will be displayed here',
      'creator.settingsDesc': 'Settings screen will be displayed here'
    },
      ja: {
      'nav.home': 'ホーム',
      'nav.search': '検索',
      'nav.notifications': '通知',
      'nav.messages': 'メッセージ',
      'nav.profile': 'プロフィール',
      'nav.community': 'コミュニティ',
      'nav.settings': '設定',
      'nav.admin': '管理者',
      'nav.creator': 'クリエイター',
      'settings.title': '設定',
      'settings.profile': 'プロフィール',
      'settings.privacy': 'プライバシー',
      'settings.notifications': '通知設定',
      'settings.security': 'セキュリティ',
      'settings.appearance': '外観',
      'settings.language': '言語',
      'settings.help': 'ヘルプ',
      'settings.logout': 'ログアウト',
      'settings.language.title': '言語設定',
      'settings.language.description': 'サイトの表示言語を選択してください',
      'settings.language.english': 'English',
      'settings.language.japanese': '日本語',
      'settings.language.current': '現在の言語',
      'settings.save': '保存',
      'settings.cancel': 'キャンセル',
      'common.loading': '読み込み中...',
      'common.success': '成功',
      'messages.languageChanged': '言語が正常に変更されました！',
      'messages.selectOption': '設定項目を選択してください',
      'dashboard.followers': 'フォロワー',
      'dashboard.following': 'フォロー中',
      'info.title': '情報',
      'info.languageChange': '言語を変更すると、サイト全体が即座に新しい言語で表示されます。',
      'admin.dashboard.title': '管理者ダッシュボード',
      'admin.dashboard.subtitle': 'プラットフォームの管理とモデレーション',
      'admin.overview': '概要',
      'admin.users': 'ユーザー管理',
      'admin.posts': '投稿管理',
      'admin.reports': '報告管理',
      'admin.totalUsers': '総ユーザー',
      'admin.totalPosts': '総投稿',
      'admin.totalReports': '報告',
      'admin.bannedUsers': '禁止ユーザー',
      'admin.removedPosts': '削除投稿',
      'admin.user': 'ユーザー',
      'admin.role': 'ロール',
      'admin.status': 'ステータス',
      'admin.joined': '登録日',
      'admin.action': 'アクション',
      'admin.ban': '禁止',
      'admin.unban': '復活',
      'admin.manager': 'マネージャー',
      'admin.creator': 'クリエイター',
      'admin.fan': 'ファン',
      'admin.active': 'アクティブ',
      'admin.banned': '禁止',
      'creator.dashboard.title': 'クリエイターダッシュボード',
      'creator.dashboard.subtitle': 'コンテンツ管理とファンとの繋がり',
      'creator.overview': '概要',
      'creator.posts': '投稿管理',
      'creator.analytics': '分析',
      'creator.fans': 'ファン管理',
      'creator.subscriptions': 'サブスクリプション',
      'creator.settings': '設定',
      'creator.newPost': '新しい投稿',
      'creator.followers': 'フォロワー',
      'creator.totalViews': '総視聴回数',
      'creator.totalLikes': '総いいね',
      'creator.totalEarnings': '総収益',
      'creator.postManagement': '投稿管理',
      'creator.postManagementDesc': '投稿管理機能がここに表示されます',
      'creator.analyticsDesc': '分析データがここに表示されます',
      'creator.fanManagement': 'ファン管理',
      'creator.fanManagementDesc': 'ファン管理機能がここに表示されます',
      'creator.subscriptionsDesc': 'サブスクリプション管理がここに表示されます',
      'creator.settingsDesc': '設定画面がここに表示されます'
    }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('myfans_language');
    return (saved as Language) || 'ja';
  });

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      setLanguageState(lang);
      localStorage.setItem('myfans_language', lang);
      // Force a re-render by updating the state
      // The page will automatically update without reload
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    console.log('Language changed to:', language);
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
