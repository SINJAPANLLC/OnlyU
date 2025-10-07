import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LegalNotice = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center mr-10">
                    特定商取引法に基づく表記
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 max-w-4xl mx-auto overflow-y-auto pb-8"
            >
                <div className="text-left space-y-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-black mb-6">特定商取引法に基づく表記</h1>

                    {/* Seller */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">販売業者</h2>
                        <p className="text-black leading-relaxed">合同会社SIN JAPAN KANAGAWA</p>
                    </div>

                    {/* Name of Responsible Person */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">運営統括責任者名</h2>
                        <p className="text-black leading-relaxed">榎本翔太</p>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">所在地</h2>
                        <p className="text-black leading-relaxed">神奈川県愛甲郡愛川町中津7287</p>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">電話番号</h2>
                        <p className="text-black leading-relaxed">050-5526-9906</p>
                        <p className="text-black leading-relaxed text-sm">
                            ※ お電話での対応は行っておりません。<br />
                            お急ぎの際は問い合わせフォームからお願いいたします。
                        </p>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">連絡先メールアドレス</h2>
                        <p className="text-black leading-relaxed">
                            <a href="mailto:kanagawa@sinjapan.jp" className="text-blue-600 underline cursor-pointer">
                                kanagawa@sinjapan.jp
                            </a>
                        </p>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">ホームページ</h2>
                        <p className="text-black leading-relaxed">
                            <a href="http://only-u.jp" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline cursor-pointer">
                                http://only-u.jp
                            </a>
                        </p>
                    </div>

                    {/* Sales Price */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">販売価格</h2>
                        <p className="text-black leading-relaxed">各商品ページの価格に準じます。</p>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">お支払い方法</h2>
                        <p className="text-black leading-relaxed">クレジットカード・</p>
                    </div>

                    {/* Payment Deadline */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">お支払期限</h2>
                        <p className="text-black leading-relaxed">ご注文時にお支払い確定</p>
                    </div>

                    {/* Delivery Timing of Products */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">商品の引き渡し時期</h2>
                        <p className="text-black leading-relaxed">お支払い完了後、サービスの提供を行います。</p>
                    </div>

                    {/* Returns and Cancellations */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">返品・キャンセル</h2>
                        <p className="text-black leading-relaxed">
                            サービスの性質上、契約締結後のキャンセル、クーリングオフは一切認められず、お支払い頂いた料金については理由を問わず返還いたしません。
                        </p>
                    </div>

                    {/* Service Cancellation Conditions */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">サービスの解約条件</h2>
                        <p className="text-black leading-relaxed">
                            解約される場合は、当社サイト上の記載に従って解約手続を行う必要があります。
                        </p>
                    </div>

                    {/* Other Fees */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">その他費用</h2>
                        <div className="text-black leading-relaxed space-y-2">
                            <p>
                                当社が代理受領した料金を「主催者」が指定する振込先口座に振り込む際、振込手数料として３３０円（税込）を当社にお支払いいただきます。
                            </p>
                            <p>
                                なお、ご指定いただいた振込先口座情報の不備・誤記によって誤った振込先への振込がなされてしまった場合に、当社が任意で行う組戻し手続に際し、組戻し手数料として８８０円（税込）を当社にお支払いいただきます。
                            </p>
                        </div>
                    </div>

                    {/* Notification of Operations */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">映像送信型性風俗特殊営業届出</h2>
                        <p className="text-black leading-relaxed">神奈川県公安委員会第　号</p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default LegalNotice;
