<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    public static $cacheKey = 'events';

    protected $fillable = [
        'user_id', 'title', 'description', 'date', 'location', 'max_participants', 'active'
    ];

    protected $restricted = ['create_one', 'read_one', 'read_all', 'update', 'delete'];

    // public function scopeActive($query)
    // {
    //     return $query->where('active', true);
    // }

    // // Scope to check if an event is inactive
    // public function scopeInactive($query)
    // {
    //     return $query->where('active', false);
    // }

    public function scopeDataTable(Builder $query, $params)
    {
        if (!empty($params->order)) {
            foreach ($params->order as $order) {
                $query->orderBy($order['column'], $order['dir']);
            }
        }

        if (!empty($params->filter)) {
            foreach ($params->filter as $filter) {
                $query->where($filter['column'], 'LIKE', "%{$filter['value']}%");
            }
        }

        return $query;
    }


    public function rules($id = null)
    {
        $id = $id ?? request()->route('id');

        return [
            'user_id' => 'nullable',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'nullable|date',
            'location' => 'required|string|max:255',
            'max_participants' => 'required|integer|min:1',
            'active' => 'boolean'
        ];
    }
}
