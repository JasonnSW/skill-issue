<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HoaxTest extends TestCase
{
    use RefreshDatabase;

    public function test_requires_all_fields_except_bukti_konten()
    {
        $response = $this->post('/hoax', []);
        
        $response->assertSessionHasErrors(['tema', 'tautan', 'alasan']);
    }

    public function test_tema_field_has_a_max_length()
    {
        $temaLengthExceeded = str_repeat('a', 256);

        $response = $this->post('/hoax', [
            'tema' => $temaLengthExceeded,
            'tautan' => 'http://example.com/hoax',
            'alasan' => 'Informasi ini palsu.'
        ]);

        $response->assertSessionHasErrors(['tema']);
        $this->assertDatabaseCount('hoaxes', 0);
    }

    public function test_tautan_field_must_be_a_valid_url()
    {
        $response = $this->post('/hoax', [
            'tema' => 'Valid Tema',
            'tautan' => 'invalid-url', 
            'alasan' => 'Valid Alasan'
        ]);

        $response->assertSessionHasErrors(['tautan']);
        $this->assertDatabaseCount('hoaxes', 0);
    }
}