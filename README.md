# UMatch

UMatch is an AI-powered platform designed to help Albanian students find and connect with the right universities based on their personality, interests, and academic goals.

## 🎯 Project Overview

UMatch provides a personalized journey for students choosing universities by using AI-driven matching algorithms to connect students with compatible universities, programs, and faculty mentors.

> "Give every student a playful, data-driven 'tour guide' that turns the fog of university choice into a well-lit, personalised journey."

## ✨ Core Features

- **SparkTest™**: 7-minute archetype quiz that creates a detailed profile for matching
- **FitScore™**: Proprietary algorithm that rates compatibility between students and faculties/programs
- **UniBot Assistant**: LLM-powered chat interface for answering university-specific questions
- **MyDeck™**: Trello-like board for tracking university applications and deadlines
- **PeerNet™**: Social network connecting students with similar interests and career goals
- **Parent Portal**: Resources and direct communication channel for parents

## 🤖 Technology Stack

- **Backend**: Laravel (PHP) with Eloquent ORM
- **Frontend**: React with TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Dependencies**: Bootstrap, React-Toastify

## 🎨 UMatch Archetypes

The platform uses 12 unique archetypes to match students with universities:

- Analyst-Engineer (AN-EN)
- Artist-Designer (AR-DS)
- Digital-Coder (DI-CD)
- Executive-Business (EX-BU)
- Global-Diplomat (GL-DM)
- Global-Traveler (GL-TR)
- Health-Biotech (HE-BT)
- Health-Medical (HE-MD)
- Social-Educator (SO-ED)
- Social-Media (SO-ME)
- Sport-Athlete (SP-AT)
- Spirit-Explorer (SP-EC)

## 📦 Project Structure

The project follows Laravel's standard structure:
- `app/` - Application code
- `resources/` - Frontend assets and views
  - `js/` - React components
  - `views/` - Blade templates
- `public/` - Publicly accessible files
- `database/` - Migrations and seeders
- `routes/` - API and web routes

## 🚀 Getting Started

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js and npm
- MySQL or compatible database

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/umatch.git
cd umatch
```

2. Install PHP dependencies
```bash
composer install
```

3. Install JavaScript dependencies
```bash
npm install
```

4. Copy the environment file and set up your environment variables
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in the `.env` file

6. Run migrations
```bash
php artisan migrate
```

7. Build frontend assets
```bash
npm run build
```

8. Start the development server
```bash
php artisan serve
```

## 🔨 Development

For development mode with hot-reloading:
```bash
npm run dev
```

## 📝 License

[License information]

## 📞 Contact

[Contact information] 