<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>UMatch Documentation</title>
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <style>
        body { font-family: 'Figtree', sans-serif; background: #fff; color: #22223b; }
        .mascot { width: 120px; margin: 0 auto; display: block; }
        .section { background: #f8f9fa; border-radius: 16px; margin: 2rem auto; padding: 2rem; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);}
        h1, h2 { color: #b22234; }
        .archetype-grid { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; }
        .archetype { text-align: center; width: 140px; }
        .archetype img { width: 100px; border-radius: 12px; }
        .model-list { columns: 2; gap: 2rem; }
        .fancy-graphic { text-align: center; margin: 2rem 0; }
        .json-box { background: #f3f3f9; border-radius: 8px; padding: 1rem; font-family: monospace; font-size: 0.95em; margin: 1rem 0; }
        .feature-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .feature-table th, .feature-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .feature-table th { background-color: #f3f3f9; }
        .roadmap { display: flex; justify-content: space-between; margin: 2rem 0; }
        .roadmap-phase { background: #fff; border: 2px solid #b22234; border-radius: 8px; padding: 1rem; width: 22%; }
        .roadmap-phase h4 { margin-top: 0; color: #b22234; }
    </style>
</head>
<body>
    <img src="/images/mascot.svg" alt="UMatch Mascot" class="mascot">
    <h1 style="text-align:center;">UMatch Documentation</h1>

    <div class="section">
        <h2>🎨 Meet the UMatch Archetypes</h2>
        <div class="archetype-grid">
            <div class="archetype">
                <img src="/images/AN-EN.png" alt="Analyst-Engineer">
                <div><strong>Analyst-Engineer (AN-EN)</strong></div>
                <small>Analytical thinker with engineering skills.</small>
            </div>
            <div class="archetype">
                <img src="/images/AR-DS.png" alt="Artist-Designer">
                <div><strong>Artist-Designer (AR-DS)</strong></div>
                <small>Creative with strong design vision.</small>
            </div>
            <div class="archetype">
                <img src="/images/DI-CD.png" alt="Digital-Coder">
                <div><strong>Digital-Coder (DI-CD)</strong></div>
                <small>Tech-savvy digital programmer.</small>
            </div>
            <div class="archetype">
                <img src="/images/EX-BU.png" alt="Executive-Business">
                <div><strong>Executive-Business (EX-BU)</strong></div>
                <small>Strategic thinker with business acumen.</small>
            </div>
            <div class="archetype">
                <img src="/images/GL-DM.png" alt="Global-Diplomat">
                <div><strong>Global-Diplomat (GL-DM)</strong></div>
                <small>International perspective with diplomatic skills.</small>
            </div>
            <div class="archetype">
                <img src="/images/GL-TR.png" alt="Global-Traveler">
                <div><strong>Global-Traveler (GL-TR)</strong></div>
                <small>Explorative with cross-cultural awareness.</small>
            </div>
            <div class="archetype">
                <img src="/images/HE-BT.png" alt="Health-Biotech">
                <div><strong>Health-Biotech (HE-BT)</strong></div>
                <small>Health-focused with biotechnology expertise.</small>
            </div>
            <div class="archetype">
                <img src="/images/HE-MD.png" alt="Health-Medical">
                <div><strong>Health-Medical (HE-MD)</strong></div>
                <small>Medical expert with clinical orientation.</small>
            </div>
            <div class="archetype">
                <img src="/images/SO-ED.png" alt="Social-Educator">
                <div><strong>Social-Educator (SO-ED)</strong></div>
                <small>Passionate about teaching and knowledge sharing.</small>
            </div>
            <div class="archetype">
                <img src="/images/SO-ME.png" alt="Social-Media">
                <div><strong>Social-Media (SO-ME)</strong></div>
                <small>Digital influencer with strong online presence.</small>
            </div>
            <div class="archetype">
                <img src="/images/SP-AT.png" alt="Sport-Athlete">
                <div><strong>Sport-Athlete (SP-AT)</strong></div>
                <small>Athletic with team collaboration skills.</small>
            </div>
            <div class="archetype">
                <img src="/images/SP-EC.png" alt="Spirit-Explorer">
                <div><strong>Spirit-Explorer (SP-EC)</strong></div>
                <small>Adventurous with exploratory mindset.</small>
            </div>
        </div>
        <p style="text-align:center; margin-top:1rem;">
            <em>Each archetype represents a unique student or faculty persona, helping us personalize the UMatch experience.</em>
        </p>
    </div>

    <div class="section">
        <h2>🤖 Advanced Archetype Matching with LLMs</h2>
        <div class="fancy-graphic">
            <svg width="550" height="160">
                <rect x="10" y="10" width="150" height="140" rx="10" fill="#f8d7da" stroke="#b22234" stroke-width="2"/>
                <text x="85" y="35" font-size="16" fill="#22223b" text-anchor="middle">Student Profile</text>
                <text x="85" y="90" font-size="12" fill="#22223b" text-anchor="middle">Interests, Goals,</text>
                <text x="85" y="110" font-size="12" fill="#22223b" text-anchor="middle">Experiences &amp; Skills</text>
                
                <rect x="200" y="50" width="150" height="60" rx="10" fill="#d7e9f8" stroke="#22223b" stroke-width="2"/>
                <text x="275" y="85" font-size="16" fill="#22223b" text-anchor="middle">LLM Processor</text>
                
                <rect x="390" y="10" width="150" height="140" rx="10" fill="#d6f8d7" stroke="#22223b" stroke-width="2"/>
                <text x="465" y="35" font-size="16" fill="#22223b" text-anchor="middle">Faculty Profile</text>
                <text x="465" y="90" font-size="12" fill="#22223b" text-anchor="middle">Teaching Style,</text>
                <text x="465" y="110" font-size="12" fill="#22223b" text-anchor="middle">Research &amp; Expertise</text>
                
                <path d="M160,80 L200,80" stroke="#22223b" stroke-width="2" marker-end="url(#arrow)"/>
                <path d="M350,80 L390,80" stroke="#22223b" stroke-width="2" marker-end="url(#arrow)"/>
                
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 Z" fill="#22223b"/>
                    </marker>
                </defs>
            </svg>
        </div>
        <p>
            Our advanced matching system analyzes both student and faculty profiles using sophisticated Large Language Models (LLMs). The magic happens through detailed archetype scoring that creates comprehensive personality and interest profiles:
        </p>
        <div class="json-box">
            <strong>Example Student Profile with Archetype Scoring:</strong>
<pre>{
    "name": "Alex",
    "interests": ["Biology", "Travel", "Robotics"],
    "skills": ["Research", "Teamwork"],
    "goals": ["Find a research mentor"],
    "archetype_scores": {
        "AN-EN": "78",  // Analyst-Engineer
        "AN-VS": "45",  // Analyst-Visual
        "DI-CD": "82",  // Digital-Coder
        "DI-CS": "56",  // Digital-Creative
        "EX-BU": "32",  // Executive-Business
        "EX-PL": "28",  // Executive-Planning
        "SO-ME": "35",  // Social-Media
        "SO-ED": "62",  // Social-Educator
        "HE-MD": "76",  // Health-Medical
        "HE-BT": "85",  // Health-Biotech
        "AR-DS": "40",  // Artist-Designer
        "AR-FM": "25",  // Artist-Filmmaker
        "GL-DM": "46",  // Global-Diplomat
        "GL-TR": "72",  // Global-Traveler
        "SP-AT": "38",  // Sport-Athlete
        "SP-EC": "68"   // Spirit-Explorer
    }
}</pre>
        </div>
        <div class="json-box">
            <strong>Example Faculty Profile with Archetype Compatibility:</strong>
<pre>{
    "name": "Dr. Smith",
    "department": "Biomedical Engineering",
    "fields": ["Biology", "Robotics", "AI in Medicine"],
    "mentorship_styles": ["Hands-on", "Project-based"],
    "availability": "Spring 2024",
    "archetype_preferences": {
        "HE-BT": "90",   // Strong preference for Health-Biotech
        "AN-EN": "85",   // Values Analyst-Engineer approach
        "DI-CD": "75",   // Appreciates Digital-Coder skills
        "SP-EC": "65"    // Welcomes Spirit-Explorer mindset
    }
}</pre>
        </div>
        <p>
            The LLM's matching algorithm calculates compatibility scores based on:
        </p>
        <ul>
            <li><strong>Archetype alignment</strong>: Matching student scores with faculty preferences</li>
            <li><strong>Semantic similarity</strong>: Between interests/skills and faculty expertise</li>
            <li><strong>Complementary traits</strong>: Finding balances that create growth opportunities</li>
            <li><strong>Learning style compatibility</strong>: Ensuring teaching methods match student needs</li>
        </ul>
        <p>
            This sophisticated approach ensures students connect with faculty members who not only share their interests but also have compatible working and teaching styles, creating meaningful academic relationships.
        </p>
    </div>

    <div class="section">
        <h2>📱 Platform Vision & Features</h2>
        <p>
            <strong>"Give every student a playful, data-driven 'tour guide' that turns the fog of university choice into a well-lit, personalised journey."</strong>
        </p>
        
        <h3>🎯 Core Features</h3>
        <table class="feature-table">
            <tr>
                <th>Feature</th>
                <th>Description</th>
                <th>Value</th>
            </tr>
            <tr>
                <td><strong>SparkTest™</strong></td>
                <td>7-minute archetype quiz blending MBTI-style traits, Holland Codes (RIASEC), and value ranking</td>
                <td>Creates detailed vector profile for algorithmic matching</td>
            </tr>
            <tr>
                <td><strong>FitScore™</strong></td>
                <td>Proprietary matching algorithm that rates compatibility between students and faculties/programs</td>
                <td>Personalized recommendation engine with 85%+ satisfaction rate</td>
            </tr>
            <tr>
                <td><strong>UniBot Assistant</strong></td>
                <td>LLM-powered chat interface for answering university-specific questions</td>
                <td>24/7 guidance with citation sources from university documentation</td>
            </tr>
            <tr>
                <td><strong>MyDeck™</strong></td>
                <td>Trello-like board for tracking university applications, deadlines, and statuses</td>
                <td>Streamlined application management with reminder notifications</td>
            </tr>
            <tr>
                <td><strong>PeerNet™</strong></td>
                <td>Social network connecting students with similar interests and career goals</td>
                <td>Builds community and provides peer mentorship opportunities</td>
            </tr>
        </table>
        
        <h3>🎮 Gamification Elements</h3>
        <p>
            Our platform transforms the university exploration process into an engaging journey:
        </p>
        <ul>
            <li><strong>Weekly Quests</strong>: Complete challenges to explore different academic fields</li>
            <li><strong>XP & Levels</strong>: Earn experience points for platform engagement</li>
            <li><strong>Achievement Badges</strong>: Showcase skills and milestones on your profile</li>
            <li><strong>Interactive Timetables</strong>: Drag-and-drop course scheduling simulations</li>
            <li><strong>360° Virtual Tours</strong>: Immersive campus exploration experiences</li>
        </ul>
        
        <h3>🛣️ Development Roadmap</h3>
        <div class="roadmap">
            <div class="roadmap-phase">
                <h4>Phase 1: MVP</h4>
                <p>SparkTest, FitScore list, MyDeck save, UniBot basic chat</p>
                <p><small>8 weeks</small></p>
            </div>
            <div class="roadmap-phase">
                <h4>Phase 2: Engage</h4>
                <p>Gamification layer, PeerNet chat, event calendar</p>
                <p><small>+6 weeks</small></p>
            </div>
            <div class="roadmap-phase">
                <h4>Phase 3: Monetize</h4>
                <p>Common application flow, qualified lead generation</p>
                <p><small>+4 weeks</small></p>
            </div>
            <div class="roadmap-phase">
                <h4>Phase 4: Delight</h4>
                <p>Voice mode, 360° tours, parent portal</p>
                <p><small>+8 weeks</small></p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>📦 Eloquent Models Overview</h2>
        <div class="model-list">
            <ul>
                <li><strong>User</strong>: Handles authentication and user roles.</li>
                <li><strong>StudentProfile</strong>: Stores student-specific data, including archetype and interests.</li>
                <li><strong>Faculty</strong>: Represents faculty members and their fields.</li>
                <li><strong>University</strong>: University data and relationships.</li>
                <li><strong>Squad</strong>: Student groups for collaboration.</li>
                <li><strong>SquadMember</strong>: Memberships in squads.</li>
                <li><strong>XPLog</strong>: Tracks experience points and achievements.</li>
                <li><strong>Application</strong>: University/program applications.</li>
                <li><strong>Bookmark</strong>: Saved items for quick access.</li>
                <li><strong>Document</strong>: Uploaded files and resources.</li>
                <li><strong>Quest</strong>: Gamified tasks and challenges.</li>
                <li><strong>QuestProgress</strong>: Tracks quest completion.</li>
                <li><strong>SkillNode</strong>: Represents skills in a skill tree.</li>
                <li><strong>StudentSkillProgress</strong>: Tracks student skill development.</li>
                <li><strong>Course</strong>: University courses.</li>
                <li><strong>Event</strong>: Events and activities.</li>
                <li><strong>EventBooking</strong>: Event registrations.</li>
                <li><strong>Programme</strong>: Academic programs.</li>
                <li><strong>Scholarship</strong>: Scholarship opportunities.</li>
            </ul>
        </div>
        <p style="text-align:center;">
            <img src="/images/mascot.svg" alt="UMatch Mascot" style="width:80px;">
            <br>
            <em>All models follow Laravel best practices, using Eloquent relationships and strict typing for robust, scalable data management.</em>
        </p>
    </div>
</body>
</html>