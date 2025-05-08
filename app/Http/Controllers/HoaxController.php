<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Hoax;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HoaxController extends Controller
{
    public function index()
    {
        $hoaxes = Hoax::all();
        return Inertia::render('Service', [
            'hoaxes' => $hoaxes
        ]);
    }

    public function create()
    {
        return Inertia::render('LaporHoax'); // halaman form, jika ada
    }

    public function store(Request $request)
    {
        $request->validate([
            'tema' => 'required|string|max:255',
            'tautan' => 'required|url',
            'bukti_konten' => 'nullable|image|max:2048',
            'alasan' => 'required|string',
        ]);

        $path = $request->file('bukti_konten')?->store('bukti', 'public');

        Hoax::create([
            'tema' => $request->tema,
            'tautan' => $request->tautan,
            'bukti_konten' => $path,
            'alasan' => $request->alasan,
        ]);

        // Tidak redirect agar alert bisa muncul di frontend (onSuccess Inertia)
        return back()->with('success', 'Laporan hoax berhasil dikirim!');
    }
}