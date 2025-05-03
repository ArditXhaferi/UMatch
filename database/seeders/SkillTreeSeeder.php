<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\SkillTree;
use Illuminate\Database\Seeder;

class SkillTreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define skill tree nodes and connections
        $nodes = [
            // Core skills
            ['id' => 'core', 'name' => 'Core Skills', 'level' => 0, 'x' => 1000, 'y' => 1000, 'color' => '#4ECDC4'],
            
            // Level 1 skill categories
            ['id' => 'tech', 'name' => 'Technical', 'level' => 1, 'x' => 700, 'y' => 600, 'color' => '#4ECDC4'],
            ['id' => 'biz', 'name' => 'Business', 'level' => 1, 'x' => 1300, 'y' => 600, 'color' => '#4ECDC4'],
            ['id' => 'creative', 'name' => 'Creative', 'level' => 1, 'x' => 500, 'y' => 1000, 'color' => '#4ECDC4'],
            ['id' => 'science', 'name' => 'Science', 'level' => 1, 'x' => 1500, 'y' => 1000, 'color' => '#4ECDC4'],
            ['id' => 'soft', 'name' => 'Soft Skills', 'level' => 1, 'x' => 1000, 'y' => 1400, 'color' => '#4ECDC4'],
            ['id' => 'healthcare', 'name' => 'Healthcare', 'level' => 1, 'x' => 1700, 'y' => 800, 'color' => '#4ECDC4'],
            ['id' => 'sports', 'name' => 'Sports', 'level' => 1, 'x' => 300, 'y' => 800, 'color' => '#4ECDC4'],
            
            // Level 2 skills
            ['id' => 'programming', 'name' => 'Programming', 'level' => 2, 'x' => 500, 'y' => 350, 'color' => '#4ECDC4'],
            ['id' => 'data', 'name' => 'Data Analysis', 'level' => 2, 'x' => 800, 'y' => 300, 'color' => '#4ECDC4'],
            ['id' => 'finance', 'name' => 'Finance', 'level' => 2, 'x' => 1100, 'y' => 300, 'color' => '#4ECDC4'],
            ['id' => 'marketing', 'name' => 'Marketing', 'level' => 2, 'x' => 1400, 'y' => 350, 'color' => '#4ECDC4'],
            ['id' => 'design', 'name' => 'Design', 'level' => 2, 'x' => 350, 'y' => 900, 'color' => '#4ECDC4'],
            ['id' => 'media', 'name' => 'Media Production', 'level' => 2, 'x' => 350, 'y' => 1100, 'color' => '#4ECDC4'],
            ['id' => 'biotech', 'name' => 'Biotechnology', 'level' => 2, 'x' => 1650, 'y' => 900, 'color' => '#4ECDC4'],
            ['id' => 'medical', 'name' => 'Medical Science', 'level' => 2, 'x' => 1650, 'y' => 1100, 'color' => '#4ECDC4'],
            ['id' => 'communication', 'name' => 'Communication', 'level' => 2, 'x' => 800, 'y' => 1550, 'color' => '#4ECDC4'],
            ['id' => 'leadership', 'name' => 'Leadership', 'level' => 2, 'x' => 1200, 'y' => 1550, 'color' => '#4ECDC4'],
            ['id' => 'security', 'name' => 'Security', 'level' => 2, 'x' => 650, 'y' => 450, 'color' => '#4ECDC4'],
            ['id' => 'engineering', 'name' => 'Engineering', 'level' => 2, 'x' => 900, 'y' => 450, 'color' => '#4ECDC4'],
            ['id' => 'business_admin', 'name' => 'Business Administration', 'level' => 2, 'x' => 1400, 'y' => 450, 'color' => '#4ECDC4'],
            ['id' => 'environmental', 'name' => 'Environmental Science', 'level' => 2, 'x' => 1400, 'y' => 900, 'color' => '#4ECDC4'],
            ['id' => 'athletics', 'name' => 'Athletics', 'level' => 2, 'x' => 200, 'y' => 700, 'color' => '#4ECDC4'],
            
            // Level 3 skills - existing
            ['id' => 'web', 'name' => 'Web Development', 'level' => 3, 'x' => 360, 'y' => 200, 'color' => '#eeeeee'],
            ['id' => 'mobile', 'name' => 'Mobile Development', 'level' => 3, 'x' => 600, 'y' => 160, 'color' => '#eeeeee'],
            ['id' => 'ml', 'name' => 'Machine Learning', 'level' => 3, 'x' => 840, 'y' => 140, 'color' => '#eeeeee'],
            ['id' => 'bi', 'name' => 'Business Intelligence', 'level' => 3, 'x' => 1160, 'y' => 140, 'color' => '#eeeeee'],
            ['id' => 'ui', 'name' => 'UI Design', 'level' => 3, 'x' => 280, 'y' => 760, 'color' => '#eeeeee'],
            ['id' => 'ux', 'name' => 'UX Design', 'level' => 3, 'x' => 200, 'y' => 900, 'color' => '#eeeeee'],
            
            // Level 3 skills - new programming links
            ['id' => 'blockchain', 'name' => 'Blockchain', 'level' => 3, 'x' => 440, 'y' => 240, 'color' => '#eeeeee'],
            ['id' => 'algorithms', 'name' => 'Algorithms', 'level' => 3, 'x' => 500, 'y' => 260, 'color' => '#eeeeee'],
            ['id' => 'data_structures', 'name' => 'Data Structures', 'level' => 3, 'x' => 560, 'y' => 220, 'color' => '#eeeeee'],
            ['id' => 'ar_vr', 'name' => 'AR/VR Development', 'level' => 3, 'x' => 640, 'y' => 200, 'color' => '#eeeeee'],
            
            // Level 3 skills - new data links
            ['id' => 'statistics', 'name' => 'Statistics', 'level' => 3, 'x' => 720, 'y' => 180, 'color' => '#eeeeee'],
            ['id' => 'data_viz', 'name' => 'Data Visualization', 'level' => 3, 'x' => 800, 'y' => 160, 'color' => '#eeeeee'],
            ['id' => 'big_data', 'name' => 'Big Data', 'level' => 3, 'x' => 900, 'y' => 180, 'color' => '#eeeeee'],
            
            // Level 3 skills - new security links
            ['id' => 'network_security', 'name' => 'Network Security', 'level' => 3, 'x' => 560, 'y' => 360, 'color' => '#eeeeee'],
            ['id' => 'pentest', 'name' => 'Penetration Testing', 'level' => 3, 'x' => 660, 'y' => 340, 'color' => '#eeeeee'],
            ['id' => 'crypto', 'name' => 'Cryptography', 'level' => 3, 'x' => 740, 'y' => 360, 'color' => '#eeeeee'],
            
            // Level 3 skills - new engineering links
            ['id' => 'mechanical', 'name' => 'Mechanical Engineering', 'level' => 3, 'x' => 840, 'y' => 380, 'color' => '#eeeeee'],
            ['id' => 'electrical', 'name' => 'Electrical Engineering', 'level' => 3, 'x' => 940, 'y' => 340, 'color' => '#eeeeee'],
            ['id' => 'civil', 'name' => 'Civil Engineering', 'level' => 3, 'x' => 1040, 'y' => 380, 'color' => '#eeeeee'],
            ['id' => 'aerospace', 'name' => 'Aerospace Engineering', 'level' => 3, 'x' => 960, 'y' => 420, 'color' => '#eeeeee'],
            
            // Level 3 skills - new finance links
            ['id' => 'financial_analysis', 'name' => 'Financial Analysis', 'level' => 3, 'x' => 1100, 'y' => 200, 'color' => '#eeeeee'],
            ['id' => 'investment', 'name' => 'Investment Banking', 'level' => 3, 'x' => 1200, 'y' => 160, 'color' => '#eeeeee'],
            ['id' => 'accounting', 'name' => 'Accounting', 'level' => 3, 'x' => 1300, 'y' => 200, 'color' => '#eeeeee'],
            ['id' => 'risk_assessment', 'name' => 'Risk Assessment', 'level' => 3, 'x' => 1240, 'y' => 240, 'color' => '#eeeeee'],
            
            // Level 3 skills - new marketing links
            ['id' => 'digital_marketing', 'name' => 'Digital Marketing', 'level' => 3, 'x' => 1400, 'y' => 280, 'color' => '#eeeeee'],
            ['id' => 'content_strategy', 'name' => 'Content Strategy', 'level' => 3, 'x' => 1500, 'y' => 240, 'color' => '#eeeeee'],
            ['id' => 'social_media', 'name' => 'Social Media Marketing', 'level' => 3, 'x' => 1600, 'y' => 280, 'color' => '#eeeeee'],
            ['id' => 'brand_management', 'name' => 'Brand Management', 'level' => 3, 'x' => 1560, 'y' => 320, 'color' => '#eeeeee'],
            
            // Level 3 skills - new business admin links
            ['id' => 'project_management', 'name' => 'Project Management', 'level' => 3, 'x' => 1320, 'y' => 380, 'color' => '#eeeeee'],
            ['id' => 'hr_management', 'name' => 'HR Management', 'level' => 3, 'x' => 1400, 'y' => 340, 'color' => '#eeeeee'],
            ['id' => 'supply_chain', 'name' => 'Supply Chain Management', 'level' => 3, 'x' => 1480, 'y' => 380, 'color' => '#eeeeee'],
            ['id' => 'entrepreneurship', 'name' => 'Entrepreneurship', 'level' => 3, 'x' => 1440, 'y' => 420, 'color' => '#eeeeee'],
            
            // Level 3 skills - new design links
            ['id' => 'graphic_design', 'name' => 'Graphic Design', 'level' => 3, 'x' => 240, 'y' => 780, 'color' => '#eeeeee'],
            ['id' => 'product_design', 'name' => 'Product Design', 'level' => 3, 'x' => 320, 'y' => 700, 'color' => '#eeeeee'],
            ['id' => 'interior_design', 'name' => 'Interior Design', 'level' => 3, 'x' => 180, 'y' => 800, 'color' => '#eeeeee'],
            ['id' => 'architectural_design', 'name' => 'Architectural Design', 'level' => 3, 'x' => 260, 'y' => 920, 'color' => '#eeeeee'],
            
            // Level 3 skills - new media links
            ['id' => 'film_production', 'name' => 'Film Production', 'level' => 3, 'x' => 240, 'y' => 1060, 'color' => '#eeeeee'],
            ['id' => 'audio_engineering', 'name' => 'Audio Engineering', 'level' => 3, 'x' => 180, 'y' => 1160, 'color' => '#eeeeee'],
            ['id' => 'journalism', 'name' => 'Journalism', 'level' => 3, 'x' => 300, 'y' => 1220, 'color' => '#eeeeee'],
            ['id' => 'culinary_arts', 'name' => 'Culinary Arts', 'level' => 3, 'x' => 160, 'y' => 1260, 'color' => '#eeeeee'],
            
            // Level 3 skills - new environmental links
            ['id' => 'sustainability', 'name' => 'Sustainability', 'level' => 3, 'x' => 1320, 'y' => 840, 'color' => '#eeeeee'],
            ['id' => 'renewable_energy', 'name' => 'Renewable Energy', 'level' => 3, 'x' => 1380, 'y' => 760, 'color' => '#eeeeee'],
            ['id' => 'urban_planning', 'name' => 'Urban Planning', 'level' => 3, 'x' => 1460, 'y' => 860, 'color' => '#eeeeee'],
            ['id' => 'agriculture', 'name' => 'Agricultural Science', 'level' => 3, 'x' => 1420, 'y' => 940, 'color' => '#eeeeee'],
            
            // Level 3 skills - new biotech links
            ['id' => 'genetics', 'name' => 'Genetics', 'level' => 3, 'x' => 1560, 'y' => 780, 'color' => '#eeeeee'],
            ['id' => 'molecular_biology', 'name' => 'Molecular Biology', 'level' => 3, 'x' => 1660, 'y' => 740, 'color' => '#eeeeee'],
            ['id' => 'biomedical', 'name' => 'Biomedical Engineering', 'level' => 3, 'x' => 1760, 'y' => 800, 'color' => '#eeeeee'],
            ['id' => 'lab_techniques', 'name' => 'Laboratory Techniques', 'level' => 3, 'x' => 1720, 'y' => 880, 'color' => '#eeeeee'],
            
            // Level 3 skills - new medical links
            ['id' => 'patient_care', 'name' => 'Patient Care', 'level' => 3, 'x' => 1560, 'y' => 1060, 'color' => '#eeeeee'],
            ['id' => 'diagnosis', 'name' => 'Diagnosis', 'level' => 3, 'x' => 1660, 'y' => 1020, 'color' => '#eeeeee'],
            ['id' => 'pharmacology', 'name' => 'Pharmacology', 'level' => 3, 'x' => 1760, 'y' => 1080, 'color' => '#eeeeee'],
            ['id' => 'psychology', 'name' => 'Psychology', 'level' => 3, 'x' => 1720, 'y' => 1160, 'color' => '#eeeeee'],
            
            // Level 3 skills - new athletics links
            ['id' => 'sports_coaching', 'name' => 'Sports Coaching', 'level' => 3, 'x' => 100, 'y' => 640, 'color' => '#eeeeee'],
            ['id' => 'physical_therapy', 'name' => 'Physical Therapy', 'level' => 3, 'x' => 160, 'y' => 580, 'color' => '#eeeeee'],
            ['id' => 'performance_analysis', 'name' => 'Performance Analysis', 'level' => 3, 'x' => 220, 'y' => 640, 'color' => '#eeeeee'],
            
            // Level 3 skills - new communication links
            ['id' => 'writing', 'name' => 'Professional Writing', 'level' => 3, 'x' => 700, 'y' => 1760, 'color' => '#eeeeee'],
            ['id' => 'public_speaking', 'name' => 'Public Speaking', 'level' => 3, 'x' => 800, 'y' => 1720, 'color' => '#eeeeee'],
            ['id' => 'negotiation', 'name' => 'Negotiation', 'level' => 3, 'x' => 900, 'y' => 1760, 'color' => '#eeeeee'],
            ['id' => 'foreign_languages', 'name' => 'Foreign Languages', 'level' => 3, 'x' => 760, 'y' => 1840, 'color' => '#eeeeee'],
            
            // Level 3 skills - new leadership links
            ['id' => 'team_management', 'name' => 'Team Management', 'level' => 3, 'x' => 1100, 'y' => 1760, 'color' => '#eeeeee'],
            ['id' => 'strategic_planning', 'name' => 'Strategic Planning', 'level' => 3, 'x' => 1200, 'y' => 1720, 'color' => '#eeeeee'],
            ['id' => 'conflict_resolution', 'name' => 'Conflict Resolution', 'level' => 3, 'x' => 1300, 'y' => 1760, 'color' => '#eeeeee'],
            ['id' => 'mentoring', 'name' => 'Mentoring', 'level' => 3, 'x' => 1240, 'y' => 1840, 'color' => '#eeeeee'],
        ];
        
        $links = [
            // Connect core to level 1
            ['source' => 'core', 'target' => 'tech'],
            ['source' => 'core', 'target' => 'biz'],
            ['source' => 'core', 'target' => 'creative'],
            ['source' => 'core', 'target' => 'science'],
            ['source' => 'core', 'target' => 'soft'],
            ['source' => 'core', 'target' => 'healthcare'],
            ['source' => 'core', 'target' => 'sports'],
            
            // Connect level 1 to level 2
            ['source' => 'tech', 'target' => 'programming'],
            ['source' => 'tech', 'target' => 'data'],
            ['source' => 'tech', 'target' => 'security'],
            ['source' => 'tech', 'target' => 'engineering'],
            ['source' => 'biz', 'target' => 'finance'],
            ['source' => 'biz', 'target' => 'marketing'],
            ['source' => 'biz', 'target' => 'business_admin'],
            ['source' => 'creative', 'target' => 'design'],
            ['source' => 'creative', 'target' => 'media'],
            ['source' => 'science', 'target' => 'biotech'],
            ['source' => 'science', 'target' => 'medical'],
            ['source' => 'science', 'target' => 'environmental'],
            ['source' => 'soft', 'target' => 'communication'],
            ['source' => 'soft', 'target' => 'leadership'],
            ['source' => 'healthcare', 'target' => 'biotech'],
            ['source' => 'healthcare', 'target' => 'medical'],
            ['source' => 'sports', 'target' => 'athletics'],
            
            // Connect level 2 to level 3 - existing
            ['source' => 'programming', 'target' => 'web'],
            ['source' => 'programming', 'target' => 'mobile'],
            ['source' => 'data', 'target' => 'ml'],
            ['source' => 'finance', 'target' => 'bi'],
            ['source' => 'design', 'target' => 'ui'],
            ['source' => 'design', 'target' => 'ux'],
            
            // Connect level 2 to level 3 - new programming links
            ['source' => 'programming', 'target' => 'blockchain'],
            ['source' => 'programming', 'target' => 'algorithms'],
            ['source' => 'programming', 'target' => 'data_structures'],
            ['source' => 'programming', 'target' => 'ar_vr'],
            
            // Connect level 2 to level 3 - new data links
            ['source' => 'data', 'target' => 'statistics'],
            ['source' => 'data', 'target' => 'data_viz'],
            ['source' => 'data', 'target' => 'big_data'],
            
            // Connect level 2 to level 3 - new security links
            ['source' => 'security', 'target' => 'network_security'],
            ['source' => 'security', 'target' => 'pentest'],
            ['source' => 'security', 'target' => 'crypto'],
            
            // Connect level 2 to level 3 - new engineering links
            ['source' => 'engineering', 'target' => 'mechanical'],
            ['source' => 'engineering', 'target' => 'electrical'],
            ['source' => 'engineering', 'target' => 'civil'],
            ['source' => 'engineering', 'target' => 'aerospace'],
            
            // Connect level 2 to level 3 - new finance links
            ['source' => 'finance', 'target' => 'financial_analysis'],
            ['source' => 'finance', 'target' => 'investment'],
            ['source' => 'finance', 'target' => 'accounting'],
            ['source' => 'finance', 'target' => 'risk_assessment'],
            
            // Connect level 2 to level 3 - new marketing links
            ['source' => 'marketing', 'target' => 'digital_marketing'],
            ['source' => 'marketing', 'target' => 'content_strategy'],
            ['source' => 'marketing', 'target' => 'social_media'],
            ['source' => 'marketing', 'target' => 'brand_management'],
            
            // Connect level 2 to level 3 - new business admin links
            ['source' => 'business_admin', 'target' => 'project_management'],
            ['source' => 'business_admin', 'target' => 'hr_management'],
            ['source' => 'business_admin', 'target' => 'supply_chain'],
            ['source' => 'business_admin', 'target' => 'entrepreneurship'],
            
            // Connect level 2 to level 3 - new design links
            ['source' => 'design', 'target' => 'graphic_design'],
            ['source' => 'design', 'target' => 'product_design'],
            ['source' => 'design', 'target' => 'interior_design'],
            ['source' => 'design', 'target' => 'architectural_design'],
            
            // Connect level 2 to level 3 - new media links
            ['source' => 'media', 'target' => 'film_production'],
            ['source' => 'media', 'target' => 'audio_engineering'],
            ['source' => 'media', 'target' => 'journalism'],
            ['source' => 'media', 'target' => 'culinary_arts'],
            
            // Connect level 2 to level 3 - new environmental links
            ['source' => 'environmental', 'target' => 'sustainability'],
            ['source' => 'environmental', 'target' => 'renewable_energy'],
            ['source' => 'environmental', 'target' => 'urban_planning'],
            ['source' => 'environmental', 'target' => 'agriculture'],
            
            // Connect level 2 to level 3 - new biotech links
            ['source' => 'biotech', 'target' => 'genetics'],
            ['source' => 'biotech', 'target' => 'molecular_biology'],
            ['source' => 'biotech', 'target' => 'biomedical'],
            ['source' => 'biotech', 'target' => 'lab_techniques'],
            
            // Connect level 2 to level 3 - new medical links
            ['source' => 'medical', 'target' => 'patient_care'],
            ['source' => 'medical', 'target' => 'diagnosis'],
            ['source' => 'medical', 'target' => 'pharmacology'],
            ['source' => 'medical', 'target' => 'psychology'],
            
            // Connect level 2 to level 3 - new athletics links
            ['source' => 'athletics', 'target' => 'sports_coaching'],
            ['source' => 'athletics', 'target' => 'physical_therapy'],
            ['source' => 'athletics', 'target' => 'performance_analysis'],
            
            // Connect level 2 to level 3 - new communication links
            ['source' => 'communication', 'target' => 'writing'],
            ['source' => 'communication', 'target' => 'public_speaking'],
            ['source' => 'communication', 'target' => 'negotiation'],
            ['source' => 'communication', 'target' => 'foreign_languages'],
            
            // Connect level 2 to level 3 - new leadership links
            ['source' => 'leadership', 'target' => 'team_management'],
            ['source' => 'leadership', 'target' => 'strategic_planning'],
            ['source' => 'leadership', 'target' => 'conflict_resolution'],
            ['source' => 'leadership', 'target' => 'mentoring'],
        ];
        
        // Create the default skill tree
        SkillTree::create([
            'name' => 'Default Career Skill Tree',
            'nodes' => $nodes,
            'links' => $links,
            'is_active' => true,
        ]);
        
        $this->command->info('Skill tree seeded successfully!');
    }
}
