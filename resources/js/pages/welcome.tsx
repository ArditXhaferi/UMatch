import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

const Welcome: React.FC<PageProps> = ({ auth }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-300 to-blue-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                        Welcome to UMatch
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Discover your perfect academic path with AI-powered personality analysis
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        {auth.user ? (
                            <div className="rounded-md shadow">
                                <Link
                                    href={route('upload.index')}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Upload Documents
                                </Link>
                            </div>
                        ) : (
                            <div className="rounded-md shadow">
                                <Link
                                    href={route('login')}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
