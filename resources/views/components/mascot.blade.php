@props(['state' => 'idle'])

<div class="relative w-32 h-32 mx-auto">
    {{-- Base character --}}
    <div class="absolute inset-0 bg-green-400 rounded-full"></div>
    
    {{-- Eyes --}}
    <div class="absolute top-8 left-6 w-6 h-6 bg-white rounded-full"></div>
    <div class="absolute top-8 right-6 w-6 h-6 bg-white rounded-full"></div>
    
    {{-- Pupils --}}
    <div class="absolute top-10 left-8 w-3 h-3 bg-black rounded-full"></div>
    <div class="absolute top-10 right-8 w-3 h-3 bg-black rounded-full"></div>
    
    {{-- Smile --}}
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-6 border-b-4 border-white rounded-b-full"></div>
    
    {{-- Loading animation --}}
    @if($state === 'loading')
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div class="flex space-x-1">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    @endif
    
    {{-- Success animation --}}
    @if($state === 'success')
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        </div>
    @endif
</div> 