<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends  \Spatie\Permission\Models\Permission
{
    protected $casts = [
        'created_at' => 'datetime:M d, Y h:i:s a',
    ];
}
