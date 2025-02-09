<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventController extends CrudController
{
    protected $table = 'events';
    protected $modelClass = Event::class;

    protected function getTable()
    {
        return $this->table;
    }

    protected function getModelClass()
    {
        return $this->modelClass;
    }

    public function getAll()
    {
        $events = Event::all();
        return response()->json($events);
    }

    public function createOne(Request $request)
    {
        try{
            return parent::createOne($request);
        }
        catch (\Exception $e) {
            Log::error('Error caught in function EventController.createOne : '.$e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json(['success' => false, 'errors' => [__('common.unexpected_error')]]);
        }
    }

    public function afterCreateOne($item, $request)
    {
        try {
            // Add any event-specific logic after creating the event
            // For example, you might want to log the creation or send a notification
        } catch (\Exception $e) {
            Log::error('Error caught in function EventController.afterCreateOne : ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json(['success' => false, 'errors' => [__('common.unexpected_error')]]);
        }
    }

    public function updateOne($id, Request $request)
    {
        try {
            // Add any event-specific logic before updating the event
            // For example, you might want to handle specific fields or transform data

            return parent::updateOne($id, $request);
        } catch (\Exception $e) {
            Log::error('Error caught in function EventController.updateOne : ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json(['success' => false, 'errors' => [__('common.unexpected_error')]]);
        }
    }

    public function afterUpdateOne($item, $request)
    {
        try {
            // Add any event-specific logic after updating the event
            // For example, you might want to log the update or send a notification
        } catch (\Exception $e) {
            Log::error('Error caught in function EventController.afterUpdateOne : ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json(['success' => false, 'errors' => [__('common.unexpected_error')]]);
        }
    }

}
