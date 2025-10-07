import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import BottomNavigation from '../BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { uploadToCloudinary } from '../../config/cloudinary';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CreatePostPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const fileInputRef = useRef(null);

    // Form state
    const [explanation, setExplanation] = useState('');
    const [genres, setGenres] = useState(['', '', '']);
    const [tags, setTags] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('');
    const [filesUploaded, setFilesUploaded] = useState(0);

    // Toggle states
    const [schedulePost, setSchedulePost] = useState(false);
    const [publicationPeriod, setPublicationPeriod] = useState(false);
    const [addPlan, setAddPlan] = useState(false);
    const [singlePostSales, setSinglePostSales] = useState(false);
    const [agreements, setAgreements] = useState({
        copyright: false,
        minors: false,
        censored: false,
        guidelines: false,
    });

    const toggleAgreement = (key) => {
        setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleGenreChange = (index, value) => {
        const newGenres = [...genres];
        newGenres[index] = value;
        setGenres(newGenres);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const uploadFilesToCloudinary = async (files, postId) => {
        console.log(t('createPost.messages.startingUpload') + `: ${files.length}個のファイル、投稿ID: ${postId}`);
        setCurrentStep(`${files.length}個のファイルを${t('createPost.messages.uploadingToCloudinary')}`);
        setFilesUploaded(0);

        const uploadedResults = [];

        for (let index = 0; index < files.length; index++) {
            const file = files[index];

            try {
                setCurrentStep(`${file.name}を${t('createPost.messages.uploadingToCloudinary')} (${index + 1}/${files.length})`);
                console.log(`${t('createPost.messages.uploadingFile')} ${index + 1}/${files.length}: ${file.name}`);

                // Upload to Cloudinary
                const uploadResult = await uploadToCloudinary(file);

                if (!uploadResult.success) {
                    throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
                }

                console.log(`ファイル ${index + 1} ${t('createPost.messages.fileUploadedSuccess')}`);
                console.log('Cloudinary URL:', uploadResult.url);

                uploadedResults.push({
                    fileName: file.name,
                    url: uploadResult.url,
                    publicId: uploadResult.publicId,
                    format: uploadResult.format,
                    width: uploadResult.width,
                    height: uploadResult.height,
                    bytes: uploadResult.bytes,
                    type: file.type,
                    size: file.size,
                    source: 'cloudinary', // Mark as Cloudinary upload
                    resourceType: uploadResult.resourceType, // Will be 'video' for videos
                    // For videos, Cloudinary provides additional metadata
                    duration: uploadResult.duration || null, // Video duration in seconds
                    fps: uploadResult.fps || null, // Frames per second for videos
                    // Generate thumbnail URL for videos
                    thumbnailUrl: file.type.startsWith('video/')
                        ? uploadResult.url.replace('/upload/', '/upload/so_auto,w_300,h_300,c_fill,q_auto,f_jpg/')
                        : null
                });

                // Update progress
                setFilesUploaded(index + 1);
                const progress = ((index + 1) / files.length) * 100;
                setUploadProgress(progress);

            } catch (error) {
                console.error(`Error uploading file ${index + 1} (${file.name}) to Cloudinary:`, error);
                throw new Error(`Failed to upload ${file.name} to Cloudinary: ${error.message}`);
            }
        }

        console.log(t('createPost.messages.allFilesUploaded'));
        setCurrentStep(t('createPost.messages.allFilesUploaded'));
        return uploadedResults;
    };

    const handleSubmit = async () => {
        console.log(t('createPost.messages.startingPostCreation'));

        if (!currentUser) {
            alert(t('createPost.messages.pleaseLogin'));
            navigate('/login');
            return;
        }

        // Check if user is properly authenticated
        console.log('Current user:', {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            isAnonymous: currentUser.isAnonymous
        });

        if (currentUser.isAnonymous) {
            alert(t('createPost.messages.anonymousCannotPost'));
            navigate('/login');
            return;
        }

        if (!explanation.trim()) {
            alert(t('createPost.messages.enterDescription'));
            return;
        }

        const selectedGenres = genres.filter(genre => genre !== '');
        if (selectedGenres.length === 0) {
            alert(t('createPost.messages.selectGenre'));
            return;
        }

        if (!agreements.copyright || !agreements.minors || !agreements.censored || !agreements.guidelines) {
            alert(t('createPost.messages.confirmAgreements'));
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);
        setCurrentStep(t('createPost.messages.creatingBasicPost'));
        setFilesUploaded(0);

        try {
            console.log(t('createPost.messages.creatingBasicPost'));
            setCurrentStep('投稿詳細を保存中...');

            // Create basic post data first (without files)
            const basicPostData = {
                userId: currentUser.uid,
                userName: currentUser.displayName || 'Anonymous',
                userEmail: currentUser.email,
                userAvatar: currentUser.photoURL || null,
                explanation: explanation.trim(),
                genres: selectedGenres,
                tags: tags.trim(),
                schedulePost,
                publicationPeriod,
                addPlan,
                singlePostSales,
                agreements,
                fileCount: uploadedFiles.length,
                files: [],
                imageStorage: 'cloudinary', // Mark that images are stored in Cloudinary
                dataStorage: 'firebase', // Mark that post data is in Firebase
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                likes: 0,
                comments: 0,
                status: 'published'
            };

            console.log('Post data to save:', basicPostData);

            // Save basic post to Firestore
            const docRef = await addDoc(collection(db, 'posts'), basicPostData);
            console.log(t('createPost.messages.basicPostSaved') + ':', docRef.id);
            setCurrentStep(t('createPost.messages.postCreatedSuccess'));

            // Only attempt file upload if files are selected
            if (uploadedFiles.length > 0) {
                console.log(t('createPost.messages.attemptingUpload') + `: ${uploadedFiles.length}個のファイル`);
                setCurrentStep('ファイルアップロードの準備中...');

                try {
                    const uploadedFileUrls = await uploadFilesToCloudinary(uploadedFiles, docRef.id);
                    console.log(t('createPost.messages.filesUploadedSuccess') + ':', uploadedFileUrls);

                    // Update post with file URLs
                    setCurrentStep('投稿を最終化中...');
                    await updateDoc(doc(db, 'posts', docRef.id), {
                        files: uploadedFileUrls
                    });
                    console.log(t('createPost.messages.postUpdatedWithFiles'));
                    setCurrentStep(t('createPost.messages.postCreatedSuccess'));

                } catch (fileError) {
                    console.error(t('createPost.messages.fileUploadError') + ':', fileError);
                    // Don't fail the entire post - it's already saved
                    alert(`${t('createPost.messages.postCreatedSuccess')}、${t('createPost.messages.fileUploadFailed')}: ${fileError.message}`);
                }
            } else {
                console.log(t('createPost.messages.noFilesToUpload'));
                setCurrentStep(t('createPost.messages.postCreatedSuccess'));
            }

            // Show success modal instead of alert
            setShowSuccessModal(true);

            // Reset form
            setExplanation('');
            setGenres(['', '', '']);
            setTags('');
            setUploadedFiles([]);
            setSchedulePost(false);
            setPublicationPeriod(false);
            setAddPlan(false);
            setSinglePostSales(false);
            setAgreements({
                copyright: false,
                minors: false,
                censored: false,
            });

            // Navigation will be handled by success modal

        } catch (error) {
            console.error(t('createPost.messages.postCreationFailed') + ':', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                stack: error.stack
            });

            let errorMessage = 'Unknown error occurred';
            if (error.code) {
                switch (error.code) {
                    case 'permission-denied':
                        errorMessage = t('createPost.messages.permissionDenied') + '\n' +
                                     '1. ログインしている\n' +
                                     '2. Firestoreセキュリティルールが投稿作成を許可している\n' +
                                     '3. 認証トークンが有効である';
                        console.error('🔒 権限が拒否されました。ユーザー:', currentUser?.uid);
                        console.error(t('createPost.messages.updateFirestoreRules'));
                        break;
                    case 'unavailable':
                        errorMessage = t('createPost.messages.serviceUnavailable');
                        break;
                    case 'failed-precondition':
                        errorMessage = 'Database rules prevent this operation. Check Firestore security rules.';
                        break;
                    case 'unauthenticated':
                        errorMessage = t('createPost.messages.notAuthenticated');
                        navigate('/login');
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                }
            } else {
                errorMessage = error.message;
            }

            alert(`${t('createPost.messages.errorPublishing')}: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
            console.log(t('createPost.messages.postCreationFinished'));
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        setUploadProgress(0);
        setCurrentStep('');
        setFilesUploaded(0);
        navigate('/home');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white p-4 pb-24 max-w-4xl mx-auto"
        >
            <h1 className="text-center font-bold text-lg mb-4">{t('createPost.title')}</h1>

            {/* Images/Videos upload */}
            <div className="mb-4">
                <div
                    onClick={handleFileButtonClick}
                    className="border border-pink-600 rounded p-4 w-24 h-24 flex flex-col items-center justify-center cursor-pointer inline-block hover:bg-pink-50 transition-colors"
                >
                    <div className="text-pink-600 text-3xl font-bold">+</div>
                    <div className="text-pink-600 text-xs text-center mt-1">{t('createPost.upload.button')}</div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />
                {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-3">{t('createPost.upload.selectedFiles')}: {uploadedFiles.length}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="relative">
                                    {file.type.startsWith('image/') ? (
                                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : file.type.startsWith('video/') ? (
                                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                                            <video
                                                src={URL.createObjectURL(file)}
                                                className="w-full h-full object-cover"
                                                muted
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                                <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-xs text-gray-500 text-center p-2">{file.name}</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                                        }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                    <div className="mt-1">
                                        <p className="text-xs text-gray-600 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {file.type.startsWith('image/') ? '📷 Image' : '🎥 Video'} • {(file.size / 1024 / 1024).toFixed(1)}MB
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Explanation */}
            <label htmlFor="explanation" className="block font-semibold mb-1">
                {t('createPost.explanation')} <span className="text-pink-600">*</span>
            </label>
            <textarea
                id="explanation"
                placeholder={t("createPost.placeholder.explanationText")}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 mb-4 resize-none min-h-[100px] placeholder-gray-400"
            />

            {/* Genre selectors */}
            <label className="block font-semibold mb-1">
                {t('createPost.genre.title')} <span className="text-pink-600">*</span> <span className="text-gray-500 text-xs">{t('createPost.genre.subtitle')}</span>
            </label>
            {[0, 1, 2].map((index) => (
                <select
                    key={index}
                    className="w-full border border-gray-300 rounded mb-3 p-2 text-gray-600"
                    value={genres[index]}
                    onChange={(e) => handleGenreChange(index, e.target.value)}
                >
                    <option value="">{t("createPost.genre.title")}{`${index + 1}`}</option>
                    <option value="Married Woman">{t("createPost.genreCat.MW")}</option>
                    <option value="Pervert">{t("createPost.genreCat.Pervert")}</option>
                    <option value="Beautiful Breasts">{t("createPost.genreCat.Btb")}</option>
                    <option value="Romance">{t("createPost.genreCat.Romance")}</option>
                    <option value="Fantasy">{t("createPost.genreCat.Fantasy")}</option>
                    <option value="Adventure">{t("createPost.genreCat.Adv")}</option>
                </select>
            ))}

            {/* Tags */}
            <label htmlFor="tags" className="block font-semibold mb-1">{t('createPost.tags')}</label>
            <input
                type="text"
                id="tags"
                placeholder={t("createPost.placeholder.tagstext")}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border border-gray-300 rounded mb-6 p-2 placeholder-gray-400"
            />

            {/* Switches */}
            <div className="border-t border-gray-300 pt-4 space-y-4">

                <div className="flex items-center justify-between">
                    <span className="font-semibold">{t('createPost.switches.schedulePost')}</span>
                    <Switch
                        checked={schedulePost}
                        onChange={setSchedulePost}
                        className={classNames(
                            schedulePost ? 'bg-pink-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                        )}
                    >
                        <span
                            className={classNames(
                                schedulePost ? 'translate-x-6' : 'translate-x-1',
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                            )}
                        />
                    </Switch>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">{t('createPost.switches.publicationPeriod')}</span>
                        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <Switch
                        checked={publicationPeriod}
                        onChange={setPublicationPeriod}
                        className={classNames(
                            publicationPeriod ? 'bg-pink-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                        )}
                    >
                        <span
                            className={classNames(
                                publicationPeriod ? 'translate-x-6' : 'translate-x-1',
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                            )}
                        />
                    </Switch>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-semibold">{t('createPost.switches.addPlan')}</span>
                    <Switch
                        checked={addPlan}
                        onChange={setAddPlan}
                        className={classNames(
                            addPlan ? 'bg-pink-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                        )}
                    >
                        <span
                            className={classNames(
                                addPlan ? 'translate-x-6' : 'translate-x-1',
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                            )}
                        />
                    </Switch>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">{t('createPost.switches.singlePostSales')}</span>
                        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <Switch
                        checked={singlePostSales}
                        onChange={setSinglePostSales}
                        className={classNames(
                            singlePostSales ? 'bg-pink-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                        )}
                    >
                        <span
                            className={classNames(
                                singlePostSales ? 'translate-x-6' : 'translate-x-1',
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                            )}
                        />
                    </Switch>
                </div>

            </div>

            {/* Confirmations box */}
            <div className="bg-pink-50 border border-pink-300 rounded p-4 mt-6 space-y-3 text-sm text-pink-700">
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.copyright}
                        onChange={() => toggleAgreement('copyright')}
                        className="form-checkbox rounded text-pink-600 border-pink-600"
                    />
                    <span>
                        {t('createPost.agreements.copyright')}
                    </span>
                </label>
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.minors}
                        onChange={() => toggleAgreement('minors')}
                        className="form-checkbox rounded text-pink-600 border-pink-600"
                    />
                    <span>
                        {t('createPost.agreements.minors')}
                    </span>
                </label>
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.censored}
                        onChange={() => toggleAgreement('censored')}
                        className="form-checkbox rounded text-pink-600 border-pink-600"
                    />
                    <span>
                        {t('createPost.agreements.censored')}
                    </span>
                </label>
                <button className="text-pink-600 underline text-left text-sm mt-1">
                    {'>'} {t('createPost.agreements.contentrequire')}
                </button>
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.guidelines}
                        onChange={() => toggleAgreement('guidelines')}
                        className="form-checkbox rounded text-pink-600 border-pink-600"
                    />
                    <span>
                        {t('createPost.agreements.guidelines')}
                    </span>
                </label>
            </div>

            {/* Publish button */}
            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={!agreements.copyright || !agreements.minors || !agreements.censored || !agreements.guidelines || isSubmitting}
                    className={`w-full font-bold py-3 rounded relative overflow-hidden ${(!agreements.copyright || !agreements.minors || !agreements.censored || !agreements.guidelines || isSubmitting)
                        ? 'bg-pink-200 text-pink-500 cursor-not-allowed'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                        }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>{t('createPost.publishing')}</span>
                        </div>
                    ) : (
                        t('createPost.publishButton')
                    )}
                </button>

                {/* Progress indicators */}
                {isSubmitting && (
                    <div className="mt-4 space-y-2">
                        {/* Current step */}
                        <div className="text-sm text-gray-600 text-center">
                            {currentStep}
                        </div>

                        {/* File upload progress */}
                        {uploadedFiles.length > 0 && uploadProgress > 0 && (
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{t('createPost.files')}: {filesUploaded}/{uploadedFiles.length}</span>
                                    <span>{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer text */}
            <p className="text-xs text-gray-500 mt-6">
                {t('createPost.footerText.thankYou')}
            </p>
            <ul className="text-xs text-gray-500 list-disc list-inside mt-2 space-y-1">
                <li>{t('createPost.footerText.lineone')}<a href="/Account" className="underline">{t('createPost.footerText.lineonetwo')}</a>.</li>
                <li>{t('createPost.footerText.linetwo')}</li>
                <li>{t('createPost.footerText.linethree')}</li>
                <li>{t('createPost.footerText.linefour')}</li>
            </ul>
            <a href="/Account" className="underline text-xs text-pink-600 mt-2 block">
                {t('createPost.footerText.buttonclick')}
            </a>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.5, type: "spring", bounce: 0.6 }}
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className="text-green-600 text-4xl"
                            >
                                ✓
                            </motion.div>
                        </motion.div>

                        {/* Success Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {t('createPost.success')}
                            </h2>
                            <p className="text-gray-600 mb-8">
                                {t('createPost.footerText.linepost')}
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="space-y-3"
                        >
                            <button
                                onClick={handleSuccessModalClose}
                                className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
                            >
                                {t('createPost.continuehome')}
                            </button>
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    navigate('/profile');
                                }}
                                className="w-full border border-pink-600 text-pink-600 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
                            >
                                {t('createPost.viewprofile')}
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            <BottomNavigation active='Account' />
        </motion.div>
    );
};

export default CreatePostPage;
