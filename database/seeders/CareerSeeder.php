<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Career;
use App\Models\CareerFuturePath;
use App\Models\CareerSkill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First truncate all related tables to avoid duplicate data
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('career_archetype')->truncate();
        DB::table('career_future_paths')->truncate();
        DB::table('career_skills')->truncate();
        DB::table('careers')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $careers = [
            [
                'title' => 'Software Engineer',
                'description' => 'Design, develop, and maintain software systems and applications',
                'salary_range' => '$70,000 - $150,000',
                'growth_rate' => '22%',
                'education' => 'Bachelor\'s in Computer Science or related field',
                'skills' => ['Programming', 'Algorithms', 'Data Structures', 'Software Design', 'Problem Solving'],
                'future_paths' => [
                    ['title' => 'Senior Software Engineer', 'years' => 3, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Tech Lead', 'years' => 5, 'salary' => '$140,000 - $200,000'],
                    ['title' => 'Software Architect', 'years' => 8, 'salary' => '$160,000 - $220,000'],
                    ['title' => 'CTO', 'years' => 15, 'salary' => '$200,000 - $500,000+']
                ],
                'match_archetypes' => ['DI-CS', 'DI-CD', 'AN-EN']
            ],
            [
                'title' => 'Data Scientist',
                'description' => 'Analyze and interpret complex data to help organizations make better decisions',
                'salary_range' => '$80,000 - $160,000',
                'growth_rate' => '31%',
                'education' => 'Master\'s or PhD in Statistics, Computer Science, or related field',
                'skills' => ['Statistics', 'Machine Learning', 'Programming', 'Data Visualization', 'Big Data'],
                'future_paths' => [
                    ['title' => 'Senior Data Scientist', 'years' => 3, 'salary' => '$130,000 - $190,000'],
                    ['title' => 'Lead Data Scientist', 'years' => 5, 'salary' => '$150,000 - $210,000'],
                    ['title' => 'Director of Data Science', 'years' => 8, 'salary' => '$170,000 - $240,000'],
                    ['title' => 'Chief Data Officer', 'years' => 12, 'salary' => '$200,000 - $400,000+']
                ],
                'match_archetypes' => ['DI-CD', 'AN-VS', 'DI-CS']
            ],
            [
                'title' => 'UX/UI Designer',
                'description' => 'Create intuitive and attractive user interfaces for digital products',
                'salary_range' => '$60,000 - $120,000',
                'growth_rate' => '13%',
                'education' => 'Bachelor\'s in Design, HCI, or related field',
                'skills' => ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
                'future_paths' => [
                    ['title' => 'Senior UX Designer', 'years' => 3, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'UX Lead', 'years' => 5, 'salary' => '$110,000 - $160,000'],
                    ['title' => 'Design Director', 'years' => 8, 'salary' => '$130,000 - $180,000'],
                    ['title' => 'Chief Experience Officer', 'years' => 12, 'salary' => '$150,000 - $250,000+']
                ],
                'match_archetypes' => ['AR-DS', 'AR-FM', 'SO-ME']
            ],
            [
                'title' => 'Financial Analyst',
                'description' => 'Analyze financial data and provide insights to guide business decisions',
                'salary_range' => '$65,000 - $125,000',
                'growth_rate' => '11%',
                'education' => 'Bachelor\'s in Finance, Economics, or related field',
                'skills' => ['Financial Analysis', 'Modeling', 'Excel', 'Accounting', 'Business Intelligence'],
                'future_paths' => [
                    ['title' => 'Senior Financial Analyst', 'years' => 3, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Finance Manager', 'years' => 5, 'salary' => '$110,000 - $160,000'],
                    ['title' => 'Finance Director', 'years' => 10, 'salary' => '$150,000 - $220,000'],
                    ['title' => 'CFO', 'years' => 15, 'salary' => '$180,000 - $350,000+']
                ],
                'match_archetypes' => ['EX-BU', 'DI-CD', 'GL-DM']
            ],
            [
                'title' => 'Marketing Manager',
                'description' => 'Plan and execute marketing campaigns to promote products or services',
                'salary_range' => '$65,000 - $140,000',
                'growth_rate' => '10%',
                'education' => 'Bachelor\'s in Marketing, Business, or related field',
                'skills' => ['Digital Marketing', 'Content Strategy', 'Analytics', 'Social Media', 'Brand Management'],
                'future_paths' => [
                    ['title' => 'Senior Marketing Manager', 'years' => 3, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'Marketing Director', 'years' => 6, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'VP of Marketing', 'years' => 10, 'salary' => '$150,000 - $230,000'],
                    ['title' => 'CMO', 'years' => 15, 'salary' => '$180,000 - $300,000+']
                ],
                'match_archetypes' => ['SO-ME', 'EX-BU', 'GL-TR']
            ],
            [
                'title' => 'Biomedical Engineer',
                'description' => 'Develop and improve medical equipment and devices to enhance healthcare',
                'salary_range' => '$75,000 - $140,000',
                'growth_rate' => '6%',
                'education' => 'Bachelor\'s or Master\'s in Biomedical Engineering',
                'skills' => ['Medical Devices', 'Design', 'Regulatory Affairs', 'Lab Testing', 'Clinical Evaluation'],
                'future_paths' => [
                    ['title' => 'Senior Biomedical Engineer', 'years' => 3, 'salary' => '$95,000 - $150,000'],
                    ['title' => 'Technical Lead', 'years' => 6, 'salary' => '$110,000 - $170,000'],
                    ['title' => 'Director of R&D', 'years' => 10, 'salary' => '$130,000 - $200,000'],
                    ['title' => 'Chief Scientific Officer', 'years' => 15, 'salary' => '$180,000 - $300,000+']
                ],
                'match_archetypes' => ['HE-BT', 'AN-EN', 'HE-MD']
            ],
            [
                'title' => 'Astrophysicist',
                'description' => 'Study celestial objects, space, and the physical universe as a whole',
                'salary_range' => '$80,000 - $150,000',
                'growth_rate' => '8%',
                'education' => 'PhD in Astrophysics or Physics',
                'skills' => ['Mathematical Modeling', 'Data Analysis', 'Physics', 'Programming', 'Research Methodology'],
                'future_paths' => [
                    ['title' => 'Senior Researcher', 'years' => 5, 'salary' => '$100,000 - $170,000'],
                    ['title' => 'Research Team Lead', 'years' => 8, 'salary' => '$120,000 - $190,000'],
                    ['title' => 'Observatory Director', 'years' => 12, 'salary' => '$140,000 - $220,000'],
                    ['title' => 'University Professor', 'years' => 15, 'salary' => '$130,000 - $200,000+']
                ],
                'match_archetypes' => ['AN-VS', 'DI-CD', 'HE-BT']
            ],
            [
                'title' => 'Mechanical Engineer',
                'description' => 'Design, develop, build, and test mechanical devices and systems',
                'salary_range' => '$70,000 - $130,000',
                'growth_rate' => '7%',
                'education' => 'Bachelor\'s in Mechanical Engineering',
                'skills' => ['CAD Design', 'Thermodynamics', 'Materials Science', 'Manufacturing Processes', 'Problem-Solving'],
                'future_paths' => [
                    ['title' => 'Senior Mechanical Engineer', 'years' => 4, 'salary' => '$95,000 - $150,000'],
                    ['title' => 'Engineering Manager', 'years' => 8, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Director of Engineering', 'years' => 12, 'salary' => '$150,000 - $220,000'],
                    ['title' => 'Chief Engineer', 'years' => 18, 'salary' => '$180,000 - $250,000+']
                ],
                'match_archetypes' => ['AN-EN', 'AN-VS', 'AR-DS']
            ],
            [
                'title' => 'Entrepreneur',
                'description' => 'Start and run your own business ventures, identifying market opportunities',
                'salary_range' => 'Variable ($0 - $1,000,000+)',
                'growth_rate' => '15%',
                'education' => 'Bachelor\'s in Business or related field (optional)',
                'skills' => ['Business Planning', 'Financial Management', 'Leadership', 'Marketing', 'Networking'],
                'future_paths' => [
                    ['title' => 'Established Business Owner', 'years' => 3, 'salary' => '$80,000 - $300,000'],
                    ['title' => 'Serial Entrepreneur', 'years' => 7, 'salary' => '$150,000 - $500,000'],
                    ['title' => 'Angel Investor', 'years' => 12, 'salary' => '$200,000 - $1,000,000+'],
                    ['title' => 'Venture Capitalist', 'years' => 15, 'salary' => '$300,000 - $5,000,000+']
                ],
                'match_archetypes' => ['EX-BU', 'EX-PL', 'AR-DS']
            ],
            [
                'title' => 'Policy Analyst',
                'description' => 'Evaluate and develop public policies and programs for governments and organizations',
                'salary_range' => '$60,000 - $120,000',
                'growth_rate' => '5%',
                'education' => 'Master\'s in Public Policy, Political Science, or Economics',
                'skills' => ['Research', 'Data Analysis', 'Policy Evaluation', 'Writing', 'Critical Thinking'],
                'future_paths' => [
                    ['title' => 'Senior Policy Analyst', 'years' => 5, 'salary' => '$80,000 - $130,000'],
                    ['title' => 'Policy Director', 'years' => 8, 'salary' => '$100,000 - $160,000'],
                    ['title' => 'Government Affairs Director', 'years' => 12, 'salary' => '$130,000 - $190,000'],
                    ['title' => 'Chief Policy Officer', 'years' => 15, 'salary' => '$150,000 - $220,000+']
                ],
                'match_archetypes' => ['EX-PL', 'GL-DM', 'SO-ED']
            ],
            [
                'title' => 'Journalist',
                'description' => 'Research, write, and report news stories for print, broadcast, or digital media',
                'salary_range' => '$35,000 - $90,000',
                'growth_rate' => '-4%',
                'education' => 'Bachelor\'s in Journalism or Communications',
                'skills' => ['Writing', 'Interviewing', 'Research', 'Fact-Checking', 'Media Production'],
                'future_paths' => [
                    ['title' => 'Senior Reporter', 'years' => 3, 'salary' => '$50,000 - $100,000'],
                    ['title' => 'Editor', 'years' => 7, 'salary' => '$70,000 - $120,000'],
                    ['title' => 'News Director', 'years' => 12, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'Executive Editor', 'years' => 15, 'salary' => '$110,000 - $200,000+']
                ],
                'match_archetypes' => ['SO-ME', 'GL-DM', 'EX-PL']
            ],
            [
                'title' => 'Teacher',
                'description' => 'Educate students in a variety of subjects and grade levels',
                'salary_range' => '$45,000 - $95,000',
                'growth_rate' => '4%',
                'education' => 'Bachelor\'s or Master\'s in Education',
                'skills' => ['Curriculum Development', 'Classroom Management', 'Assessment', 'Communication', 'Adaptability'],
                'future_paths' => [
                    ['title' => 'Senior Teacher', 'years' => 5, 'salary' => '$55,000 - $105,000'],
                    ['title' => 'Department Head', 'years' => 8, 'salary' => '$65,000 - $115,000'],
                    ['title' => 'Principal', 'years' => 12, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Education Director', 'years' => 15, 'salary' => '$110,000 - $160,000+']
                ],
                'match_archetypes' => ['SO-ED', 'SO-ME', 'HE-MD']
            ],
            [
                'title' => 'Physician',
                'description' => 'Diagnose and treat injuries and illnesses in patients',
                'salary_range' => '$200,000 - $400,000',
                'growth_rate' => '3%',
                'education' => 'MD or DO degree plus residency',
                'skills' => ['Patient Care', 'Diagnosis', 'Treatment Planning', 'Medical Knowledge', 'Communication'],
                'future_paths' => [
                    ['title' => 'Senior Physician', 'years' => 5, 'salary' => '$250,000 - $450,000'],
                    ['title' => 'Chief of Service', 'years' => 10, 'salary' => '$300,000 - $500,000'],
                    ['title' => 'Hospital Director', 'years' => 15, 'salary' => '$350,000 - $600,000'],
                    ['title' => 'Chief Medical Officer', 'years' => 20, 'salary' => '$400,000 - $800,000+']
                ],
                'match_archetypes' => ['HE-MD', 'SO-ED', 'HE-BT']
            ],
            [
                'title' => 'Biotechnologist',
                'description' => 'Apply biological systems and organisms to develop products and technologies',
                'salary_range' => '$70,000 - $140,000',
                'growth_rate' => '5%',
                'education' => 'Bachelor\'s or Master\'s in Biotechnology',
                'skills' => ['Laboratory Techniques', 'Molecular Biology', 'Data Analysis', 'Research', 'Documentation'],
                'future_paths' => [
                    ['title' => 'Senior Biotechnologist', 'years' => 4, 'salary' => '$90,000 - $160,000'],
                    ['title' => 'Research Team Lead', 'years' => 8, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Biotech R&D Director', 'years' => 12, 'salary' => '$140,000 - $220,000'],
                    ['title' => 'Chief Scientific Officer', 'years' => 16, 'salary' => '$180,000 - $300,000+']
                ],
                'match_archetypes' => ['HE-BT', 'AN-VS', 'HE-MD']
            ],
            [
                'title' => 'Architect',
                'description' => 'Design buildings and other structures, considering aesthetics, safety, and functionality',
                'salary_range' => '$70,000 - $130,000',
                'growth_rate' => '3%',
                'education' => 'Master\'s in Architecture',
                'skills' => ['Architectural Design', 'CAD', 'Building Codes', 'Project Management', '3D Modeling'],
                'future_paths' => [
                    ['title' => 'Senior Architect', 'years' => 5, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'Project Manager', 'years' => 8, 'salary' => '$110,000 - $170,000'],
                    ['title' => 'Design Director', 'years' => 12, 'salary' => '$130,000 - $200,000'],
                    ['title' => 'Principal Architect', 'years' => 15, 'salary' => '$150,000 - $250,000+']
                ],
                'match_archetypes' => ['AR-DS', 'AR-FM', 'AN-EN']
            ],
            [
                'title' => 'Fine Artist',
                'description' => 'Create original artwork using various techniques and media',
                'salary_range' => 'Variable ($20,000 - $100,000+)',
                'growth_rate' => '4%',
                'education' => 'Bachelor\'s in Fine Arts (optional)',
                'skills' => ['Visual Composition', 'Medium Expertise', 'Color Theory', 'Conceptual Thinking', 'Art History'],
                'future_paths' => [
                    ['title' => 'Established Artist', 'years' => 5, 'salary' => '$40,000 - $120,000'],
                    ['title' => 'Gallery Artist', 'years' => 8, 'salary' => '$60,000 - $150,000'],
                    ['title' => 'Art Director', 'years' => 10, 'salary' => '$80,000 - $180,000'],
                    ['title' => 'Master Artist', 'years' => 15, 'salary' => '$100,000 - $250,000+']
                ],
                'match_archetypes' => ['AR-FM', 'AR-DS', 'SO-ME']
            ],
            [
                'title' => 'Diplomat',
                'description' => 'Represent your country abroad and promote international relations',
                'salary_range' => '$55,000 - $170,000',
                'growth_rate' => '2%',
                'education' => 'Master\'s in International Relations or Political Science',
                'skills' => ['Negotiation', 'Foreign Languages', 'Cultural Sensitivity', 'Policy Analysis', 'Communication'],
                'future_paths' => [
                    ['title' => 'Second Secretary', 'years' => 5, 'salary' => '$70,000 - $120,000'],
                    ['title' => 'First Secretary', 'years' => 8, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Ambassador', 'years' => 15, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Foreign Service Director', 'years' => 20, 'salary' => '$150,000 - $200,000+']
                ],
                'match_archetypes' => ['GL-DM', 'EX-PL', 'SO-ME']
            ],
            [
                'title' => 'Tourism Manager',
                'description' => 'Plan, organize, and promote tourism activities and destinations',
                'salary_range' => '$50,000 - $100,000',
                'growth_rate' => '8%',
                'education' => 'Bachelor\'s in Tourism, Hospitality, or Business',
                'skills' => ['Customer Service', 'Event Planning', 'Marketing', 'Cultural Knowledge', 'Foreign Languages'],
                'future_paths' => [
                    ['title' => 'Senior Tourism Manager', 'years' => 4, 'salary' => '$70,000 - $120,000'],
                    ['title' => 'Tourism Director', 'years' => 8, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Destination Marketing Executive', 'years' => 12, 'salary' => '$110,000 - $160,000'],
                    ['title' => 'Tourism Board CEO', 'years' => 15, 'salary' => '$130,000 - $200,000+']
                ],
                'match_archetypes' => ['GL-TR', 'SO-ME', 'EX-BU']
            ],
            [
                'title' => 'Sports Coach',
                'description' => 'Train and instruct athletes in various sports and competitions',
                'salary_range' => '$35,000 - $100,000+',
                'growth_rate' => '12%',
                'education' => 'Bachelor\'s in Sports Science or Physical Education',
                'skills' => ['Training Techniques', 'Performance Analysis', 'Leadership', 'Strategy', 'Motivation'],
                'future_paths' => [
                    ['title' => 'Head Coach', 'years' => 5, 'salary' => '$60,000 - $150,000'],
                    ['title' => 'Athletic Director', 'years' => 10, 'salary' => '$80,000 - $180,000'],
                    ['title' => 'Professional Team Coach', 'years' => 15, 'salary' => '$100,000 - $5,000,000+'],
                    ['title' => 'National Team Coach', 'years' => 20, 'salary' => '$150,000 - $10,000,000+']
                ],
                'match_archetypes' => ['SP-AT', 'SO-ED', 'SP-EC']
            ],
            [
                'title' => 'Environmental Scientist',
                'description' => 'Study environmental problems and develop solutions to protect the environment',
                'salary_range' => '$55,000 - $110,000',
                'growth_rate' => '8%',
                'education' => 'Bachelor\'s or Master\'s in Environmental Science',
                'skills' => ['Field Research', 'Data Analysis', 'Environmental Policy', 'GIS', 'Scientific Writing'],
                'future_paths' => [
                    ['title' => 'Senior Environmental Scientist', 'years' => 5, 'salary' => '$75,000 - $130,000'],
                    ['title' => 'Environmental Program Manager', 'years' => 8, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'Sustainability Director', 'years' => 12, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Chief Sustainability Officer', 'years' => 15, 'salary' => '$130,000 - $220,000+']
                ],
                'match_archetypes' => ['SP-EC', 'AN-VS', 'GL-DM']
            ],
            [
                'title' => 'Renewable Energy Engineer',
                'description' => 'Design and develop renewable energy systems and technologies',
                'salary_range' => '$70,000 - $140,000',
                'growth_rate' => '10%',
                'education' => 'Bachelor\'s or Master\'s in Engineering',
                'skills' => ['Energy Systems', 'Electrical Engineering', 'Project Management', 'Technical Design', 'Sustainability'],
                'future_paths' => [
                    ['title' => 'Senior Energy Engineer', 'years' => 5, 'salary' => '$90,000 - $160,000'],
                    ['title' => 'Renewable Energy Project Manager', 'years' => 8, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Energy Systems Director', 'years' => 12, 'salary' => '$130,000 - $200,000'],
                    ['title' => 'Chief Technology Officer', 'years' => 15, 'salary' => '$150,000 - $250,000+']
                ],
                'match_archetypes' => ['SP-EC', 'AN-EN', 'AN-VS']
            ],
            [
                'title' => 'AI Ethics Researcher',
                'description' => 'Develop ethical frameworks and guidelines for artificial intelligence development',
                'salary_range' => '$90,000 - $180,000',
                'growth_rate' => '15%',
                'education' => 'PhD in Computer Science, Philosophy, or Ethics',
                'skills' => ['AI Systems', 'Ethics', 'Policy Development', 'Research', 'Communication'],
                'future_paths' => [
                    ['title' => 'Senior Ethics Researcher', 'years' => 4, 'salary' => '$110,000 - $200,000'],
                    ['title' => 'Ethics Team Lead', 'years' => 7, 'salary' => '$130,000 - $220,000'],
                    ['title' => 'AI Policy Director', 'years' => 10, 'salary' => '$150,000 - $250,000'],
                    ['title' => 'Chief Ethics Officer', 'years' => 15, 'salary' => '$180,000 - $300,000+']
                ],
                'match_archetypes' => ['DI-CS', 'EX-PL', 'SP-EC']
            ],
            [
                'title' => 'Cybersecurity Analyst',
                'description' => 'Protect computer systems and networks from information disclosure, theft, and damage',
                'salary_range' => '$75,000 - $150,000',
                'growth_rate' => '35%',
                'education' => 'Bachelor\'s in Cybersecurity, Computer Science, or related field',
                'skills' => ['Network Security', 'Penetration Testing', 'Threat Analysis', 'Encryption', 'Security Auditing'],
                'future_paths' => [
                    ['title' => 'Security Engineer', 'years' => 3, 'salary' => '$90,000 - $160,000'],
                    ['title' => 'Security Architect', 'years' => 5, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Chief Information Security Officer', 'years' => 10, 'salary' => '$150,000 - $250,000'],
                    ['title' => 'Security Consultant', 'years' => 8, 'salary' => '$130,000 - $200,000']
                ],
                'match_archetypes' => ['DI-CS', 'AN-VS', 'GL-DM']
            ],
            [
                'title' => 'Clinical Psychologist',
                'description' => 'Diagnose and treat mental, emotional, and behavioral disorders',
                'salary_range' => '$70,000 - $130,000',
                'growth_rate' => '14%',
                'education' => 'Doctorate in Psychology (PhD or PsyD)',
                'skills' => ['Psychological Assessment', 'Therapy', 'Research Methods', 'Clinical Interviewing', 'Mental Health'],
                'future_paths' => [
                    ['title' => 'Senior Psychologist', 'years' => 5, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'Clinical Director', 'years' => 10, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Private Practice Owner', 'years' => 8, 'salary' => '$100,000 - $200,000'],
                    ['title' => 'Research Director', 'years' => 12, 'salary' => '$130,000 - $190,000']
                ],
                'match_archetypes' => ['HE-MD', 'SO-ME', 'SO-ED']
            ],
            [
                'title' => 'Product Manager',
                'description' => 'Develop and manage products throughout their lifecycle',
                'salary_range' => '$80,000 - $160,000',
                'growth_rate' => '10%',
                'education' => 'Bachelor\'s or Master\'s in Business, Computer Science, or Engineering',
                'skills' => ['Product Strategy', 'UX Design', 'Market Analysis', 'Agile Methodology', 'Stakeholder Management'],
                'future_paths' => [
                    ['title' => 'Senior Product Manager', 'years' => 3, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Director of Product', 'years' => 6, 'salary' => '$140,000 - $220,000'],
                    ['title' => 'VP of Product', 'years' => 10, 'salary' => '$170,000 - $250,000'],
                    ['title' => 'Chief Product Officer', 'years' => 15, 'salary' => '$200,000 - $300,000+']
                ],
                'match_archetypes' => ['EX-BU', 'AR-DS', 'DI-CD']
            ],
            [
                'title' => 'Human Resources Manager',
                'description' => 'Oversee recruiting, hiring, and employee relations within an organization',
                'salary_range' => '$65,000 - $130,000',
                'growth_rate' => '7%',
                'education' => 'Bachelor\'s in Human Resources, Business, or related field',
                'skills' => ['Recruitment', 'Employee Relations', 'Benefits Administration', 'Conflict Resolution', 'Employment Law'],
                'future_paths' => [
                    ['title' => 'HR Director', 'years' => 5, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'VP of Human Resources', 'years' => 10, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Chief People Officer', 'years' => 15, 'salary' => '$150,000 - $250,000'],
                    ['title' => 'HR Consultant', 'years' => 8, 'salary' => '$100,000 - $170,000']
                ],
                'match_archetypes' => ['SO-ME', 'EX-BU', 'GL-DM']
            ],
            [
                'title' => 'Civil Engineer',
                'description' => 'Design, construct, and maintain infrastructure like roads, bridges, and buildings',
                'salary_range' => '$70,000 - $140,000',
                'growth_rate' => '6%',
                'education' => 'Bachelor\'s in Civil Engineering',
                'skills' => ['Structural Analysis', 'AutoCAD', 'Project Management', 'Building Codes', 'Material Science'],
                'future_paths' => [
                    ['title' => 'Senior Civil Engineer', 'years' => 5, 'salary' => '$90,000 - $160,000'],
                    ['title' => 'Project Manager', 'years' => 8, 'salary' => '$110,000 - $170,000'],
                    ['title' => 'Engineering Director', 'years' => 12, 'salary' => '$130,000 - $190,000'],
                    ['title' => 'Principal Engineer', 'years' => 15, 'salary' => '$150,000 - $220,000']
                ],
                'match_archetypes' => ['AN-EN', 'SP-EC', 'AR-DS']
            ],
            [
                'title' => 'Graphic Designer',
                'description' => 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers',
                'salary_range' => '$45,000 - $90,000',
                'growth_rate' => '3%',
                'education' => 'Bachelor\'s in Graphic Design or Fine Arts',
                'skills' => ['Adobe Creative Suite', 'Typography', 'Visual Design', 'Branding', 'Layout Design'],
                'future_paths' => [
                    ['title' => 'Senior Graphic Designer', 'years' => 4, 'salary' => '$65,000 - $100,000'],
                    ['title' => 'Art Director', 'years' => 8, 'salary' => '$80,000 - $120,000'],
                    ['title' => 'Creative Director', 'years' => 12, 'salary' => '$100,000 - $150,000'],
                    ['title' => 'Design Agency Owner', 'years' => 15, 'salary' => '$120,000 - $200,000']
                ],
                'match_archetypes' => ['AR-DS', 'AR-FM', 'SO-ME']
            ],
            [
                'title' => 'Nurse Practitioner',
                'description' => 'Provide advanced primary, acute, and specialty healthcare services',
                'salary_range' => '$90,000 - $130,000',
                'growth_rate' => '45%',
                'education' => 'Master\'s in Nursing plus certification',
                'skills' => ['Patient Assessment', 'Diagnosis', 'Treatment Planning', 'Prescribing Medication', 'Patient Education'],
                'future_paths' => [
                    ['title' => 'Specialized NP', 'years' => 3, 'salary' => '$100,000 - $140,000'],
                    ['title' => 'Nurse Manager', 'years' => 5, 'salary' => '$110,000 - $150,000'],
                    ['title' => 'Director of Nursing', 'years' => 10, 'salary' => '$120,000 - $170,000'],
                    ['title' => 'Chief Nursing Officer', 'years' => 15, 'salary' => '$140,000 - $200,000']
                ],
                'match_archetypes' => ['HE-MD', 'SO-ED', 'HE-BT']
            ],
            [
                'title' => 'Supply Chain Manager',
                'description' => 'Oversee and coordinate all supply chain activities from procurement to delivery',
                'salary_range' => '$75,000 - $130,000',
                'growth_rate' => '7%',
                'education' => 'Bachelor\'s in Supply Chain Management, Business, or Engineering',
                'skills' => ['Logistics', 'Procurement', 'Inventory Management', 'Data Analysis', 'Process Optimization'],
                'future_paths' => [
                    ['title' => 'Senior Supply Chain Manager', 'years' => 5, 'salary' => '$95,000 - $150,000'],
                    ['title' => 'Director of Supply Chain', 'years' => 8, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'VP of Operations', 'years' => 12, 'salary' => '$150,000 - $220,000'],
                    ['title' => 'Chief Operations Officer', 'years' => 15, 'salary' => '$180,000 - $300,000']
                ],
                'match_archetypes' => ['EX-BU', 'AN-VS', 'GL-DM']
            ],
            [
                'title' => 'Web Developer',
                'description' => 'Create and maintain websites and web applications',
                'salary_range' => '$60,000 - $120,000',
                'growth_rate' => '13%',
                'education' => 'Bachelor\'s in Computer Science or self-taught with portfolio',
                'skills' => ['HTML/CSS', 'JavaScript', 'Backend Programming', 'Responsive Design', 'Version Control'],
                'future_paths' => [
                    ['title' => 'Senior Web Developer', 'years' => 3, 'salary' => '$80,000 - $140,000'],
                    ['title' => 'Lead Developer', 'years' => 6, 'salary' => '$100,000 - $160,000'],
                    ['title' => 'Development Manager', 'years' => 10, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'CTO', 'years' => 15, 'salary' => '$150,000 - $250,000']
                ],
                'match_archetypes' => ['DI-CS', 'AR-DS', 'DI-CD']
            ],
            [
                'title' => 'Veterinarian',
                'description' => 'Diagnose and treat diseases and injuries in animals',
                'salary_range' => '$75,000 - $120,000',
                'growth_rate' => '17%',
                'education' => 'Doctor of Veterinary Medicine (DVM)',
                'skills' => ['Animal Medicine', 'Surgery', 'Diagnosis', 'Animal Behavior', 'Client Communication'],
                'future_paths' => [
                    ['title' => 'Specialized Veterinarian', 'years' => 4, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Practice Owner', 'years' => 8, 'salary' => '$100,000 - $200,000'],
                    ['title' => 'Veterinary Director', 'years' => 12, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Chief Medical Officer', 'years' => 15, 'salary' => '$140,000 - $220,000']
                ],
                'match_archetypes' => ['HE-MD', 'SP-EC', 'HE-BT']
            ],
            [
                'title' => 'Investment Banker',
                'description' => 'Help companies and governments raise capital and complete financial transactions',
                'salary_range' => '$100,000 - $250,000+',
                'growth_rate' => '5%',
                'education' => 'Bachelor\'s in Finance, Economics, or Business',
                'skills' => ['Financial Modeling', 'Valuation', 'Deal Structuring', 'Client Management', 'Market Analysis'],
                'future_paths' => [
                    ['title' => 'Associate', 'years' => 2, 'salary' => '$150,000 - $300,000'],
                    ['title' => 'Vice President', 'years' => 5, 'salary' => '$250,000 - $500,000'],
                    ['title' => 'Director', 'years' => 8, 'salary' => '$400,000 - $800,000'],
                    ['title' => 'Managing Director', 'years' => 12, 'salary' => '$500,000 - $2,000,000+']
                ],
                'match_archetypes' => ['EX-BU', 'DI-CD', 'GL-DM']
            ],
            [
                'title' => 'Public Relations Specialist',
                'description' => 'Create and maintain a favorable public image for organizations or individuals',
                'salary_range' => '$50,000 - $100,000',
                'growth_rate' => '7%',
                'education' => 'Bachelor\'s in Public Relations, Communications, or Journalism',
                'skills' => ['Media Relations', 'Writing', 'Crisis Management', 'Event Planning', 'Social Media'],
                'future_paths' => [
                    ['title' => 'PR Manager', 'years' => 4, 'salary' => '$70,000 - $120,000'],
                    ['title' => 'PR Director', 'years' => 8, 'salary' => '$90,000 - $150,000'],
                    ['title' => 'VP of Communications', 'years' => 12, 'salary' => '$120,000 - $180,000'],
                    ['title' => 'Chief Communications Officer', 'years' => 15, 'salary' => '$150,000 - $250,000']
                ],
                'match_archetypes' => ['SO-ME', 'EX-PL', 'GL-TR']
            ],
            [
                'title' => 'Aerospace Engineer',
                'description' => 'Design aircraft, spacecraft, satellites, and missiles',
                'salary_range' => '$80,000 - $150,000',
                'growth_rate' => '3%',
                'education' => 'Bachelor\'s in Aerospace Engineering',
                'skills' => ['Aerodynamics', 'Propulsion', 'Materials Science', 'Systems Engineering', 'CAD/CAM'],
                'future_paths' => [
                    ['title' => 'Senior Aerospace Engineer', 'years' => 5, 'salary' => '$100,000 - $170,000'],
                    ['title' => 'Lead Engineer', 'years' => 8, 'salary' => '$120,000 - $190,000'],
                    ['title' => 'Engineering Manager', 'years' => 12, 'salary' => '$140,000 - $210,000'],
                    ['title' => 'Technical Director', 'years' => 15, 'salary' => '$160,000 - $250,000']
                ],
                'match_archetypes' => ['AN-EN', 'DI-CS', 'AN-VS']
            ],
            [
                'title' => 'Pharmacist',
                'description' => 'Dispense medications and provide drug-related information to patients and healthcare professionals',
                'salary_range' => '$110,000 - $150,000',
                'growth_rate' => '2%',
                'education' => 'Doctor of Pharmacy (PharmD)',
                'skills' => ['Pharmacology', 'Patient Counseling', 'Medication Management', 'Health Assessment', 'Compounding'],
                'future_paths' => [
                    ['title' => 'Clinical Pharmacist', 'years' => 3, 'salary' => '$120,000 - $160,000'],
                    ['title' => 'Pharmacy Manager', 'years' => 5, 'salary' => '$130,000 - $170,000'],
                    ['title' => 'Director of Pharmacy', 'years' => 10, 'salary' => '$140,000 - $190,000'],
                    ['title' => 'Chief Pharmacy Officer', 'years' => 15, 'salary' => '$160,000 - $220,000']
                ],
                'match_archetypes' => ['HE-MD', 'HE-BT', 'SO-ED']
            ],
            [
                'title' => 'Speech-Language Pathologist',
                'description' => 'Assess, diagnose, and treat communication and swallowing disorders',
                'salary_range' => '$65,000 - $95,000',
                'growth_rate' => '29%',
                'education' => 'Master\'s in Speech-Language Pathology',
                'skills' => ['Speech Therapy', 'Assessment', 'Treatment Planning', 'Documentation', 'Patient Care'],
                'future_paths' => [
                    ['title' => 'Senior SLP', 'years' => 5, 'salary' => '$80,000 - $110,000'],
                    ['title' => 'Clinical Supervisor', 'years' => 8, 'salary' => '$90,000 - $120,000'],
                    ['title' => 'Clinical Director', 'years' => 12, 'salary' => '$100,000 - $140,000'],
                    ['title' => 'Private Practice Owner', 'years' => 10, 'salary' => '$120,000 - $200,000']
                ],
                'match_archetypes' => ['HE-MD', 'SO-ED', 'SO-ME']
            ],
            [
                'title' => 'Ethical Hacker',
                'description' => 'Test computer systems and networks to identify security vulnerabilities',
                'salary_range' => '$80,000 - $160,000',
                'growth_rate' => '32%',
                'education' => 'Bachelor\'s in Computer Science or Cybersecurity',
                'skills' => ['Penetration Testing', 'Network Security', 'Programming', 'Vulnerability Assessment', 'System Architecture'],
                'future_paths' => [
                    ['title' => 'Senior Security Consultant', 'years' => 4, 'salary' => '$100,000 - $180,000'],
                    ['title' => 'Security Team Lead', 'years' => 7, 'salary' => '$120,000 - $200,000'],
                    ['title' => 'Security Director', 'years' => 10, 'salary' => '$140,000 - $220,000'],
                    ['title' => 'Chief Information Security Officer', 'years' => 15, 'salary' => '$180,000 - $300,000']
                ],
                'match_archetypes' => ['DI-CS', 'AN-VS', 'GL-DM']
            ],
            [
                'title' => 'Urban Planner',
                'description' => 'Develop land use plans and programs for urban and regional areas',
                'salary_range' => '$60,000 - $100,000',
                'growth_rate' => '11%',
                'education' => 'Master\'s in Urban Planning or Urban Design',
                'skills' => ['Land Use Planning', 'GIS', 'Public Policy', 'Community Engagement', 'Zoning'],
                'future_paths' => [
                    ['title' => 'Senior Urban Planner', 'years' => 5, 'salary' => '$80,000 - $120,000'],
                    ['title' => 'Planning Manager', 'years' => 8, 'salary' => '$100,000 - $140,000'],
                    ['title' => 'Planning Director', 'years' => 12, 'salary' => '$120,000 - $170,000'],
                    ['title' => 'City Manager', 'years' => 15, 'salary' => '$150,000 - $220,000']
                ],
                'match_archetypes' => ['SP-EC', 'GL-DM', 'AR-DS']
            ],
            [
                'title' => 'Social Media Manager',
                'description' => 'Create and maintain a company\'s presence on social media platforms',
                'salary_range' => '$50,000 - $90,000',
                'growth_rate' => '13%',
                'education' => 'Bachelor\'s in Marketing, Communications, or related field',
                'skills' => ['Content Creation', 'Community Management', 'Analytics', 'Copywriting', 'Digital Marketing'],
                'future_paths' => [
                    ['title' => 'Social Media Director', 'years' => 4, 'salary' => '$70,000 - $110,000'],
                    ['title' => 'Digital Marketing Manager', 'years' => 6, 'salary' => '$90,000 - $130,000'],
                    ['title' => 'Brand Director', 'years' => 10, 'salary' => '$110,000 - $160,000'],
                    ['title' => 'VP of Digital Strategy', 'years' => 15, 'salary' => '$140,000 - $200,000']
                ],
                'match_archetypes' => ['SO-ME', 'AR-DS', 'EX-BU']
            ],
            [
                'title' => 'Physical Therapist',
                'description' => 'Help injured or ill people improve movement and manage pain',
                'salary_range' => '$75,000 - $110,000',
                'growth_rate' => '22%',
                'education' => 'Doctor of Physical Therapy (DPT)',
                'skills' => ['Manual Therapy', 'Exercise Prescription', 'Patient Assessment', 'Treatment Planning', 'Rehabilitation'],
                'future_paths' => [
                    ['title' => 'Senior Physical Therapist', 'years' => 4, 'salary' => '$90,000 - $125,000'],
                    ['title' => 'Clinic Director', 'years' => 8, 'salary' => '$100,000 - $140,000'],
                    ['title' => 'Rehabilitation Director', 'years' => 12, 'salary' => '$120,000 - $160,000'],
                    ['title' => 'Private Practice Owner', 'years' => 10, 'salary' => '$150,000 - $250,000']
                ],
                'match_archetypes' => ['HE-MD', 'SP-AT', 'SO-ED']
            ],
            [
                'title' => 'Technical Writer',
                'description' => 'Create instruction manuals, how-to guides, and technical documentation',
                'salary_range' => '$55,000 - $95,000',
                'growth_rate' => '12%',
                'education' => 'Bachelor\'s in English, Communications, or Technical field',
                'skills' => ['Technical Writing', 'Documentation', 'Research', 'Information Architecture', 'Editing'],
                'future_paths' => [
                    ['title' => 'Senior Technical Writer', 'years' => 4, 'salary' => '$70,000 - $110,000'],
                    ['title' => 'Documentation Manager', 'years' => 8, 'salary' => '$90,000 - $130,000'],
                    ['title' => 'Content Director', 'years' => 12, 'salary' => '$110,000 - $150,000'],
                    ['title' => 'Knowledge Management Director', 'years' => 15, 'salary' => '$130,000 - $170,000']
                ],
                'match_archetypes' => ['DI-CS', 'SO-ED', 'AR-DS']
            ],
            [
                'title' => 'Agricultural Scientist',
                'description' => 'Research ways to improve agriculture and food production',
                'salary_range' => '$60,000 - $100,000',
                'growth_rate' => '7%',
                'education' => 'Bachelor\'s or Master\'s in Agricultural Science',
                'skills' => ['Crop Science', 'Soil Analysis', 'Research Methods', 'Data Analysis', 'Sustainable Practices'],
                'future_paths' => [
                    ['title' => 'Senior Agricultural Scientist', 'years' => 5, 'salary' => '$80,000 - $120,000'],
                    ['title' => 'Research Team Lead', 'years' => 8, 'salary' => '$100,000 - $140,000'],
                    ['title' => 'Agricultural Research Director', 'years' => 12, 'salary' => '$120,000 - $160,000'],
                    ['title' => 'Chief Agricultural Officer', 'years' => 15, 'salary' => '$140,000 - $190,000']
                ],
                'match_archetypes' => ['SP-EC', 'AN-VS', 'HE-BT']
            ],
            [
                'title' => 'Actuary',
                'description' => 'Analyze financial costs of risk and uncertainty using mathematics and statistics',
                'salary_range' => '$80,000 - $150,000',
                'growth_rate' => '24%',
                'education' => 'Bachelor\'s in Actuarial Science, Mathematics, or Statistics',
                'skills' => ['Statistical Analysis', 'Risk Assessment', 'Financial Modeling', 'Probability', 'Business Acumen'],
                'future_paths' => [
                    ['title' => 'Senior Actuary', 'years' => 5, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Actuarial Manager', 'years' => 8, 'salary' => '$140,000 - $210,000'],
                    ['title' => 'Chief Actuary', 'years' => 12, 'salary' => '$170,000 - $250,000'],
                    ['title' => 'Insurance Executive', 'years' => 15, 'salary' => '$200,000 - $400,000']
                ],
                'match_archetypes' => ['AN-VS', 'DI-CD', 'EX-BU']
            ],
            [
                'title' => 'Event Planner',
                'description' => 'Coordinate and organize professional meetings, conventions, and special events',
                'salary_range' => '$45,000 - $85,000',
                'growth_rate' => '8%',
                'education' => 'Bachelor\'s in Hospitality, Business, or related field',
                'skills' => ['Event Coordination', 'Budgeting', 'Negotiation', 'Vendor Management', 'Customer Service'],
                'future_paths' => [
                    ['title' => 'Senior Event Planner', 'years' => 4, 'salary' => '$65,000 - $100,000'],
                    ['title' => 'Event Director', 'years' => 8, 'salary' => '$80,000 - $120,000'],
                    ['title' => 'Director of Events', 'years' => 12, 'salary' => '$100,000 - $150,000'],
                    ['title' => 'Event Agency Owner', 'years' => 10, 'salary' => '$120,000 - $200,000+']
                ],
                'match_archetypes' => ['GL-TR', 'EX-PL', 'SO-ME']
            ],
            [
                'title' => 'Interior Designer',
                'description' => 'Plan and design functional and beautiful interior spaces',
                'salary_range' => '$50,000 - $95,000',
                'growth_rate' => '5%',
                'education' => 'Bachelor\'s in Interior Design or related field',
                'skills' => ['Space Planning', 'CAD Software', 'Color Theory', 'Material Selection', 'Client Management'],
                'future_paths' => [
                    ['title' => 'Senior Interior Designer', 'years' => 5, 'salary' => '$70,000 - $110,000'],
                    ['title' => 'Design Director', 'years' => 8, 'salary' => '$90,000 - $130,000'],
                    ['title' => 'Design Firm Partner', 'years' => 12, 'salary' => '$110,000 - $160,000'],
                    ['title' => 'Design Firm Owner', 'years' => 10, 'salary' => '$120,000 - $200,000+']
                ],
                'match_archetypes' => ['AR-DS', 'AR-FM', 'GL-TR']
            ],
            [
                'title' => 'Chef/Culinary Artist',
                'description' => 'Create dishes and menus, and oversee food preparation in restaurants',
                'salary_range' => '$45,000 - $90,000',
                'growth_rate' => '6%',
                'education' => 'Culinary school or apprenticeship',
                'skills' => ['Cooking Techniques', 'Menu Development', 'Food Presentation', 'Kitchen Management', 'Food Safety'],
                'future_paths' => [
                    ['title' => 'Executive Chef', 'years' => 5, 'salary' => '$70,000 - $120,000'],
                    ['title' => 'Culinary Director', 'years' => 8, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Restaurant Owner', 'years' => 10, 'salary' => '$100,000 - $200,000+'],
                    ['title' => 'Celebrity Chef', 'years' => 15, 'salary' => '$150,000 - $1,000,000+']
                ],
                'match_archetypes' => ['AR-FM', 'AR-DS', 'EX-BU']
            ],
            [
                'title' => 'Film Director',
                'description' => 'Direct and oversee the production of films, television shows, or other visual media',
                'salary_range' => 'Variable ($50,000 - $500,000+)',
                'growth_rate' => '10%',
                'education' => 'Bachelor\'s in Film or related field (optional)',
                'skills' => ['Visual Storytelling', 'Script Analysis', 'Camera Work', 'Actor Direction', 'Production Management'],
                'future_paths' => [
                    ['title' => 'Established Director', 'years' => 5, 'salary' => '$100,000 - $300,000'],
                    ['title' => 'Award-Winning Director', 'years' => 10, 'salary' => '$200,000 - $500,000'],
                    ['title' => 'Studio Director', 'years' => 15, 'salary' => '$300,000 - $1,000,000+'],
                    ['title' => 'Production Company Owner', 'years' => 12, 'salary' => '$250,000 - $2,000,000+']
                ],
                'match_archetypes' => ['AR-FM', 'EX-PL', 'SO-ME']
            ],
            [
                'title' => 'Blockchain Developer',
                'description' => 'Design and implement blockchain technology and smart contracts',
                'salary_range' => '$90,000 - $170,000',
                'growth_rate' => '30%',
                'education' => 'Bachelor\'s in Computer Science or related field',
                'skills' => ['Blockchain Protocols', 'Smart Contracts', 'Cryptography', 'Programming Languages', 'Distributed Systems'],
                'future_paths' => [
                    ['title' => 'Senior Blockchain Developer', 'years' => 3, 'salary' => '$120,000 - $200,000'],
                    ['title' => 'Blockchain Architect', 'years' => 5, 'salary' => '$150,000 - $230,000'],
                    ['title' => 'Chief Blockchain Officer', 'years' => 8, 'salary' => '$180,000 - $270,000'],
                    ['title' => 'Blockchain Startup Founder', 'years' => 5, 'salary' => '$200,000 - $1,000,000+']
                ],
                'match_archetypes' => ['DI-CS', 'DI-CD', 'AN-EN']
            ],
            [
                'title' => 'Music Producer',
                'description' => 'Oversee and manage the recording, production, and arrangement of music',
                'salary_range' => 'Variable ($40,000 - $300,000+)',
                'growth_rate' => '6%',
                'education' => 'Bachelor\'s in Music Production or related field (optional)',
                'skills' => ['Audio Engineering', 'Music Theory', 'DAW Software', 'Mixing and Mastering', 'Artist Development'],
                'future_paths' => [
                    ['title' => 'Established Producer', 'years' => 5, 'salary' => '$70,000 - $150,000'],
                    ['title' => 'Award-Winning Producer', 'years' => 8, 'salary' => '$100,000 - $300,000'],
                    ['title' => 'Production Company Owner', 'years' => 10, 'salary' => '$150,000 - $500,000+'],
                    ['title' => 'Record Label Executive', 'years' => 15, 'salary' => '$200,000 - $1,000,000+']
                ],
                'match_archetypes' => ['AR-FM', 'SO-ME', 'AR-DS']
            ],
            [
                'title' => 'Forensic Scientist',
                'description' => 'Analyze physical evidence from crime scenes to help solve crimes',
                'salary_range' => '$55,000 - $100,000',
                'growth_rate' => '16%',
                'education' => 'Bachelor\'s in Forensic Science or related field',
                'skills' => ['Laboratory Techniques', 'Evidence Collection', 'DNA Analysis', 'Toxicology', 'Report Writing'],
                'future_paths' => [
                    ['title' => 'Senior Forensic Scientist', 'years' => 5, 'salary' => '$75,000 - $120,000'],
                    ['title' => 'Forensic Lab Manager', 'years' => 8, 'salary' => '$90,000 - $140,000'],
                    ['title' => 'Forensic Lab Director', 'years' => 12, 'salary' => '$110,000 - $160,000'],
                    ['title' => 'Chief Forensic Scientist', 'years' => 15, 'salary' => '$130,000 - $180,000']
                ],
                'match_archetypes' => ['AN-VS', 'HE-BT', 'DI-CD']
            ],
            [
                'title' => 'Drone Pilot/UAV Operator',
                'description' => 'Operate unmanned aerial vehicles for various purposes like photography, surveying, or inspection',
                'salary_range' => '$50,000 - $90,000',
                'growth_rate' => '25%',
                'education' => 'FAA certification and technical training',
                'skills' => ['Drone Operation', 'Aerial Photography', 'Navigation', 'Regulations', 'Equipment Maintenance'],
                'future_paths' => [
                    ['title' => 'Senior UAV Operator', 'years' => 3, 'salary' => '$70,000 - $110,000'],
                    ['title' => 'UAV Operations Manager', 'years' => 5, 'salary' => '$90,000 - $130,000'],
                    ['title' => 'Drone Services Owner', 'years' => 8, 'salary' => '$100,000 - $200,000'],
                    ['title' => 'UAV Program Director', 'years' => 10, 'salary' => '$120,000 - $180,000']
                ],
                'match_archetypes' => ['AN-EN', 'AR-DS', 'SP-AT']
            ],
            [
                'title' => 'App Developer',
                'description' => 'Design, build, and maintain mobile applications for iOS and Android platforms',
                'salary_range' => '$70,000 - $140,000',
                'growth_rate' => '22%',
                'education' => 'Bachelor\'s in Computer Science or related field',
                'skills' => ['Mobile Development', 'UI/UX Design', 'API Integration', 'App Store Optimization', 'Testing'],
                'future_paths' => [
                    ['title' => 'Senior App Developer', 'years' => 3, 'salary' => '$90,000 - $160,000'],
                    ['title' => 'Mobile Development Lead', 'years' => 5, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'Mobile Development Manager', 'years' => 8, 'salary' => '$130,000 - $200,000'],
                    ['title' => 'Tech Startup Founder', 'years' => 5, 'salary' => '$150,000 - $500,000+']
                ],
                'match_archetypes' => ['DI-CS', 'AR-DS', 'DI-CD']
            ],
            [
                'title' => 'Augmented Reality Developer',
                'description' => 'Create interactive experiences that blend digital content with the real world',
                'salary_range' => '$85,000 - $160,000',
                'growth_rate' => '34%',
                'education' => 'Bachelor\'s in Computer Science or related field',
                'skills' => ['3D Modeling', 'Unity/Unreal Engine', 'AR Frameworks', 'Mobile Development', 'UX Design'],
                'future_paths' => [
                    ['title' => 'Senior AR Developer', 'years' => 3, 'salary' => '$110,000 - $180,000'],
                    ['title' => 'AR Team Lead', 'years' => 5, 'salary' => '$130,000 - $200,000'],
                    ['title' => 'AR/VR Director', 'years' => 8, 'salary' => '$150,000 - $230,000'],
                    ['title' => 'Immersive Technology CTO', 'years' => 12, 'salary' => '$180,000 - $300,000']
                ],
                'match_archetypes' => ['DI-CS', 'AR-DS', 'AR-FM']
            ],
        ];

        // Process and insert all career data
        foreach ($careers as $careerData) {
            // Extract associated data
            $skills = $careerData['skills'] ?? [];
            $futurePaths = $careerData['future_paths'] ?? [];
            $matchArchetypes = $careerData['match_archetypes'] ?? [];
            
            // Remove the associated data from the career array before creation
            unset($careerData['skills']);
            unset($careerData['future_paths']);
            unset($careerData['match_archetypes']);

            // Create the career
            $career = Career::create($careerData);
            
            // Add skills
            foreach ($skills as $skill) {
                CareerSkill::create([
                    'career_id' => $career->id,
                    'skill' => $skill,
                ]);
            }
            
            // Add future paths
            foreach ($futurePaths as $pathData) {
                $pathData['career_id'] = $career->id;
                CareerFuturePath::create($pathData);
            }
            
            // Add archetype associations
            foreach ($matchArchetypes as $archetype) {
                DB::table('career_archetype')->insert([
                    'career_id' => $career->id,
                    'archetype_code' => $archetype,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('Careers seeded successfully!');
    }
}
