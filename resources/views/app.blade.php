<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        <!-- Primary Meta Tags -->
        <title>{{ config('app.name', 'UMatch') }} — University Matchmaking & Exploration Platform</title>
        <meta name="title" content="UMatch — University Matchmaking & Exploration Platform">
        <meta name="description" content="UMatch is a playful, data-driven platform that helps students, parents, and universities connect, explore, and find the perfect academic match. Take our SparkTest, discover your archetype, and get personalized university recommendations powered by AI.">
        <meta name="keywords" content="university matchmaking, student archetypes, university exploration, AI education platform, SparkTest, FitScore, student-parent portal, university recommendations, gamified education, Albanian universities, career guidance, MBTI, RIASEC, higher education, student community, university application, academic fit, university search, PeerNet, MyDeck, UniBot">
        <meta name="author" content="UMatch Team">
        <meta name="robots" content="index, follow">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="UMatch — University Matchmaking & Exploration Platform">
        <meta property="og:description" content="UMatch is a playful, data-driven platform for students, parents, and universities to connect, explore, and find the perfect academic match. Discover your archetype and get personalized recommendations powered by AI.">
        <meta property="og:image" content="{{ public_path('social_media.png') }}">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ url()->current() }}">
        <meta name="twitter:title" content="UMatch — University Matchmaking & Exploration Platform">
        <meta name="twitter:description" content="UMatch is a playful, data-driven platform for students, parents, and universities to connect, explore, and find the perfect academic match. Discover your archetype and get personalized recommendations powered by AI.">
        <meta name="twitter:image" content="{{ public_path('social_media.png') }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="{{ asset('favicon.ico') }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        @routes
        @if(config('app.env') === 'local')
            @viteReactRefresh
        @endif
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#fef8ef]">
        @inertia
    </body>
</html>
