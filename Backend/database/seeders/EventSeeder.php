<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing records to avoid duplicates
        // DB::table('events')->truncate();

        // Create sample events
        Event::create([
            'user_id' => 1, // Replace with a valid user ID
            'title' => 'Sample Event 1',
            'description' => 'This is a sample event description.',
            'date' => now()->addDays(10),
            'location' => 'Sample Location 1',
            'max_participants' => 50,
            'active' => true,
        ]);

        Event::create([
            'user_id' => 2, // Replace with a valid user ID
            'title' => 'Sample Event 2',
            'description' => 'This is another sample event description.',
            'date' => now()->addDays(15),
            'location' => 'Sample Location 2',
            'max_participants' => 30,
            'active' => false,
        ]);
    }
}
