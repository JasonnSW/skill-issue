<?php

namespace Tests\Feature;

use Tests\TestCase;

class SafeBrowsingTest extends TestCase
{
    public function test_requires_url_input()
    {
        $response = $this->postJson('/api/check-website-safety', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['url']);
    }

    public function test_rejects_invalid_url()
    {
        $response = $this->postJson('/api/check-website-safety', ['url' => 'not-a-url']);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['url']);
    }

    public function test_returns_json_response_for_valid_url()
    {
        $response = $this->postJson('/api/check-website-safety', 
            ['url' => 'https://google.com'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['success', 'isSafe']);
    }

    public function test_detects_malware_site()
    {
        $response = $this->postJson('/api/check-website-safety', [
            'url' => 'http://malware.testing.google.test/testing/malware/' 
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'isSafe' => false,
                ]);

        $this->assertStringContainsString('MALWARE', $response['details']);
    }

    public function test_detects_social_engineering_site()
    {
        $response = $this->postJson('/api/check-website-safety', [
            'url' => 'https://testsafebrowsing.appspot.com/s/phishing.html'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'isSafe' => false,
                ]);

        $this->assertStringContainsString('SOCIAL_ENGINEERING', $response['details']);
    }

    public function test_detects_safe_site()
    {
        $response = $this->postJson('/api/check-website-safety', [
            'url' => 'https://www.google.com/'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'isSafe' => true,
                ]);
    }
}