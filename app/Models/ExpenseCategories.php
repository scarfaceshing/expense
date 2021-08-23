<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseCategories extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function expenseRelation()
    {
        return $this->hasMany('App\Models\Expenses', 'cat_id', 'id');
    }
}
