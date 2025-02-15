<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventEntranceRequested extends Mailable
{
    use Queueable, SerializesModels;

    public $event;
    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($event, $user)
    {
        $this->event = $event;
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Event Entrance Requested',
        );
    }

    /**
     * Build the email content.
     */
    public function build()
    {
        return $this->subject('New Event Entrance Request')
        ->markdown('mail.email')
        ->with([
                'event' => $this->event,
                'user' => $this->user,
            ]);
    }
}
