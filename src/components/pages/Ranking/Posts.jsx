import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Crown, Heart, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RankingPosts = () => {
    const [activeTab] = useState('Post');
    const [activeTimeFilter] = useState('Daily');
    const [visibleSection, setVisibleSection] = useState('overall');
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Refs for carousel scrolling
    const adultServicesRef = useRef(null);
    const noPantiesRef = useRef(null);
    const spaSectionRef = useRef(null);
    const ntrcheatingSectionRef = useRef(null);
    const ntrcheatingRef = useRef(null);
    const spaRef = useRef(null);
    const chubbyRef = useRef(null);
    const chubbySectionRef = useRef(null);
    const buttRef = useRef(null);
    const buttSectionRef = useRef(null);

    // Refs for section visibility detection
    const overallSectionRef = useRef(null);
    const adultServicesSectionRef = useRef(null);
    const noPantiesSectionRef = useRef(null);

    const handleGenreList = () => {
        navigate('/GenreNavigationSystem');
    };
    // Overall ranking data by time period
    const overallRankingData = {
        Daily: [
            {
                id: 1,
                title: "【今だけ80%OFF】ハマり過ぎて毎日やりたくなっちゃう特別配信",
                duration: "2:00:00",
                likes: 433,
                bookmarks: 151,
                isNew: true,
                thumbnail: "https://shorturl.at/hxxv1",
                creator: "Creator Name",
                timeAgo: "2 hours ago"
            },
            {
                id: 2,
                title: "【人妻だからこそ醸す家庭主婦との配信】",
                duration: "1:59:31",
                likes: 147,
                bookmarks: 138,
                isNew: true,
                thumbnail: "https://shorturl.at/adB97",
                creator: "Creator Name",
                timeAgo: "3 hours ago"
            },
            {
                id: 3,
                title: "【くろ三百はゲーム実況・レッスン】この流れを見つけた三つの要",
                duration: "1:01:26",
                likes: 157,
                bookmarks: 133,
                isNew: true,
                thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                creator: "Creator Name",
                timeAgo: "5 hours ago"
            },
            {
                id: 4,
                title: "【女優の身体に慣れては参加できるエピソード全集】",
                duration: "2:54:02",
                likes: 157,
                bookmarks: 89,
                isNew: true,
                thumbnail: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
                creator: "Creator Name",
                timeAgo: "1 day ago"
            },
            {
                id: 5,
                title: "【未開発定期便】ゼーマ美魚中】息子マール、昇って",
                duration: "1:36:25",
                likes: 48,
                bookmarks: 36,
                isNew: true,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Creator Name",
                timeAgo: "6 hours ago"
            },
            {
                id: 6,
                title: "【限定配信】特別なコンテンツをお楽しみください",
                duration: "1:15:30",
                likes: 89,
                bookmarks: 67,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Creator Name",
                timeAgo: "8 hours ago"
            }
        ],
        Weekly: [
            {
                id: 7,
                title: "【週間ランキング1位】最高の配信をお届け",
                duration: "2:15:45",
                likes: 892,
                bookmarks: 456,
                isNew: true,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Top Creator",
                timeAgo: "2 days ago"
            },
            {
                id: 8,
                title: "【週間話題作】みんなが注目している配信",
                duration: "1:45:20",
                likes: 567,
                bookmarks: 234,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Popular Creator",
                timeAgo: "4 days ago"
            },
            {
                id: 9,
                title: "【週間3位】継続的に人気の配信",
                duration: "1:30:15",
                likes: 345,
                bookmarks: 123,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Rising Creator",
                timeAgo: "5 days ago"
            },
            {
                id: 10,
                title: "【週間4位】注目の新人配信者",
                duration: "55:30",
                likes: 234,
                bookmarks: 89,
                isNew: true,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "New Creator",
                timeAgo: "6 days ago"
            },
            {
                id: 11,
                title: "【週間5位】安定した人気を誇る配信",
                duration: "2:05:45",
                likes: 198,
                bookmarks: 78,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Veteran Creator",
                timeAgo: "1 week ago"
            },
            {
                id: 12,
                title: "【週間6位】話題性抜群のコンテンツ",
                duration: "1:20:10",
                likes: 167,
                bookmarks: 65,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Trending Creator",
                timeAgo: "1 week ago"
            }
        ],
        Monthly: [
            {
                id: 13,
                title: "【月間王者】圧倒的な支持を得た配信",
                duration: "3:00:00",
                likes: 2456,
                bookmarks: 1234,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
                creator: "Champion Creator",
                timeAgo: "2 weeks ago"
            },
            {
                id: 14,
                title: "【月間2位】安定した高評価配信",
                duration: "2:30:45",
                likes: 1567,
                bookmarks: 789,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Elite Creator",
                timeAgo: "3 weeks ago"
            },
            {
                id: 15,
                title: "【月間3位】話題沸騰の人気配信",
                duration: "2:00:30",
                likes: 1234,
                bookmarks: 567,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Popular Creator",
                timeAgo: "1 month ago"
            },
            {
                id: 16,
                title: "【月間4位】継続的な人気を誇る配信",
                duration: "1:45:15",
                likes: 987,
                bookmarks: 456,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Consistent Creator",
                timeAgo: "3 weeks ago"
            },
            {
                id: 17,
                title: "【月間5位】注目度急上昇中の配信",
                duration: "1:30:00",
                likes: 765,
                bookmarks: 345,
                isNew: true,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Rising Star",
                timeAgo: "2 weeks ago"
            },
            {
                id: 18,
                title: "【月間6位】クオリティの高い配信",
                duration: "2:15:30",
                likes: 654,
                bookmarks: 298,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Quality Creator",
                timeAgo: "1 month ago"
            }
        ],
        "All time": [
            {
                id: 19,
                title: "【殿堂入り】史上最高の配信コンテンツ",
                duration: "4:00:00",
                likes: 15678,
                bookmarks: 8901,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                creator: "Legend Creator",
                timeAgo: "6 months ago"
            },
            {
                id: 20,
                title: "【永久保存版】絶対に見るべき名作配信",
                duration: "3:30:45",
                likes: 12345,
                bookmarks: 6789,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Master Creator",
                timeAgo: "8 months ago"
            },
            {
                id: 21,
                title: "【歴史的名作】語り継がれる伝説の配信",
                duration: "2:45:20",
                likes: 9876,
                bookmarks: 5432,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                creator: "Legendary Creator",
                timeAgo: "1 year ago"
            },
            {
                id: 22,
                title: "【名作選】時代を超えて愛される配信",
                duration: "3:15:10",
                likes: 7890,
                bookmarks: 4321,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
                creator: "Classic Creator",
                timeAgo: "10 months ago"
            },
            {
                id: 23,
                title: "【不朽の名作】永遠に残る傑作配信",
                duration: "2:20:35",
                likes: 6543,
                bookmarks: 3210,
                isNew: false,
                thumbnail: "https://via.placeholder.com/300x200/ff1493/ffffff?text=Alltime+5",
                creator: "Timeless Creator",
                timeAgo: "1 year ago"
            },
            {
                id: 24,
                title: "【殿堂級】圧倒的クオリティの配信",
                duration: "2:50:45",
                likes: 5678,
                bookmarks: 2890,
                isNew: false,
                thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
                creator: "Hall of Fame Creator",
                timeAgo: "8 months ago"
            }
        ]
    };

    const adultServicesData = [
        {
            id: 1,
            title: "【デリ嬢配信】ゼーマ美魚中】息子マール昇って",
            duration: "1:36:25",
            likes: 48,
            bookmarks: 36,
            isNew: true,
            thumbnail: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
            creator: "Creator Name",
            timeAgo: "1 day ago"
        },
        {
            id: 2,
            title: "【書記の身体マッション】配信配信テーマしない",
            duration: "33:20",
            likes: 5,
            bookmarks: 3,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/ff6347/ffffff?text=Adult+2",
            creator: "Creator Name",
            timeAgo: "10 hours ago"
        },
        {
            id: 3,
            title: "【美緑色の身体】",
            duration: "45:12",
            likes: 2,
            bookmarks: 1,
            isNew: true,
            thumbnail: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
            creator: "Creator Name",
            timeAgo: "1 day ago"
        },
        {
            id: 4,
            title: "【美緑色の身体】",
            duration: "45:12",
            likes: 2,
            bookmarks: 1,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/20b2aa/ffffff?text=Adult+3",
            creator: "Creator Name",
            timeAgo: "1 day ago"
        },
        {
            id: 5,
            title: "【美緑色の身体】",
            duration: "45:12",
            likes: 2,
            bookmarks: 1,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/20b2aa/ffffff?text=Adult+3",
            creator: "Creator Name",
            timeAgo: "1 day ago"
        },
        {
            id: 6,
            title: "【美緑色の身体】",
            duration: "45:12",
            likes: 2,
            bookmarks: 1,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/20b2aa/ffffff?text=Adult+3",
            creator: "Creator Name",
            timeAgo: "1 day ago"
        }
    ];

    const noPantiesData = [
        {
            id: 1,
            title: "9/1まで500円OFF!!【不倫奥さん】嫌山さ◯か似",
            duration: "1:26:22",
            likes: 2,
            bookmarks: 3,
            isNew: true,
            thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
            creator: "Creator Name",
            timeAgo: "15 hours ago"
        },
        {
            id: 2,
            title: "【スカートめくり】スカートの奥について",
            duration: "00:45",
            likes: 4,
            bookmarks: 0,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/9370db/ffffff?text=NoP+2",
            creator: "Creator Name",
            timeAgo: "8 hours ago"
        },
        {
            id: 3,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 4,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 5,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 6,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 7,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        }
    ];
    const ntrcheating = [
        {
            id: 1,
            title: "9/1まで500円OFF!!【不倫奥さん】嫌山さ◯か似",
            duration: "1:26:22",
            likes: 2,
            bookmarks: 3,
            isNew: true,
            thumbnail: "https://images.unsplash.com/photo-1558980664-10d5c717eda5",
            creator: "Creator Name",
            timeAgo: "15 hours ago"
        },
        {
            id: 2,
            title: "【スカートめくり】スカートの奥について",
            duration: "00:45",
            likes: 4,
            bookmarks: 0,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/9370db/ffffff?text=NoP+2",
            creator: "Creator Name",
            timeAgo: "8 hours ago"
        },
        {
            id: 3,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://images.unsplash.com/photo-1558980664-10d5c717eda5",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 4,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 5,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 6,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 7,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        }
    ];
    const spa = [
        {
            id: 1,
            title: "9/1まで500円OFF!!【不倫奥さん】嫌山さ◯か似",
            duration: "1:26:22",
            likes: 2,
            bookmarks: 3,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/ff8c00/ffffff?text=NoP+1",
            creator: "Creator Name",
            timeAgo: "15 hours ago"
        },
        {
            id: 2,
            title: "【スカートめくり】スカートの奥について",
            duration: "00:45",
            likes: 4,
            bookmarks: 0,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/9370db/ffffff?text=NoP+2",
            creator: "Creator Name",
            timeAgo: "8 hours ago"
        },
        {
            id: 3,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 4,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 5,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 6,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 7,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        }
    ];
    const chubby = [
        {
            id: 1,
            title: "9/1まで500円OFF!!【不倫奥さん】嫌山さ◯か似",
            duration: "1:26:22",
            likes: 2,
            bookmarks: 3,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/ff8c00/ffffff?text=NoP+1",
            creator: "Creator Name",
            timeAgo: "15 hours ago"
        },
        {
            id: 2,
            title: "【スカートめくり】スカートの奥について",
            duration: "00:45",
            likes: 4,
            bookmarks: 0,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/9370db/ffffff?text=NoP+2",
            creator: "Creator Name",
            timeAgo: "8 hours ago"
        },
        {
            id: 3,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 4,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 5,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 6,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 7,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        }
    ];
    const ButtRanking = [
        {
            id: 1,
            title: "9/1まで500円OFF!!【不倫奥さん】嫌山さ◯か似",
            duration: "1:26:22",
            likes: 2,
            bookmarks: 3,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/ff8c00/ffffff?text=NoP+1",
            creator: "Creator Name",
            timeAgo: "15 hours ago"
        },
        {
            id: 2,
            title: "【スカートめくり】スカートの奥について",
            duration: "00:45",
            likes: 4,
            bookmarks: 0,
            isNew: true,
            thumbnail: "https://via.placeholder.com/200x150/9370db/ffffff?text=NoP+2",
            creator: "Creator Name",
            timeAgo: "8 hours ago"
        },
        {
            id: 3,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 4,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 5,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 6,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        },
        {
            id: 7,
            title: "【学生】見えち奥美と女子",
            duration: "12:34",
            likes: 585,
            bookmarks: 234,
            isNew: false,
            thumbnail: "https://via.placeholder.com/200x150/3cb371/ffffff?text=NoP+3",
            creator: "Creator Name",
            timeAgo: "3 months ago"
        }
    ];

    // Intersection Observer to detect visible sections
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === overallSectionRef.current) {
                            setVisibleSection('overall');
                        } else if (entry.target === adultServicesSectionRef.current) {
                            setVisibleSection('adult');
                        } else if (entry.target === noPantiesSectionRef.current) {
                            setVisibleSection('nopanties');
                        }
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-88px 0px -50% 0px'
            }
        );

        if (overallSectionRef.current) observer.observe(overallSectionRef.current);
        if (adultServicesSectionRef.current) observer.observe(adultServicesSectionRef.current);
        if (noPantiesSectionRef.current) observer.observe(noPantiesSectionRef.current);

        return () => observer.disconnect();
    }, []);

    const scrollCarousel = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 300;
            ref.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Content card for carousel sections
    const ContentCard = ({ item, showRanking = false, rank }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 w-48 sm:w-56 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 relative"
        >
            <div className="relative">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-28 sm:h-32 object-cover"
                />
                {item.isNew && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-pink-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-semibold">
                        {t('postPage.new')}
                    </div>
                )}
                {showRanking && (
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black bg-opacity-70 text-white text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                        #{rank}
                    </div>
                )}
                <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                    {item.duration}
                </div>
            </div>

            <div className="p-2 sm:p-3">
                <div className="flex items-center mb-1 sm:mb-2">
                    {showRanking && (
                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                    )}
                    <img
                        src="https://via.placeholder.com/24x24/cccccc/ffffff?text=U"
                        alt="Creator"
                        className="w-4 h-4 sm:w-6 sm:h-6 rounded-full mr-1 sm:mr-2"
                    />
                    <span className="text-xs text-gray-600 truncate">{item.creator}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2 leading-tight">
                    {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-1 sm:mb-2">
                    <span className="truncate">{item.timeAgo}</span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Bookmark className="w-3 h-3" />
                        <span>{item.bookmarks}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // Grid card for overall ranking
    const GridCard = ({ item, rank }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 relative cursor-pointer"
        >
            <div className="relative">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-32 sm:h-40 object-cover"
                />
                {item.isNew && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-pink-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-semibold">
                        {t('postPage.new')}
                    </div>
                )}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black bg-opacity-70 text-white text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                    #{rank}
                </div>
                <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                    {item.duration}
                </div>
            </div>

            <div className="p-2 sm:p-3">
                <div className="flex items-center mb-1 sm:mb-2">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                    <img
                        src="https://via.placeholder.com/24x24/cccccc/ffffff?text=U"
                        alt="Creator"
                        className="w-4 h-4 sm:w-6 sm:h-6 rounded-full mr-1 sm:mr-2"
                    />
                    <span className="text-xs text-gray-600 truncate">{item.creator}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2 leading-tight">
                    {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-1 sm:mb-2">
                    <span className="truncate">{item.timeAgo}</span>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Bookmark className="w-3 h-3" />
                        <span>{item.bookmarks}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const CarouselSection = ({ title, data, carouselRef, showRanking = false, sectionRef }) => (
        <div ref={sectionRef} className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h2>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-pink-500 text-xs sm:text-sm font-medium hover:text-pink-600"
                >
                    {t('postPage.viewmore')}
                </motion.button>
            </div>

            <div className="relative">
                <button
                    onClick={() => scrollCarousel(carouselRef, 'left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1.5 sm:p-2 hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>

                <div
                    ref={carouselRef}
                    className="flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide px-6 sm:px-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {data.map((item, index) => (
                        <ContentCard
                            key={item.id}
                            item={item}
                            showRanking={showRanking}
                            rank={index + 1}
                        />
                    ))}
                </div>

                <button
                    onClick={() => scrollCarousel(carouselRef, 'right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1.5 sm:p-2 hover:bg-gray-50 transition-colors"
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
            </div>
        </div>
    );

    // Get the section title for sticky header
    const getSectionTitle = () => {
        switch (visibleSection) {
            case 'overall':
                return 'Overall Ranking';
            case 'adult':
                return 'Adult Services Ranking';
            case 'nopanties':
                return 'No Panties Ranking';
            case 'ntrcheating':
                return 'NTR/Cheating Ranking';
            case 'spa':
                return 'Spa Ranking';
            case 'chubby':
                return 'Chubby Ranking';
            case 'butt':
                return 'Butt Ranking';

            default:
                return 'Overall Ranking';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-15">
            {/* Section-specific sticky header */}

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-b border-gray-200 sticky top-[88px] z-30 shadow-sm"
            >
                <div className="w-full max-w-6xl mx-auto flex items-center justify-between h-10 px-2 sm:px-4">
                    <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                        <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                            {getSectionTitle()}
                        </h2>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="text-pink-500 text-xs sm:text-sm font-medium hover:text-pink-600"
                    >
                        {t('postPage.viewmore')}
                    </motion.button>
                </div>
            </motion.div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
                {activeTab === 'Post' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Overall Ranking Section - Grid Layout */}
                        <div ref={overallSectionRef} className="mb-6 sm:mb-8">
                            <motion.div
                                key={activeTimeFilter}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-2 gap-2 sm:gap-4"
                            >
                                {overallRankingData[activeTimeFilter]?.map((item, index) => (
                                    <GridCard
                                        key={`${activeTimeFilter}-${item.id}`}
                                        item={item}
                                        rank={index + 1}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Adult Services Ranking Section */}
                        <CarouselSection
                            title="Adult Services Ranking"
                            data={adultServicesData}
                            carouselRef={adultServicesRef}
                            showRanking={true}
                            sectionRef={adultServicesSectionRef}
                        />

                        {/* No Panties Ranking Section */}
                        <CarouselSection
                            title="No Panties Ranking"
                            data={noPantiesData}
                            carouselRef={noPantiesRef}
                            showRanking={true}
                            sectionRef={noPantiesSectionRef}
                        />
                        {/* NTR/Cheating Ranking Section */}
                        <CarouselSection
                            title="NTR/Cheating Ranking"
                            data={ntrcheating}
                            carouselRef={ntrcheatingRef}
                            showRanking={true}
                            sectionRef={ntrcheatingSectionRef}
                        />
                        {/* Spa Ranking Section */}
                        <CarouselSection
                            title="Spa Ranking"
                            data={spa}
                            carouselRef={spaRef}
                            showRanking={true}
                            sectionRef={spaSectionRef}
                        />
                        {/* Chubby Ranking Section */}
                        <CarouselSection
                            title="Chubby Ranking"
                            data={chubby}
                            carouselRef={chubbyRef}
                            showRanking={true}
                            sectionRef={chubbySectionRef}
                        />
                        {/* Butt Ranking Section */}
                        <CarouselSection
                            title="Butt Ranking"
                            data={ButtRanking}
                            carouselRef={buttRef}
                            showRanking={true}
                            sectionRef={buttSectionRef}
                        />


                        {/* All Genres Button */}
                        <div className="text-center mt-6 sm:mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGenreList}
                                className="bg-pink-500 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-pink-600 transition-colors"
                            >
                                {t('postPage.allgenres')}
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Creator' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-20"
                    >
                        <div className="text-gray-500 text-lg">
                            {t('postPage.creatorcomingsoon')}
                        </div>
                    </motion.div>
                )}
            </div>

            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default RankingPosts;