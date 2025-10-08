export const featuredCreators = [
    {
        id: 1,
        name: 'Mika',
        image: '/api/placeholder/300/400',
        label: 'Currently attracting the most attention',
        badge: 'TOP 5',
        ranking: 'Updated on 8/16'
    },
    {
        id: 2,
        name: 'Yuki',
        image: '/api/placeholder/300/400',
        label: 'Super popular!',
        badge: 'TOP 5',
        ranking: 'Updated on 8/16'
    },
    {
        id: 3,
        name: 'Saki',
        image: '/api/placeholder/300/400',
        label: 'NEW',
        badge: 'Play',
        ranking: 'Updated on 8/16'
    }
];

export const notifications = [
    {
        id: 1,
        title: 'paymentRedirect',
        type: 'info'
    },
    {
        id: 2,
        title: 'termsUpdate',
        type: 'update'
    }
];

export const genreData = [
    { id: 1, nameKey: "amateur", count: 410177, color: "from-pink-500 to-purple-600" },
    { id: 2, nameKey: "personalFilming", count: 147577, color: "from-purple-500 to-indigo-600" },
    { id: 3, nameKey: "marriedWoman", count: 104474, color: "from-red-500 to-pink-600" },
    { id: 4, nameKey: "largeBreasts", count: 96852, color: "from-orange-500 to-red-600" },
    { id: 5, nameKey: "pervert", count: 83925, color: "from-green-500 to-teal-600" },
    { id: 6, nameKey: "homeVideo", count: 72199, color: "from-blue-500 to-purple-600" },
    { id: 7, nameKey: "beautifulWoman", count: 65989, color: "from-pink-500 to-red-600" },
    { id: 8, nameKey: "beautifulBreasts", count: 60114, color: "from-purple-500 to-pink-600" }
];

// ジャンル別動画数を取得する関数（実際のAPIから取得する場合はここを修正）
export const getGenreVideoCount = async (genreNameKey) => {
    // 実際の実装では、APIから動画数を取得
    // 現在はローカルストレージまたはサンプルデータを使用
    try {
        const storedCounts = localStorage.getItem('genreVideoCounts');
        if (storedCounts) {
            const counts = JSON.parse(storedCounts);
            return counts[genreNameKey] || 0;
        }
    } catch (error) {
        console.error('Error getting genre video count:', error);
    }
    
    // デフォルト値としてconstants.jsの値を返す
    const genre = genreData.find(g => g.nameKey === genreNameKey);
    return genre ? genre.count : 0;
};

// ジャンル別動画数を更新する関数
export const updateGenreVideoCount = (genreNameKey, count) => {
    try {
        const storedCounts = localStorage.getItem('genreVideoCounts') || '{}';
        const counts = JSON.parse(storedCounts);
        counts[genreNameKey] = count;
        localStorage.setItem('genreVideoCounts', JSON.stringify(counts));
    } catch (error) {
        console.error('Error updating genre video count:', error);
    }
};


export const navItems = [
    { icon: 'Home', label: 'Home', id: 'home' },
    { icon: 'Star', label: 'Favorites', id: 'favorites' },
    { icon: 'Crown', label: 'Ranking', id: 'ranking' },
    { icon: 'MessageCircle', label: 'Messages', id: 'messages' },
    { icon: 'User', label: 'Account', id: 'account' }
];