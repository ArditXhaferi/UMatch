<div class="min-h-screen bg-gradient-to-br from-green-400 via-green-300 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">Discover Your Path! 🎓</h1>
            <p class="text-xl text-white/90">Let's find your perfect academic match!</p>
        </div>

        <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            @if(!$showResults)
                <div class="space-y-8">
                    <div class="text-center">
                        <x-mascot :state="$uploading ? 'loading' : 'idle'" />
                        <h2 class="text-3xl font-bold text-gray-900 mt-6">Ready to Begin Your Journey?</h2>
                        <p class="mt-2 text-gray-600">Drop your academic records and let's find your perfect match!</p>
                    </div>

                    <div class="mt-8">
                        <div class="flex justify-center px-6 pt-5 pb-6 border-3 border-dashed rounded-2xl transition-all duration-300"
                             x-data="{ isHovered: false }"
                             x-on:dragover.prevent="isHovered = true"
                             x-on:dragleave.prevent="isHovered = false"
                             x-on:drop.prevent="isHovered = false"
                             wire:dragover="$refresh"
                             wire:dragleave="$refresh"
                             wire:drop="$refresh"
                             :class="{ 'border-green-500 bg-green-50 scale-105': isHovered || $wire.isDragging, 'border-gray-300': !isHovered && !$wire.isDragging }">
                            <div class="space-y-3 text-center">
                                <div class="flex justify-center">
                                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="flex text-sm text-gray-600">
                                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-full px-6 py-2 font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 transition-all duration-300 hover:bg-green-50">
                                        <span>Choose Files</span>
                                        <input wire:model="files" id="file-upload" type="file" class="sr-only" multiple accept=".pdf,.jpg,.jpeg,.png">
                                    </label>
                                    <p class="pl-3 self-center">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                            </div>
                        </div>

                        @if(count($files) > 0)
                            <div class="mt-4">
                                <div class="space-y-2">
                                    @foreach($files as $file)
                                        <div class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                            <div class="flex items-center space-x-3">
                                                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p class="text-sm font-medium text-gray-900">{{ $file->getClientOriginalName() }}</p>
                                                    <p class="text-xs text-gray-500">{{ round($file->getSize() / 1024) }} KB</p>
                                                </div>
                                            </div>
                                            <button wire:click="removeFile({{ $loop->index }})" class="text-gray-400 hover:text-red-500 transition-colors duration-200">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    </div>

                    @if($uploading)
                        <div class="mt-8">
                            <div class="relative pt-1">
                                <div class="flex mb-2 items-center justify-between">
                                    <div>
                                        <span class="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-green-600 bg-green-100">
                                            @if($processingState === 'uploading')
                                                Uploading...
                                            @elseif($processingState === 'processing')
                                                <div class="flex items-center space-x-2">
                                                    <span>Processing with AI</span>
                                                    <div class="flex space-x-1">
                                                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                                                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                                                    </div>
                                                </div>
                                            @endif
                                        </span>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-xs font-semibold inline-block text-green-600">
                                            {{ round($uploadProgress) }}%
                                        </span>
                                    </div>
                                </div>
                                <div class="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-green-100">
                                    <div style="width: {{ $uploadProgress }}%" 
                                         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 rounded-full relative">
                                        @if($processingState === 'processing')
                                            <div class="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 animate-shimmer"></div>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            @if($processingState === 'processing')
                                <div class="mt-4 text-center">
                                    <div class="inline-block p-4 bg-green-50 rounded-2xl">
                                        <div class="flex items-center space-x-4">
                                            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center animate-spin">
                                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                                </svg>
                                            </div>
                                            <div class="text-left">
                                                <p class="text-sm font-medium text-gray-900">Analyzing Documents</p>
                                                <p class="text-xs text-gray-500">Extracting information with AI...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>

                        @if($errorMessage)
                            <div class="mt-4 p-4 bg-red-50 rounded-xl animate-shake">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm text-red-700">{{ $errorMessage }}</p>
                                    </div>
                                </div>
                            </div>
                        @endif
                    @endif

                    @if(count($files) > 0)
                        <div class="mt-8">
                            <button wire:click="upload" class="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-300">
                                Let's Find Your Match! 🚀
                            </button>
                        </div>
                    @endif
                </div>
            @else
                <div class="space-y-8">
                    <div class="text-center">
                        <x-mascot state="success" />
                        <h2 class="text-3xl font-bold text-gray-900 mt-6">Your Academic Profile</h2>
                        <p class="mt-2 text-gray-600">Here's what we found for you!</p>
                    </div>

                    <div class="space-y-6">
                        @foreach($analysisResults['top_matches'] as $match)
                            <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-900">{{ $match['name'] }}</h3>
                                        <p class="text-sm text-gray-500">Code: {{ $match['code'] }}</p>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-3xl font-bold text-green-600">{{ $match['percentage'] }}%</span>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <div class="relative pt-1">
                                        <div class="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-green-100">
                                            <div style="width: {{ $match['percentage'] }}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <div class="mt-8">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Recommended Majors</h3>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            @foreach($analysisResults['recommended_majors'] as $major)
                                <div class="bg-white border border-gray-200 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <span class="ml-3 text-gray-900 font-medium">{{ $major }}</span>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="mt-8">
                        <button wire:click="$set('showResults', false)" class="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-300">
                            Try Again! 🔄
                        </button>
                    </div>
                </div>
            @endif
        </div>
    </div>
</div> 