import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RegisterCreatorPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        furiganaFamily: '',
        furiganaFirst: '',
        address: '',
        dob: '',
        contentKind: '',
        agreed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white p-4 pb-20 max-w-3xl mx-auto"
        >
            {/* Progress bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white font-bold">1</div>
                    <span className="ml-2 text-xs sm:text-sm font-semibold">
                        {t("register_creator.progress.step1")}
                    </span>
                </div>

                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white font-bold">2</div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                        {t("register_creator.progress.step2")}
                    </span>
                </div>

                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white font-bold">3</div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                        {t("register_creator.progress.step3")}
                    </span>
                </div>

                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white font-bold">4</div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                        {t("register_creator.progress.step4")}
                    </span>
                </div>
            </div>

            <h2 className="text-lg font-bold mb-4">{t("register_creator.title")}</h2>
            <p className="mb-6 text-gray-700 text-sm sm:text-base">
                {t("register_creator.subtitle")}
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder={t("register_creator.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <input
                        type="text"
                        name="furiganaFamily"
                        placeholder={t("register_creator.form.furigana_family")}
                        value={formData.furiganaFamily}
                        onChange={handleChange}
                        className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="furiganaFirst"
                        placeholder={t("register_creator.form.furigana_first")}
                        value={formData.furiganaFirst}
                        onChange={handleChange}
                        className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder={t("register_creator.form.address")}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <div className="relative">
                    <input
                        type="date"
                        name="dob"
                        placeholder={t("register_creator.form.dob")}
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <CalendarDays className="absolute right-3 top-3 text-gray-400" size={20} />
                </div>
            </div>

            {/* Content Kind Section */}
            <div className="mt-8">
                <h3 className="font-semibold mb-2">{t("register_creator.content_kind.title")}</h3>
                <div className="border border-gray-300 rounded">
                    <label className="flex items-center p-4 cursor-pointer space-x-3">
                        <input
                            type="radio"
                            name="contentKind"
                            value="generalAdult"
                            checked={formData.contentKind === "generalAdult"}
                            onChange={handleChange}
                            className="accent-pink-600"
                        />
                        <span>{t("register_creator.content_kind.general_adult")}</span>
                    </label>
                    <label className="flex items-center p-4 cursor-pointer space-x-3 border-t border-gray-300">
                        <input
                            type="radio"
                            name="contentKind"
                            value="gayBL"
                            checked={formData.contentKind === "gayBL"}
                            onChange={handleChange}
                            className="accent-pink-600"
                        />
                        <span>{t("register_creator.content_kind.gay_bl")}</span>
                    </label>
                </div>
            </div>

            {/* Notice box */}
            <div className="mt-6 p-4 bg-pink-50 border border-pink-300 rounded text-pink-700 text-xs sm:text-sm">
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="accent-pink-600"
                    />
                    <span>{t("register_creator.notice")}</span>
                </label>
            </div>
            {/* Buttons */}
            <div className="flex justify-between gap-3 mt-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)} // go back to previous page
                    className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    {t("register_creator.back")}
                </button>

                <button
                    type="button"
                    className="flex-1 py-3 px-4 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                    {t("register_creator.next")}
                </button>
            </div>
        </motion.div >
    );
};

export default RegisterCreatorPage;
