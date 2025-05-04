<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\ParentNewsLetter;
    use Illuminate\Support\Facades\Validator;
    use Exception;
    class ParentPortalController extends Controller
    {
        //

        public function add_message(Request $request) {

            return response()->json(['success'=>false,'details'=>"hello world"]);
            $validator = Validator::make($request->all(),[
                'parent_message' => 'required'
            ]);

            if($validator->fails()) {
                return response()->json(['success'=>false,'details'=>'Validation Failed!']);
            }

            try{
                $the_new_instance = ParentNewsLetter::create(
                    [
                        'parent_message' => $request->parent_message
                    ]
                );

                $the_response = $the_new_instance ? ['success'=>true,'details'=>"Message Received"] : ['success'=>false,'details'=>"Message Was Not Received"];

                return response()->json($the_response);
            } catch(\Exception $e) {
                return response()->json(['success'=>false,'details'=>$e->getMessage()]);
            }
        }
    }
?>
