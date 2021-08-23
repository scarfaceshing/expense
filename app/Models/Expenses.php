<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    use HasFactory;

    protected $fillable = ['cat_id', 'amount', 'date_entry'];

    public function expenseCatRelation()
    {
        return $this->belongsTo('App\Models\ExpenseCategories', 'cat_id', 'id');
    }
}
