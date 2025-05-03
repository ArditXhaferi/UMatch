<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\SkillTree;
use App\Models\CareerSkill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SkillTreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch unique skills from careers
        $skills = CareerSkill::query()->distinct()->pluck('skill');

        // Base node settings
        $centerX = 500;
        $centerY = 500;

        // Start with the core node
        $nodes = [
            [
                'id'    => 'core',
                'name'  => 'Core Skills',
                'level' => 0,
                'x'     => $centerX,
                'y'     => $centerY,
                'color' => '#4ECDC4',
            ],
        ];

        $links = [];

        // -----------------------------
        //  Redesigned grouping strategy
        // -----------------------------

        // 1. Define semantic top-level categories with simple keyword hints
        $categoryHints = [
            'technical'   => ['program', 'algorithm', 'software', 'code', 'development', 'engineering', 'machine', 'web', 'mobile', 'data', 'cloud'],
            'business'    => ['business', 'marketing', 'finance', 'strategy', 'management', 'sales', 'entrepreneur', 'analytics'],
            'creative'    => ['design', 'creative', 'ux', 'ui', 'media', 'visual', 'graphic', 'content'],
            'science'     => ['science', 'research', 'physics', 'chemistry', 'biology', 'lab', 'analysis', 'biotech', 'medical', 'clinical'],
            'soft_skills' => ['communication', 'leadership', 'team', 'adaptability', 'problem', 'critical', 'writing'],
            'healthcare'  => ['medical', 'health', 'clinical', 'pharma', 'bio', 'nurse', 'patient'],
            'finance'     => ['finance', 'account', 'budget', 'investment', 'financial', 'economic'],
            'data'        => ['data', 'statistic', 'big data', 'visualization', 'sql'],
        ];

        // Prepare buckets for skills per category
        $categoryBuckets = [];
        foreach (array_keys($categoryHints) as $catKey) {
            $categoryBuckets[$catKey] = [];
        }

        // Helper to find first matching category
        $findCategory = function (string $skillName) use ($categoryHints): string {
            $lower = strtolower($skillName);
            foreach ($categoryHints as $cat => $keywords) {
                foreach ($keywords as $kw) {
                    if (str_contains($lower, $kw)) {
                        return $cat;
                    }
                }
            }
            return 'other';
        };

        // Distribute skills
        foreach ($skills as $skillName) {
            $cat = $findCategory($skillName);
            if (!isset($categoryBuckets[$cat])) {
                $categoryBuckets[$cat] = [];
            }
            $categoryBuckets[$cat][] = $skillName;
        }

        // Remove empty categories and re-index
        $categoryBuckets = array_filter($categoryBuckets, fn($bucket) => count($bucket) > 0);

        // Geometry constants
        $categoryRadius = 250; // level 1
        $skillRadius    = 400; // level 2

        $categoriesCount = count($categoryBuckets);
        $categoryIndex  = 0;

        foreach ($categoryBuckets as $catKey => $bucket) {
            $catName = Str::of($catKey)->replace('_', ' ')->title();
            $catId   = $catKey;

            // Angle for category placement
            $angleCat = (2 * M_PI * $categoryIndex) / $categoriesCount;
            $xCat     = $centerX + (int) round($categoryRadius * cos($angleCat));
            $yCat     = $centerY + (int) round($categoryRadius * sin($angleCat));

            // Add category node (level 1)
            $nodes[] = [
                'id'    => $catId,
                'name'  => (string)$catName,
                'level' => 1,
                'x'     => $xCat,
                'y'     => $yCat,
                'color' => '#4ECDC4',
            ];

            // Link core -> category
            $links[] = [
                'source' => 'core',
                'target' => $catId,
            ];

            // Spread skills within wedge around category
            $skillsThisCat = count($bucket);
            $wedgeAngleTotal = (2 * M_PI) / $categoriesCount;
            $wedgeStart      = $angleCat - ($wedgeAngleTotal / 2) * 0.6; // take 60% of allocated wedge
            $wedgeEnd        = $angleCat + ($wedgeAngleTotal / 2) * 0.6;
            $wedgeSpan       = $wedgeEnd - $wedgeStart;

            foreach ($bucket as $sIndex => $skillName) {
                $nodeId = Str::slug($skillName, '_');

                $angleSkill = $wedgeStart + ($sIndex + 1) * ($wedgeSpan / ($skillsThisCat + 1));
                $xSkill     = $centerX + (int) round($skillRadius * cos($angleSkill));
                $ySkill     = $centerY + (int) round($skillRadius * sin($angleSkill));

                $nodes[] = [
                    'id'    => $nodeId,
                    'name'  => $skillName,
                    'level' => 2,
                    'x'     => $xSkill,
                    'y'     => $ySkill,
                    'color' => '#eeeeee',
                ];

                $links[] = [
                    'source' => $catId,
                    'target' => $nodeId,
                ];
            }

            $categoryIndex++;
        }

        // Deactivate any existing active trees
        SkillTree::query()->where('is_active', true)->update(['is_active' => false]);

        // Create the new default skill tree
        SkillTree::create([
            'name'      => 'Default Career Skill Tree',
            'nodes'     => $nodes,
            'links'     => $links,
            'is_active' => true,
        ]);

        $this->command->info('Skill tree seeded successfully!');
    }
}
