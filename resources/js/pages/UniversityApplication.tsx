import {useState} from 'react'
import bear from '../pages/assets/home/bekimi.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UniversityApplicationProps  {
    university_id:number,
    branches_offered:string[]
}


type applicationDetails = {
    university_id:number,
    programme_id?:string,
    note?:string
}


const csrf_token = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

const UniversityApplication = ({university_id,branches_offered}:UniversityApplicationProps) => {



    const [details,setDetails] = useState<applicationDetails>({
        university_id:parseInt(university_id),
        programme_id:branches_offered.at(0),

    });

    async function apply() {
        const options = {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'X-CSRF-TOKEN':csrf_token
            },
            body:JSON.stringify({
                ...details
            })
        }

        console.log({...details,university_id},"THE DATA TO SENT");
        try{
            const response = await fetch("http://localhost:8001/make_application",options);

            if(!response.ok) {
                throw new Error("Something Went Wrong!");
            }

            const answer = await response.json();

            console.log(answer,"answer is there");

            if(answer.success) {
                toast.success("Application Completed!");
                window.location.href = `/universityDetails?university_id=${university_id}`;
                return;
            }

            toast.error("Application Failed!");


        } catch(err) {
            console.error(err);
        }
    }
  return (
    <div className="bg-[#faf8f6] w-full h-screen flex justify-center">
        <ToastContainer/>
        <div className="mt-10">
            <img src={bear} height="70" width="70" className="ml-15"/>

            <div className="flex flex-col">
                <div className="flex flex-col items-start mt-10">
                    <label className="font-semibold opacity-75 font-etna">Select A Programme</label>
                    <select value={details?.programme_id} className="border-1 border-[#9F262A] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#9F262A]" onChange={(e) => {setDetails({...details,programme_id:e.target.value})}}>
                        {branches_offered.map((branch)=>{
                            return (
                                <option value={branch}>{branch}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="flex flex-col items-start mt-10">
                    <label className="font-semibold opacity-75 font-etna">Leave A Note</label>
                    <input className="border-1 border-[#9F262A] rounded-md p-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#9F262A]" onChange={(e) => {setDetails({...details,note:e.target.value})}}/>
                </div>

                <div className="flex justify-center mt-8">
                    <button className="bg-[#9F262A] rounded-lg px-20 py-2 text-white cursor-pointer" onClick={apply}>Apply</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default UniversityApplication
