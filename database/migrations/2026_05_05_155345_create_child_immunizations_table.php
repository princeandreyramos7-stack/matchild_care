<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('child_immunizations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('child_id')
                ->constrained('children')
                ->cascadeOnDelete();

            $table->date('bcg')->nullable();
            $table->date('hepatitis_b')->nullable();

            $table->date('pentavalent_1')->nullable();
            $table->date('pentavalent_2')->nullable();
            $table->date('pentavalent_3')->nullable();

            $table->date('opv_1')->nullable();
            $table->date('opv_2')->nullable();
            $table->date('opv_3')->nullable();

            $table->date('ipv_1')->nullable();
            $table->date('ipv_2')->nullable();

            $table->date('pcv_1')->nullable();
            $table->date('pcv_2')->nullable();
            $table->date('pcv_3')->nullable();

            $table->date('mmr_1')->nullable();
            $table->date('mmr_2')->nullable();

            $table->enum('fully_immunized_child', ['Y', 'N'])->nullable();

            $table->timestamps();

            $table->unique('child_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('child_immunizations');
    }
};
