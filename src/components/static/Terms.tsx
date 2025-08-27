import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第1条（適用）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              この利用規約（以下、「本規約」といいます。）は、MyFans株式会社（以下、「当社」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第2条（利用登録）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              本サービスにおいて、登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、当社が利用登録を相当でないと判断した場合</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第3条（ユーザーIDおよびパスワードの管理）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第4条（利用料金および支払方法）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーは、本サービスの有料部分の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、当社が指定する方法により支払うものとします。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14.6％の割合による遅延損害金を支払うものとします。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第5条（禁止事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当社、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>当社のサービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>当社が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
              <li>面識のない異性との出会いを目的とした行為</li>
              <li>当社、本サービスの他のユーザー、または第三者に不利益、損害、不快感を与える行為</li>
              <li>その他当社が不適切と判断する行為</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第6条（本サービスの提供の停止等）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第7条（著作権）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、本サービスを利用し、投稿ないしアップロードすることができるものとします。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">第8条（利用制限および登録抹消）</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <p className="text-gray-600 text-sm">
                最終更新日: 2024年1月1日<br />
                この利用規約に関してご質問がございましたら、お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Terms;