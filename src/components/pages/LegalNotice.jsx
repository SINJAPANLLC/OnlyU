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
                    Legal Notice
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
                    <h1 className="text-2xl font-bold text-black mb-6">Legal Notice</h1>

                    {/* Seller */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Seller</h2>
                        <div className="text-black leading-relaxed space-y-1">
                            <p>Tokuneko Co., Ltd.</p>
                            <p>Tokuneko Corp.</p>
                            <p>Tech Gate LTD</p>
                            <p>Tokuneko UK Limited (for international payment processing)</p>
                        </div>
                    </div>

                    {/* Name of Responsible Person */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Name of Responsible Person</h2>
                        <p className="text-black leading-relaxed">Taichi Yamada</p>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Address</h2>
                        <div className="text-black leading-relaxed space-y-1">
                            <p>・1-6-10 Hiroo, Shibuya-ku, Tokyo, Giraffa 11F</p>
                            <p>・21250 HAWTHORNE BLVD SUITE 500 TORRANCE, CA 90503</p>
                            <p>・25 Vitosha Blvd. Sofia, 1000, BG</p>
                            <p>・Office 6, Elmwood House Business Centre, 44–46 Elmwood Avenue, Belfast, BT9 6AZ</p>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Phone Number</h2>
                        <p className="text-black leading-relaxed">+81 50350 35710</p>
                        <p className="text-black leading-relaxed text-sm">
                            Note: Due to remote work, we do not provide support via phone. For urgent inquiries, please use the contact form.
                        </p>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Email Address</h2>
                        <p className="text-black leading-relaxed">
                            <a href="mailto:support@onlyu.jp" className="text-blue-600 underline cursor-pointer">
                                support@onlyu.jp
                            </a>
                        </p>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Website</h2>
                        <p className="text-black leading-relaxed">
                            <a href="http://onlyu.jp" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline cursor-pointer">
                                http://onlyu.jp
                            </a>
                        </p>
                    </div>

                    {/* Sales Price */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Sales Price</h2>
                        <p className="text-black leading-relaxed">Based on the price indicated on each product page.</p>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Payment Methods</h2>
                        <p className="text-black leading-relaxed">Credit card, post-payment (Paidy)</p>
                    </div>

                    {/* Payment Deadline */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Payment Deadline</h2>
                        <p className="text-black leading-relaxed">Payment is confirmed at the time of order.</p>
                    </div>

                    {/* Delivery Timing of Products */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Delivery Timing of Products</h2>
                        <p className="text-black leading-relaxed">The service will be provided upon payment confirmation.</p>
                    </div>

                    {/* Returns and Cancellations */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Returns and Cancellations</h2>
                        <p className="text-black leading-relaxed">
                            Due to the nature of the service, cancellations and cooling-off after contract conclusion are strictly prohibited. Payments made will not be refunded under any circumstances.
                        </p>
                    </div>

                    {/* Service Cancellation Conditions */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Service Cancellation Conditions</h2>
                        <p className="text-black leading-relaxed">
                            To cancel, you must follow the cancellation procedures described on our website.
                        </p>
                    </div>

                    {/* Other Fees */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Other Fees</h2>
                        <div className="text-black leading-relaxed space-y-2">
                            <p>
                                When transferring the fees received on behalf of the organizer to the designated bank account, a transfer fee of JPY 330 (tax included) must be paid to us.
                            </p>
                            <p>
                                Additionally, if an incorrect bank account was provided and a refund transfer is requested, we may, at our discretion, undertake a refund procedure. In such cases, a refund transfer fee of JPY 880 (tax included) must be paid to us.
                            </p>
                        </div>
                    </div>

                    {/* Notification of Operations */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-black">Notification of Operations Related to Transmission of Adult-Oriented Video Content</h2>
                        <p className="text-black leading-relaxed">Chiba Prefectural Public Safety Commission No. 121</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LegalNotice;
