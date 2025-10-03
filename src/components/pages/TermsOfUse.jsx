import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfUse = () => {
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
                    Terms of Use
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
                    <h1 className="text-2xl font-bold text-black">Terms of Use for OnlyU</h1>

                    <p className="text-black leading-relaxed">
                        Tokuneko Co., Ltd. (hereinafter referred to as "the Company") establishes the following terms of use (hereinafter referred to as "these Terms") regarding the use of the services provided on the websites operated by the Company. These Terms apply to all users of the services provided by the Company.
                    </p>

                    <h2 className="text-xl font-bold text-black">Chapter 1: General Provisions</h2>

                    <h3 className="font-semibold text-lg text-black">Article 1 (Definitions)</h3>

                    <p className="leading-relaxed">
                        The following terms are defined as follows in these Terms:
                    </p>

                    <ol className="list-decimal pl-6 space-y-4 text-black">
                        <li>
                            <strong>"This Site"</strong><br />
                            Refers to the websites operated by the Company under the following URL. The URL may change due to the Company's circumstances.
                            <br />
                            <a href="https://lp.OnlyU.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                https://lp.OnlyU.jp/
                            </a>
                        </li>
                        <li>
                            <strong>"Users"</strong><br />
                            Refers to individuals who use this Site.
                        </li>
                        <li>
                            <strong>"This Service"</strong><br />
                            Refers to the fan club site services provided by the Company. Details are specified in Chapter 2 of these Terms and on this Site.
                        </li>
                        <li>
                            <strong>"Members"</strong><br />
                            Refers to Users who have completed the membership registration procedures specified in Article 2 of these Terms and include both Organizers and Participants.
                        </li>
                        <li>
                            <strong>"Organizers"</strong><br />
                            Refers to individuals who have submitted a notification under the Act on Control and Improvement of Amusement Business, etc., and have completed the registration procedures as Organizers for operating a fan club site.
                        </li>
                        <li>
                            <strong>"Participants"</strong><br />
                            Refers to Members who have completed the registration procedures to use the services provided by Organizers on the fan club site.
                        </li>
                        <li>
                            <strong>"Content"</strong><br />
                            Refers to digital information such as activity updates, private videos, still images, text, and communication services provided by Organizers to Participants.
                        </li>
                        <li>
                            <strong>"Fan Club Site"</strong><br />
                            Refers to a website where Organizers can distribute various Content to Participants.
                        </li>
                        <li>
                            <strong>"Fan Club Site Usage Agreement"</strong><br />
                            Refers to the agreement formed between the Organizer and the Participant when the Participant applies for the use of a Fan Club Site and the Organizer accepts it.
                        </li>
                        <li>
                            <strong>"Fan Club Membership Fees"</strong><br />
                            Refers to the fees that Participants pay to Organizers based on the Fan Club Site Usage Agreement.
                        </li>
                        <li>
                            <strong>"This System"</strong><br />
                            Refers to the hardware and software used by the Company to operate and manage this Site and this Service.
                        </li>
                        <li>
                            <strong>"These Terms, etc."</strong><br />
                            Refers collectively to these Terms, the Privacy Policy, and other conditions set by the Company for using this Service.
                        </li>
                        <li>
                            <strong>"This Agreement"</strong><br />
                            Refers to the agreement between the Company and Users based on these Terms, etc.
                        </li>
                    </ol>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 2 (Membership Registration)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The membership registration procedures for this Service must be conducted by the User themselves. Minors (defined as persons under 18 years of age after April 1, 2022) are not allowed to use this Service.</li>
                            <li>Applicants for membership registration (hereinafter referred to as "Membership Registration Applicants") shall input and submit the required information specified by the Company on the membership registration screen of this Site. Membership is granted when the Company notifies the Applicant (via email, etc.) of its acceptance.</li>
                            <li>The Company may refuse or cancel acceptance of membership registration if the Applicant or Member falls under any of the following:</li>

                            <ul className="list-disc list-inside pl-6 space-y-2 text-black">
                                <li>False information, errors, or omissions in the information entered on this Site.</li>
                                <li>If the Applicant or Member is found not to exist.</li>
                                <li>Duplicate registration.</li>
                                <li>Previous penalties, such as suspension or disqualification of membership, under Article 21, Paragraph 1 or 2 of these Terms.</li>
                                <li>Registration by minors.</li>
                                <li>If determined to be part of or associated with antisocial forces, including organized crime groups.</li>
                                <li>Any other cases deemed inappropriate by the Company.</li>
                            </ul>

                            <li>Applicants for membership registration must select whether to register as an Organizer or Participant.</li>
                            <li>Those applying as Organizers must declare and warrant that they have submitted notifications under applicable laws regarding special businesses.</li>
                            <li>If any of the above in Paragraph 3 is found to apply after registration, the Company may cancel the registration and suspend the use of this Service.</li>
                            <li>Members must comply with these Terms, etc.</li>
                        </ol>
                    </p>


                    <h3 className="font-semibold text-lg text-black mt-6">Article 3 (Changes to Member Information)</h3>

                    <p className="leading-relaxed">
                        Members must promptly notify the Company of any changes or corrections to their registered information, such as name, address, phone number, or email address. The Company is not liable for any damages incurred by the Member or third parties due to failure or delay in providing such notice.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 4 (Succession of Membership Status)</h3>

                    <p className="leading-relaxed">
                        Membership status under this Agreement is not inheritable. However, any payment obligations for membership fees that have already arisen are subject to inheritance.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 5 (Notifications to Users)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Notifications to Users (including Members) may be made by posting on this Site. Notifications are deemed effective when the posted information becomes accessible on the Company's server.</li>
                            <li>Individual notifications to Members about this Service may be made using the contact information provided by the Member. Such notifications are deemed effective when sent by the Company, even if delays occur due to failure to update contact details under Article 3.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 6 (Changes to These Terms, etc.)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company may change these Terms, etc., without individual agreements under the following conditions:</li>
                            <ol className="list-decimal pl-6 space-y-2 text-black">
                                <li>If the changes benefit Users generally.</li>
                                <li>If the changes are reasonable, considering their necessity, appropriateness, and the circumstances.</li>
                            </ol>
                            <li>Changes to these Terms, etc., will be announced with an effective date, and the revised Terms will apply from that date.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 7 (Management of Passwords and User IDs)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Members are responsible for managing and storing their passwords and User IDs. They must not allow third-party use, transfer, or sale of this information. Regular password updates are required.</li>
                            <li>Members bear responsibility for damages arising from inadequate management or third-party misuse of passwords or User IDs.</li>
                            <li>The Company considers all actions conducted using a Member's credentials as performed by the Member.</li>
                            <li>Members must immediately notify the Company if unauthorized use or leakage of credentials is detected.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 8 (User's Responsibility for Maintaining Their Environment)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Users must prepare and maintain, at their own expense, the necessary hardware and software for connecting to and using this Service.</li>
                            <li>Users are responsible for ensuring that their equipment functions properly.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 9 (Site Monitoring and Review)</h3>

                    <p className="leading-relaxed">
                        The Company reserves the right to monitor this Site to ensure compliance with these Terms, including investigating posted data and whether legal violations are occurring.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 10 (Contents of This Service)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Organizers can establish fan club sites and provide Content to Participants.</li>
                            <li>Organizers may allow Participants to view restricted Content on their fan club sites.</li>
                            <li>Organizers can use various management functions provided by the Company for site operations.</li>
                            <li>Organizers authorize the Company to act as their agent in collecting membership fees and other payments.</li>
                        </ol>
                    </p>

                    <h1 className="font-semibold text-lg text-black mt-6"> Chapter 2: This Service</h1>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 11 (Intellectual Property Rights of Content Provided by Organizers)</h3>

                    <p className="leading-relaxed">
                        The intellectual property rights (including but not limited to copyrights) of the Content provided by Organizers on their fan club sites shall remain with the Organizers.                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 12 (Prohibited Content Provided by Organizers)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Organizers are prohibited from providing Content or services (hereinafter referred to as "Prohibited Content, etc.") that fall under the following categories on their fan club sites:</li>
                            <ol className="list-decimal pl-6 space-y-2 text-black">
                                <li>Works or items that infringe upon third-party rights (including but not limited to patent rights, utility model rights, design rights, trademark rights, copyrights, rights to reputation, portrait rights, privacy rights, and publicity rights).</li>
                                <li>Performing or singing songs for which rights have not been cleared.</li>
                                <li>Selling goods.</li>
                                <li>Works or items related to child pornography.</li>
                                <li>Content containing or evoking terms like "human trafficking," "incest," "bestiality," "sexual trade," "rape," "abuse," "slavery," "punishment," "hypnosis," etc.</li>
                                <li>Stolen goods.</li>
                                <li>Works or content that violate laws or public order and morals.</li>
                                <li>Any other content deemed inappropriate by the Company.</li>
                            </ol>
                            <li>Organizers must apply mosaic or other concealment processing for the following materials in their user-posted Content:</li>
                            <ol className="list-decimal pl-6 space-y-4 text-black">
                                <li>Genitals or genital-like areas.</li>
                                <li>The junction or insertion points of genitals or anus.</li>
                                <li>Vomit, feces, or other waste matter.</li>
                                <li>Depictions of dismemberment or excessive damage to bodies, whether living or deceased, including animals.</li>
                                <li>Other content deemed potentially offensive by the Company.</li>
                            </ol>
                            <li>If Organizers violate the above provisions, the Company may impose the following penalties:</li>
                            <ol className="list-decimal pl-6 space-y-4 text-black">
                                <li>Confiscation of sales equivalent.</li>
                                <li>Changes in the commission rate.</li>
                                <li>Exclusion from rankings.</li>
                                <li>Other measures deemed appropriate by the Company.</li>
                            </ol>
                            <li>If the Company deems the Content to potentially qualify as Prohibited Content, or receives reports from third parties, it may request documentation (e.g., notification under the Act on Control and Improvement of Amusement Business, performer agreements) to prove compliance. The Company will respond to such reports within 7 days from the date of the report. Failure to provide the required documentation by the specified deadline may result in Content removal or termination of the fan club site.</li>
                            <li>The Company shall not be liable for any damages incurred by Organizers, Participants, or third parties due to actions taken under this Article.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 13 (Fan Club Site Usage Agreement)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The agreement between an Organizer and a Participant is formed when a Participant applies for the use of a fan club site and the Organizer accepts the application.</li>
                            <li>By entering into a Fan Club Site Usage Agreement, Participants agree to pay the membership fees specified for each fan club site.</li>
                            <li>Details of the pricing structure and payment methods for each fan club site will be posted on this Site.</li>
                            <li>In the event of disputes between Participants and Organizers, the Company may take appropriate measures to ensure smooth service operation.</li>
                            <li>For further details, please refer to the information based on the Specified Commercial Transactions Act (https://onlyu.jp/trade).</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 14 (Participant Payments)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Tokuneko UK Limited is responsible for payment processing.</li>
                            <li>Organizers grant the Company the authority to collect membership fees on their behalf, and payments are considered complete when Participants pay the Company.</li>
                            <li>Participants must pay membership fees for the current month by the end of the previous month to use the relevant fan club site.</li>
                            <li>Participants must use payment services specified on this Site for membership fees.</li>
                            <li>If Participants use credit card payments, they must adhere to their agreements with credit card companies, resolving disputes with the credit card company independently.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 15 (Payments from the Company to Organizers)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company deducts fees as stipulated in Articles 15 and 17 from the collected membership fees before transferring the remaining balance to the bank account designated by the Organizer, upon their withdrawal request. The minimum request amount is JPY 10,000.</li>
                            <li>Withdrawals requested between the 1st and last day of a month will be processed on the 5th of the second following month. No interest accrues during this period.</li>
                            <li>The Company may process express withdrawals with a separate fee payable by the Organizer.</li>
                            <li>If no withdrawal request is made within 180 days of the Organizer's last service use, the Company may deem the Organizer to have waived the claim for the amount due.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 16 (Incorrect Bank Account Information)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>If payment cannot be processed due to errors in the designated bank account, the Company may treat the withdrawal request as invalid and notify the Organizer to resubmit.</li>
                            <li>If payments are erroneously transferred to a third party due to such errors, the Company may consider the payment valid and is indemnified against claims.</li>
                            <li>If the Company performs reversal procedures to recover funds, the Organizer will bear the associated fee of JPY 880.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 17 (Service Fees)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Organizers must pay a fee equal to 17.5% of the membership fees collected by the Company (including consumption tax, rounded to the nearest decimal).</li>
                            <li>A JPY 330 transfer fee (including consumption tax) will be deducted for each withdrawal request. This applies even if payment is unsuccessful due to errors in bank account information.</li>
                            <li>The Company may deduct applicable fees from payments made to Organizers.</li>
                        </ol>
                    </p>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 18 (Handling of Content Upon Organizer Cancellation)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Organizers may cancel their contract at the end of the month following their cancellation request.</li>
                            <li>Organizers must notify fan club members of their decision to cease operations before the cancellation date.</li>
                            <li>The Company may delete fan club pages, including posted Content, 180 days after cancellation, except for illegal or infringing content, which may be deleted immediately.</li>
                        </ol>
                    </p>
                    <h2 className="font-semibold text-lg text-black mt-6">Chapter 3: General Provisions</h2>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 19 (Operation and Maintenance of This Service)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company will operate and maintain this Service to ensure Users can safely use this Site and Service.</li>
                            <li>Maintenance operations may be outsourced to third parties.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 20 (Liability for Damages by Users)</h3>

                    <p className="leading-relaxed">
                        Users who breach this Agreement and cause damages to the Company are liable for compensation.
                    </p>

                    <h2 className="font-semibold text-lg text-black mt-6">Chapter 3: General Provisions (Continued)</h2>
                    <h3 className="font-semibold text-lg text-black mt-6">Article 21 (Prohibited Acts)</h3>
                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company prohibits Users (including Members) from engaging in the following acts:</li>
                            <ol className="list-decimal pl-6 space-y-4 text-black">
                                <li>Actions that infringe upon or may infringe upon third-party rights or legal interests, including but not limited to intellectual property rights (patents, copyrights, trademarks, design rights, etc.).</li>
                                <li>Reposting Content without the prior written consent of the Organizer.</li>
                                <li>Sending or uploading harmful computer programs to this system.</li>
                                <li>Violating laws or engaging in criminal acts, or actions that may lead to such violations.</li>
                                <li>Actions against public order and morals, or those that may violate such principles.</li>
                                <li>Actions that interfere with the operation of this Site or the provision of this Service, or that may cause such interference.</li>
                                <li>Actions that obstruct other Users’ ability to use this Site or this Service, or that may cause such obstruction.</li>
                                <li>Allowing third parties to use this Service in any way not explicitly allowed under these Terms, including but not limited to transfer, lending, sublicensing, or licensing.</li>
                                <li>Transferring, lending, selling, or offering as collateral any rights or obligations under this Agreement.</li>
                                <li>Allowing third parties to use passwords or User IDs associated with this Service.</li>
                                <li>Impersonating third parties.</li>
                                <li>Engaging in actions that infringe upon the intellectual property rights of this Site or Service, including but not limited to reverse engineering.</li>
                                <li>Posting or transmitting on this Site information that:</li>
                                <ul className="list-disc list-inside pl-6 space-y-2 text-black">
                                    <li>Contains excessively violent or cruel expressions.</li>
                                    <li>Aims to solicit sexual encounters, obscene acts, or prostitution.</li>
                                    <li>Includes viruses or other harmful computer programs.</li>
                                    <li>Encourages self-harm or suicide.</li>
                                    <li>Promotes illegal or inappropriate drug use.</li>
                                    <li>Links to harmful sites, such as phishing or malware distribution sites.</li>
                                    <li>Advertises products or services unrelated to this Service, or solicits for multi-level marketing schemes.</li>
                                    <li>Includes antisocial or offensive expressions.</li>
                                    <li>Distributes chain messages.</li>
                                    <li>Contains sexually stimulating or explicit content involving minors.</li>
                                </ul>
                                <li>Encouraging or facilitating any of the prohibited actions listed above.</li>
                                <li>Any other actions deemed inappropriate by the Company.</li>
                            </ol>
                            <li>Users bear full responsibility for actions violating the above provisions, and the Company accepts no liability.</li>
                            <li>If a Member engages in any prohibited acts, the Company may, without prior notice, suspend all or part of this Service and deem any benefits obtained as unjust enrichment.</li>
                        </ol>
                    </p>


                    <h3 className="font-semibold text-lg text-black mt-6">Article 22 (Handling of Personal Information)</h3>
                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Users agree that the Company may collect, use, or provide to third parties personal information and usage history under the following purposes:</li>
                            <ol className="list-decimal pl-6 space-y-4 text-black">
                                <li>To confirm Service applications.</li>
                                <li>To process membership registration.</li>
                                <li>To send emails related to this Service.</li>
                                <li>To collect membership fees and transfer them to Organizers.</li>
                                <li>To respond to inquiries from Users.</li>
                                <li>To inform Users about updates, changes to these Terms, or new services.</li>
                                <li>To analyze trends for marketing purposes.</li>
                                <li>To improve existing services or develop new ones.</li>
                                <li>To investigate and prevent illegal activities such as cyberattacks.</li>
                                <li>To confirm whether Users are associated with antisocial forces.</li>
                                <li>To comply with the Company’s Privacy Policy or Cookie Policy.</li>
                                <li>Any other purpose for which Users have given separate consent.</li>
                            </ol>
                            <li>Personal information is managed in accordance with the Privacy Policy and other Company policies.</li>
                            <li>The Company may entrust personal information to subcontractors within the scope necessary for achieving the purposes stated above.</li>
                            <li>The Company will not disclose personal information to third parties except under specific conditions, such as User consent, legal requirements, or emergencies.</li>
                        </ol>
                    </p>


                    <h3 className="font-semibold text-lg text-black mt-6">Article 23 (Suspension of Use)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>If a Member violates these Terms and fails to rectify the situation after being given reasonable notice, the Company may suspend their use of this Service or cancel their membership.</li>
                            <li>The Company may immediately suspend or cancel membership if any of the following applies:</li>
                            <ol className="list-decimal pl-6 space-y-2 text-black">
                                <li>The Member violates Article 2, Paragraph 3.</li>
                                <li>The Member becomes uncontactable.</li>
                                <li>The Member passes away.</li>
                                <li>The Member registers for purposes other than Service use.</li>
                                <li>Notifications under Article 5 fail to reach the Member.</li>
                                <li>The Member violates Articles 12 or 21.</li>
                                <li>The Member has not used this Service for 180 days.</li>

                                <li>Any other reason deemed inappropriate by the Company.</li>
                            </ol>
                            <li>The Company is not liable for damages resulting from the suspension or cancellation of membership.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 24 (Cancellation by Participants)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Participants may cancel their Fan Club Site Usage Agreement or this Agreement through specified procedures on this Site.</li>
                            <li>Upon cancellation, access to Content ceases immediately, and the Company will not refund fees already paid.</li>
                            <li>Participants are not liable for damages incurred by Organizers due to cancellation.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 25 (Confidential Information)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>Members must not disclose or leak the Company’s confidential information obtained during Service use.</li> <li>Exceptions include publicly known information, information already possessed by the Member, or independently developed information.</li>
                            <li>Members may not reproduce the Company’s confidential information without prior written consent.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 26 (Temporary Suspension of Service)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company may temporarily suspend this Service under the following conditions:</li>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Routine maintenance of this System.</li>
                                <li>Unavoidable circumstances such as natural disasters or outages.</li>
                                <li>Network failures.</li>
                                <li>System malfunctions.</li>
                                <li>Security measures.</li>
                            </ol>
                            <li>The Company will notify Users of planned suspensions, except in emergencies.</li>
                            <li>The Company is not liable for damages caused by such suspensions.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 27 (Handling Complaints)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>If third parties, including consumer protection groups, report violations, the Company will investigate and delete offending Content if necessary.</li>
                            <li>If performers claim non-consent to the use of their work, the Company may restrict access until consent is verified.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 28 (Termination of Service)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company may terminate this Site or Service after providing reasonable notice.</li>
                            <li>The Company is not liable for damages except in cases of intent or gross negligence.</li>
                        </ol>
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 29 (Intellectual Property Rights)</h3>

                    <p className="leading-relaxed">
                        All intellectual property rights related to this Site and Service belong to the Company or relevant third parties. Service use does not grant any transfer or licensing of such rights.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 30 (Disclaimer and Non-Guarantee)</h3>

                    <p className="leading-relaxed">
                        <ol className="list-decimal pl-6 space-y-4 text-black">
                            <li>The Company’s responsibilities are limited to reasonably operating this Service. No warranties are provided for suitability for specific purposes.</li>
                            <li>The Company is not liable for User mistakes during transactions or non-refunds.</li>
                            <li>The Company is not liable for damages caused by User violations of these Terms.</li>
                            <li>Users must provide necessary equipment, and the Company is not responsible for issues arising from such equipment.</li>
                            <li>The Company does not guarantee the accuracy or completeness of Content provided on fan club sites.</li>
                        </ol>
                        Recommended Operating Environment
                        <div className="overflow-x-auto py-4">
                            <table className="min-w-full table-auto border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-4 py-2 text-left font-medium text-gray-700">Devices</th>
                                        <th className="border px-4 py-2 text-left font-medium text-gray-700">Android</th>
                                        <th className="border px-4 py-2 text-left font-medium text-gray-700">iOS</th>
                                        <th className="border px-4 py-2 text-left font-medium text-gray-700">PCs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="border px-4 py-2 text-gray-700">Smartphones</td>
                                        <td className="border px-4 py-2">Google Chrome (latest version)</td>
                                        <td className="border px-4 py-2">Safari (latest version)</td>
                                        <td className="border px-4 py-2">Google Chrome (latest version)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="border px-4 py-2 text-gray-700">Smartphones</td>
                                        <td className="border px-4 py-2">WebView (latest version)</td>
                                        <td className="border px-4 py-2">Google Chrome (latest version)</td>
                                        <td className="border px-4 py-2">Google Chrome (latest version)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 31 (Liability for Damages)</h3>

                    <p className="leading-relaxed">
                        If the Company violates these Terms and causes damage to Users, the Company is only liable for direct, actual damages resulting from the violation. The Company is not liable for special, indirect, or consequential damages, including loss of profits, except in cases of intent or gross negligence.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 32 (Prohibition of Assignment of Rights and Obligations)</h3>

                    <p className="leading-relaxed">
                        Users may not transfer, assign, or offer as collateral any rights or obligations arising from this Agreement to third parties.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 33 (Governing Law)</h3>

                    <p className="leading-relaxed">
                        This Agreement is governed by the laws of Japan, including its formation, validity, performance, and interpretation.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 34 (Severability)</h3>

                    <p className="leading-relaxed">
                        If any provision of these Terms is deemed invalid or unenforceable under applicable laws, the remaining provisions will remain fully effective.
                    </p>

                    <h3 className="font-semibold text-lg text-black mt-6">Article 35 (Jurisdiction)</h3>

                    <p className="leading-relaxed">
                        If disputes arise regarding this Agreement, Users and the Company agree that the Tokyo Summary Court or the Tokyo District Court shall have exclusive jurisdiction as the court of first instance.
                    </p>

                    {/* Continue adding articles with similar styles here... */}

                    <p className="text-sm text-gray-600 mt-4">
                        Effective Date<br />
                        Enacted: Septmber 30, 2024<br />
                        Revised: October 20, 2024<br />
                        Revised: August 26, 2025<br />
                        Revised: September 26, 2025
                    </p>
                </div>
            </motion.div >
        </div >
    );
};

export default TermsOfUse;
