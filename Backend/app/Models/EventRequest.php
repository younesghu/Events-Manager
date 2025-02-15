<?php

namespace App\Models;

use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Model;

class EventRequest extends Model
{
    protected $table = 'event_requests'; // Explicitly define the table name
    protected $fillable = [
        'user_id', 'event_id', 'is_approved'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

}
