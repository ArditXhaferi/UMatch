import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    UserCircleIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    BellIcon,
    KeyIcon,
    TrashIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

interface ProfileProps {
    auth: {
        user: {
            name: string;
            email: string;
            email_verified_at?: string;
        };
    };
    studentProfile?: {
        id: number;
        hexad_type: string;
        archetype_code: string;
        xp?: number;
        credits?: number;
        school?: string;
    } | null;
    mustVerifyEmail: boolean;
}

export default function Profile({ auth, studentProfile, mustVerifyEmail }: ProfileProps) {
    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Profile form
    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    // Education form
    const educationForm = useForm({
        school: studentProfile?.school || '',
    });

    // Notifications form
    const notificationsForm = useForm({
        notifications_enabled: true,
        email_notifications: true,
    });

    const submitProfile = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            preserveScroll: true as const,
        });
    };

    const submitEducation = (e: React.FormEvent) => {
        e.preventDefault();
        educationForm.patch(route('profile.update'), {
            preserveScroll: true as const,
        });
    };

    const submitNotifications = (e: React.FormEvent) => {
        e.preventDefault();
        notificationsForm.patch(route('profile.update'), {
            preserveScroll: true as const,
        });
    };

    const deleteAccount = () => {
        router.delete(route('profile.destroy'), {
            data: {
                password: '',
            },
            onSuccess: () => {
                router.visit('/');
            },
        });
    };

    const tabs = [
        { id: 'profile', name: 'Profile', icon: UserCircleIcon },
        { id: 'education', name: 'Education', icon: AcademicCapIcon },
        { id: 'security', name: 'Security', icon: ShieldCheckIcon },
        { id: 'notifications', name: 'Notifications', icon: BellIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation 
                auth={auth}
                studentProfile={studentProfile}
                currentPage="other"
            />

            <Head title="Profile Settings" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back to Dashboard Link */}
                <Link 
                    href="/dashboard" 
                    className="inline-flex items-center mb-6 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="px-6 py-8 bg-gradient-to-r from-[#9A2D2D] to-[#B8352F]">
                        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                        <p className="mt-2 text-white opacity-90">Manage your account settings and preferences</p>
                    </div>

                    {/* Settings Content */}
                    <div className="px-6 py-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Sidebar Navigation */}
                            <div className="w-full md:w-64 space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                                            activeTab === tab.id
                                                ? 'bg-[#9A2D2D] text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <tab.icon className="h-5 w-5 mr-3" />
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="flex-1">
                                {activeTab === 'profile' && (
                                    <form onSubmit={submitProfile} className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        value={profileForm.data.name}
                                                        onChange={e => profileForm.setData('name', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A2D2D] focus:ring-[#9A2D2D] sm:text-sm"
                                                    />
                                                    {profileForm.errors.name && (
                                                        <p className="mt-1 text-sm text-red-600">{profileForm.errors.name}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={profileForm.data.email}
                                                        onChange={e => profileForm.setData('email', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A2D2D] focus:ring-[#9A2D2D] sm:text-sm"
                                                    />
                                                    {profileForm.errors.email && (
                                                        <p className="mt-1 text-sm text-red-600">{profileForm.errors.email}</p>
                                                    )}
                                                </div>

                                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                                    <div className="rounded-md bg-yellow-50 p-4">
                                                        <div className="flex">
                                                            <div className="flex-shrink-0">
                                                                <ShieldCheckIcon className="h-5 w-5 text-yellow-400" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <h3 className="text-sm font-medium text-yellow-800">
                                                                    Email Verification Required
                                                                </h3>
                                                                <div className="mt-2 text-sm text-yellow-700">
                                                                    <p>
                                                                        Your email address is unverified. Please verify your email address to access all features.
                                                                    </p>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <Link
                                                                        href={route('verification.send')}
                                                                        method="post"
                                                                        as="button"
                                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                                    >
                                                                        Resend Verification Email
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end space-x-4">
                                            {profileForm.recentlySuccessful && (
                                                <span className="text-sm text-green-600">Saved successfully!</span>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={profileForm.processing}
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {activeTab === 'education' && (
                                    <form onSubmit={submitEducation} className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Education Information</h2>
                                        
                                        <div>
                                            <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                                                School
                                            </label>
                                            <input
                                                type="text"
                                                id="school"
                                                value={educationForm.data.school}
                                                onChange={e => educationForm.setData('school', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9A2D2D] focus:ring-[#9A2D2D] sm:text-sm"
                                            />
                                            {educationForm.errors.school && (
                                                <p className="mt-1 text-sm text-red-600">{educationForm.errors.school}</p>
                                            )}
                                        </div>

                                        {studentProfile && (
                                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                                <h3 className="text-lg font-medium text-gray-900">Learning Profile</h3>
                                                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Learning Archetype</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">{studentProfile.hexad_type}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Experience Points</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">{studentProfile.xp || 0} XP</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-end space-x-4">
                                            {educationForm.recentlySuccessful && (
                                                <span className="text-sm text-green-600">Saved successfully!</span>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={educationForm.processing}
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {activeTab === 'security' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
                                        
                                        <div className="space-y-4">
                                            <Link
                                                href={route('password.edit')}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                            >
                                                <KeyIcon className="h-5 w-5 mr-2 text-gray-400" />
                                                Change Password
                                            </Link>

                                            <div className="mt-6">
                                                <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                                                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                                                    <p className="text-sm text-red-700">
                                                        Once you delete your account, there is no going back. Please be certain.
                                                    </p>
                                                    {!showDeleteConfirm ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowDeleteConfirm(true)}
                                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            <TrashIcon className="h-5 w-5 mr-2" />
                                                            Delete Account
                                                        </button>
                                                    ) : (
                                                        <div className="mt-4 space-y-4">
                                                            <p className="text-sm text-red-700">
                                                                Please enter your password to confirm account deletion:
                                                            </p>
                                                            <input
                                                                type="password"
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                                                placeholder="Enter your password"
                                                                onChange={(e) => router.put(route('profile.destroy'), {
                                                                    password: e.target.value,
                                                                })}
                                                            />
                                                            <div className="flex space-x-4">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowDeleteConfirm(false)}
                                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={deleteAccount}
                                                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                                >
                                                                    Confirm Deletion
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <form onSubmit={submitNotifications} className="space-y-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                                                    <p className="text-sm text-gray-500">Receive notifications about your learning progress</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notificationsForm.data.notifications_enabled}
                                                        onChange={e => notificationsForm.setData('notifications_enabled', e.target.checked as boolean)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9A2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9A2D2D]"></div>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                                    <p className="text-sm text-gray-500">Receive email updates about your account</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notificationsForm.data.email_notifications}
                                                        onChange={e => notificationsForm.setData('email_notifications', e.target.checked as boolean)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9A2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9A2D2D]"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end space-x-4">
                                            {notificationsForm.recentlySuccessful && (
                                                <span className="text-sm text-green-600">Saved successfully!</span>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={notificationsForm.processing}
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 