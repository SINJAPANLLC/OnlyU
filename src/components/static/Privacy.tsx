import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>戻る</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">個人情報の収集について</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              MyFans株式会社（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）において、ユーザーの個人情報を以下の通り収集いたします。
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">収集する個人情報の項目</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>氏名</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>住所</li>
              <li>生年月日</li>
              <li>プロフィール写真</li>
              <li>投稿内容・コメント</li>
              <li>利用履歴・アクセス情報</li>
              <li>決済情報</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">個人情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、収集した個人情報を以下の目的で利用いたします。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>本サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため</li>
              <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等の案内のため</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li>ユーザーにご自身の登録情報の閲覧・変更・削除・ご利用状況の閲覧を行っていただくため</li>
              <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
              <li>上記の利用目的に付随する目的</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">個人情報の第三者提供</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              <li>予め次の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">個人情報の開示</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">個人情報の訂正および削除</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">個人情報の利用停止等</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">お問い合わせ窓口</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                <strong>MyFans株式会社</strong><br />
                個人情報保護担当<br />
                メールアドレス: privacy@myfans.com<br />
                電話番号: 03-1234-5678
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <p className="text-gray-600 text-sm">
                最終更新日: 2024年1月1日<br />
                このプライバシーポリシーに関してご質問がございましたら、上記お問い合わせ窓口までお気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Privacy;