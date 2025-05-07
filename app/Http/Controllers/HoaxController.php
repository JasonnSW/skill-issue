<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Hoax;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HoaxController extends Controller
{
    //
    public function index()
    {
        $reports = Hoax::latest()->get();
        return Inertia::render('Hoax/Index', [
            'reports' => $reports,
        ]);
    }

    public function create()
    {
        return inertia::render('Hoax/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tema' => 'required',
            'tautan' => 'required|url',
            'bukti_konten' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'alasan' => 'required',
        ]);

        $path = $request->file('bukti_konten')->store('bukti', 'public');

        Hoax::create([
            'tema' => $request->tema,
            'tautan' => $request->tautan,
            'bukti_konten' => $path,
            'alasan' => $request->alasan,
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Hoax report created successfully!',
            ]);
        }

        return redirect()->route('hoax.index')->with('success', 'Hoax report created successfully!');
    }


}

