import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
                    Privacy Policy
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
                    {/* Article Header */}
                    <h2 className="text-xl font-bold text-black mb-4">Article 1 (General Provisions)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                Tokuneko Co., Ltd. (hereinafter referred to as "the Company"), which operates the web service "OnlyU" (hereinafter referred to as "the Service"), respects the privacy of users (hereinafter referred to as "Users") and exercises the utmost care in managing Users' personal information and other privacy-related information (hereinafter referred to as "Privacy Information").
                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                The Company appropriately handles personal information collected from Users in compliance with the Act on the Protection of Personal Information and other relevant laws and regulations. Additionally, the Company strives for continuous improvement in its handling of personal information by strengthening management systems, implementing SSL technology, and other measures.
                            </p>
                        </li>

                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 2 (Consent to and Withdrawal of This Policy)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                Users who provide their Privacy Information to the Company through inquiries or membership registration are deemed to have read and agreed to the contents of this Policy.
                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                Users may withdraw their consent to the use of their Privacy Information by the Company. However, in such cases, the User will not be able to continue using the Service.

                            </p>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                Consent to and withdrawal from this Policy shall be carried out using methods prescribed by the Company.

                            </p>
                        </li>
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                The Company collects information about Users' behavior and activities on the Service to improve the Service and for marketing purposes, all handled according to this Policy.

                            </p>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 3 (Privacy Information Collected)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                The Company collects or acquires the following information from Users in the course of providing the Service:
                                <br />
                                (1) Information provided by the User through forms, etc.: This includes names, inquiry-related information, email addresses, age, or date of birth.
                                <br />
                                (2) Information collected by the Company through web tracking technologies such as cookies, IP addresses, and access logs, as well as access analysis tools: This includes information about the User's device, OS, browser, and other connection environments, behavior and browsing history, preferences for purchased or viewed products, and cookie information. Note that this does not include personal information that can identify an individual User.
                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                The Company acquires Privacy Information using lawful and fair methods and does not unlawfully obtain such information against the User's will.
                            </p>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 4 (Purpose of Use of Privacy Information)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0"></span>
                            <div className="text-black leading-relaxed">
                                The Company uses Privacy Information collected from Users for the purpose of operating the Service. The main purposes of use are as follows:
                                <br />

                                (1)For billing, identity verification, and authentication
                                <br />
                                (2)For identity verification

                                <br />
                                (3)For settlement of User-submitted content
                                <br />
                                (4)For transferring sales proceeds
                                <br />

                                (5)For sending important notices, such as changes to terms and policies
                                <br />

                                (6)For improving the content and quality of the Service
                                <br />

                                (7)For conducting surveys, lotteries, and campaigns
                                <br />

                                (8)For marketing research, statistics, and analysis
                                <br />

                                (9)For system maintenance and troubleshooting
                                <br />

                                (10)For distributing advertisements and verifying their effectiveness
                                <br />

                                (11)For providing technical support and responding to User inquiries
                                <br />

                                (12)For developing and providing advertisements for the Company's or third parties' products or services targeted at specific Users
                                <br />

                                (13)For preventing fraudulent or potentially illegal activities
                                <br />

                                (14)For handling claims, disputes, and lawsuits
                            </div>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 5 (Provision of Privacy Information to Third Parties)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                The Company shall disclose or provide a User's personal information to third parties only after disclosing the recipient and the content of the information to be provided and obtaining the User's consent. However, the Company may disclose or provide personal information without the User's prior consent in the following cases:
                                <br />
                                (1)When disclosure is required by law
                                <br />
                                (2)When requested by attorneys, prosecutors, or police for necessary investigations
                                <br />

                                (3)When sharing information among the Company’s affiliates
                                <br />
                                (4)When entrusting part of the Service to third parties within the necessary scope
                                <br />
                                (5)When providing information to payment processing companies as required for the provision of the Service

                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                The Company supervises entrusted third parties appropriately and in compliance with the Act on the Protection of Personal Information when delegating the handling of personal information.

                            </p>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                The Company may provide Users' personal information to third parties in the event of a merger, business transfer, or other transfer of business related to the Service.

                            </p>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 6 (Management and Retention Period of Privacy Information)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                The Company takes necessary and appropriate safety management measures to prevent leakage, alteration, etc., of Privacy Information disclosed or provided by Users during their use of the Service, in line with current technological standards.

                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                The Company will strive to delete Privacy Information promptly when it is no longer needed for use. Similarly, upon a User's request for deletion, the Company will take corresponding actions.

                            </p>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 7 (User Inquiries and Requests)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                Users may request the disclosure, correction, addition, deletion, or suspension of use of their Privacy Information held by the Company.

                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                Such requests shall be made by methods specified by the Company and may only be made by the User themselves, their legal representative (if the User is a minor or an adult ward), or an authorized agent.

                            </p>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                Upon receiving a request, the Company will respond within a reasonable period after verifying the User's identity by methods prescribed by the Company. If the Company decides not to disclose, etc., the requested information based on legal grounds, it will notify the User accordingly.

                            </p>
                        </li>
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                Users must pay the following fees for disclosure, inquiry, addition, correction, or deletion requests:
                                <br />
                                ・Fee for disclosure, inquiry, addition, correction, and deletion: JPY 500 + postage
                                <br />
                                ・Note: Requests will generally be sent via simplified registered mail (postage: JPY 392).
                            </p>
                        </li>
                    </ol>

                    <h2 className="text-xl font-bold text-black mb-4">Article 8 (Use of Analytical Tools)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                The Company uses access analysis tools to collect information on Users' behavioral history. Some of the advertisements displayed on the Service's websites use third-party services that utilize cookies. For services provided by Google, Google's privacy policy applies. Please refer to the link below for Google's privacy policy:
                                <br />
                                <span className="text-blue-600 underline cursor-pointer">
                                    https://policies.google.com/privacy?hl=ja
                                </span>
                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                Users may refuse the collection of Privacy Information or disable behavioral targeting advertisements by changing their browser settings to disable cookies or opting out via the respective web pages for analytical tools and behavioral targeting advertising systems.
                            </p>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                Such changes are made at the User's own responsibility, and the Company is not liable for any damage resulting from changes in settings that prevent certain information from being viewed.
                            </p>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 9 (Changes to This Policy)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                The Company may revise this Policy at its discretion. If the Policy is revised, the Company will notify Users by methods deemed appropriate, except in urgent cases.

                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                Revisions to this Policy take effect when the revised Privacy Policy is posted on the Service’s website.

                            </p>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">3.</span>
                            <p className="text-black leading-relaxed">
                                Users who disagree with the revised Policy may request the deletion of their Privacy Information as provided in Article 7.
                            </p>
                        </li>
                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 10 (Jurisdiction and Governing Law)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                This Policy is governed and interpreted under Japanese law.

                            </div>
                        </li>

                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">2.</span>
                            <p className="text-black leading-relaxed">
                                Users agree in advance that any disputes related to this Policy will be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.

                            </p>
                        </li>

                    </ol>
                    <h2 className="text-xl font-bold text-black mb-4">Article 11 (Management Responsibility)</h2>

                    {/* Article Content */}
                    <ol className="space-y-4">
                        <li className="flex">
                            <span className="text-black font-medium mr-2 flex-shrink-0">1.</span>
                            <div className="text-black leading-relaxed">
                                The Company appoints the following individual as the manager responsible for personal information to ensure appropriate management and continuous improvement of measures concerning the protection of personal information. For inquiries, consultations, or requests for disclosure, please contact the following:
                                <br />
                                ・Operator: Tokuneko Co., Ltd.
                                <br />
                                ・Department: Personal Information Inquiry Desk
                                <br />
                                ・Email Address: support@onlyu.jp
                                <br />
                                ・Methods for Requests for Disclosure, etc.: Email or mail

                            </div>
                        </li>
                    </ol>
                </div>
                {/* Footer section */}
                <div className="bg-gray-50 p-4 rounded-lg mt-8">
                    <p className="text-sm text-gray-600">
                        Last updated: September 1, 2025<br />
                        For questions about this policy, contact{' '}
                        <a href="mailto:support@onlyu.jp" className="text-blue-600 hover:underline">
                            support@onlyu.jp
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
