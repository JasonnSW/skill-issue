<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hoax extends Model
{
    //
    protected $fillable = [
        'tema',
        'tautan',
        'bukti_konten',
        'alasan'
    ];

}
