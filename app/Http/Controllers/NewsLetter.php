<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParentNewsLetter;
use Illuminate\Support\Facades\Validator;
use Exception;

class NewsLetter extends Controller
{
    //

    public function add_parent_message(Request $request) {
        $validated_data = Validator::make($request->all(),[
            'parent_message' => 'required'
        ]);

        if($validated_data->fails()) {
            return response()->json(['success'=>false,'details'=>'Validation Failed']);
        }

        try{
            $new_parent_message = ParentNewsLetter::create([
                'parent_message' => $request->parent_message
            ]);

            if ($new_parent_message) {
                return response()->json(['success'=>true,'details'=>"Message Received"]);
            }

            return response()->json(['success'=>false,'details'=>'Message Failed']);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }
}
