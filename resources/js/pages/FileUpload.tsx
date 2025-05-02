import React, { useState, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import { DocumentArrowUpIcon, XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { PageProps } from '@/types';

const FileUpload: React.FC<PageProps> = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingState, setProcessingState] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const { data, setData, post, processing } = useForm({
        files: [] as File[],
    });

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFiles = Array.from(e.dataTransfer.files);
        setData('files', [...data.files, ...droppedFiles]);
    }, [data.files, setData]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setData('files', [...data.files, ...selectedFiles]);
        }
    }, [data.files, setData]);

    const removeFile = useCallback((index: number) => {
        const newFiles = [...data.files];
        newFiles.splice(index, 1);
        setData('files', newFiles);
    }, [data.files, setData]);

    const handleUpload = useCallback(() => {
        setProcessingState('uploading');
        setUploadProgress(0);
        setErrorMessage('');

        const formData = new FormData();
        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        post('/upload', {
            onProgress: (progress) => {
                if (progress?.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onSuccess: () => {
                setProcessingState('success');
            },
            onError: (errors) => {
                setProcessingState('error');
                setErrorMessage(errors.message || 'Failed to upload files');
            },
        });
    }, [data.files, post]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-300 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Discover Your Path! 🎓</h1>
                    <p className="text-xl text-white/90">Let's find your perfect academic match!</p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="relative w-32 h-32 mx-auto">
                                {processingState === 'idle' && (
                                    <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse" />
                                )}
                                {processingState === 'uploading' && (
                                    <div className="absolute inset-0 bg-green-400 rounded-full">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    </div>
                                )}
                                {processingState === 'success' && (
                                    <div className="absolute inset-0 bg-green-400 rounded-full">
                                        <CheckCircleIcon className="w-full h-full text-white" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mt-6">Ready to Begin Your Journey?</h2>
                            <p className="mt-2 text-gray-600">Drop your academic records and let's find your perfect match!</p>
                        </div>

                        <div className="mt-8">
                            <div
                                className={`flex justify-center px-6 pt-5 pb-6 border-3 border-dashed rounded-2xl transition-all duration-300 ${
                                    isDragging ? 'border-green-500 bg-green-50 scale-105' : 'border-gray-300'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="space-y-3 text-center">
                                    <div className="flex justify-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                            <DocumentArrowUpIcon className="w-8 h-8 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-full px-6 py-2 font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 transition-all duration-300 hover:bg-green-50">
                                            <span>Choose Files</span>
                                            <input
                                                type="file"
                                                className="sr-only"
                                                multiple
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileSelect}
                                            />
                                        </label>
                                        <p className="pl-3 self-center">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                </div>
                            </div>

                            {data.files.length > 0 && (
                                <div className="mt-4">
                                    <div className="space-y-2">
                                        {data.files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <DocumentIcon className="w-5 h-5 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                        <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(index)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                >
                                                    <XMarkIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {processingState === 'uploading' && (
                                <div className="mt-8">
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-green-600 bg-green-100">
                                                    Uploading...
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-semibold inline-block text-green-600">
                                                    {Math.round(uploadProgress)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-green-100">
                                            <div
                                                style={{ width: `${uploadProgress}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="mt-4 p-4 bg-red-50 rounded-xl animate-shake">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XMarkIcon className="h-5 w-5 text-red-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{errorMessage}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {data.files.length > 0 && !processing && (
                                <div className="mt-8">
                                    <button
                                        onClick={handleUpload}
                                        className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Let's Find Your Match! 🚀
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload; 