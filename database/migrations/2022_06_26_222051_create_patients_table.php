<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('lastname', 255);
            $table->string('firstname', 255);
            $table->date('birthdate');
            $table->string('gender', 1);
            $table->string('phone', 15);
            $table->string('email', 255);
            $table->string('address', 1024);
            $table->string('zipcode', 10);
            $table->string('town', 255);
            $table->string('country', 255);
            $table->boolean('deceased');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
