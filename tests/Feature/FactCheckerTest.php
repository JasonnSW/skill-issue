<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;

class FactCheckerTest extends TestCase
{
    public function test_requires_text_input()
    {
        $response = $this->postJson('/api/verify-fact', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['text']);
    }

    public function test_returns_json_response_for_valid_input()
    {
     $response = $this->postJson('/api/verify-fact', ['text' => 'Bumi itu bulat']);

        $response->assertStatus(200)
                 ->assertJsonStructure(['message', 'isTrue']);
    }

    public function test_correctly_identifies_a_true_statement()
    {
        $response = $this->postJson('/api/verify-fact', ['text' => 'Bumi itu bulat']);

        $response->assertStatus(200)
                 ->assertJson([
                     'isTrue' => true,
                 ]);
    }

    public function test_correctly_identifies_a_false_statement()
    {
        $response = $this->postJson('/api/verify-fact', ['text' => 'Bumi itu datar']);
        
        $response->assertStatus(200)
                 ->assertJson([
                     'isTrue' => false,
                 ]);
    }
}