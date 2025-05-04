interface UniversityDetailsPageProps  {
    university_id:number,
    university_name:string,
    image:string,
    university_logo:string,
    university_description:string,
    branches_offered:string[],
    address:string,
    website:string
}
const UniversityDetailsPage = ({university_id,university_name,image,university_logo,university_description,branches_offered,address,website}:UniversityDetailsPageProps) => {
  return (
    <>
        <div className="w-full h-[300px] bg-[#9A2D2D] flex justify-center relative">
        <div className="mt-10">
          <h1 className="text-2xl font-bold font-etna text-white">
            Welcome To {university_name}
          </h1>
        </div>
        <div className="w-[90%] sm:w-[80%] h-auto sm:h-[130px] absolute top-[80%] left-[50%] transform -translate-x-1/2 bg-white rounded-md shadow-md flex flex-col sm:flex-row justify-center items-center p-4 sm:p-0">
            <div className="w-full sm:w-[90%] flex flex-col sm:flex-row items-center gap-2 relative">
                <img src={university_logo} className="h-[50px] w-auto mb-3 sm:mb-0" />

                <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl text-[#9A2D2D] font-bold">{university_name}</h1>
                <div className="flex justify-center sm:justify-start items-center mt-2 sm:mt-3">
                    <svg className="fill-[#9A2D2D] h-[15px] w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                    <p className="px-2 text-black-300 font-etna opacity-75 text-sm sm:text-base">{address}</p>
                </div>
                </div>

                <div className="mt-3 sm:mt-0 sm:absolute sm:top-[50%] sm:right-0 sm:transform sm:translate-y-[-50%]">
                    <button onClick={(e) => {window.location.href = `/universityApplication?university_id=${university_id}`}} className="bg-[#9A2D2D] text-white font-etna font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-md cursor-pointer text-sm sm:text-base">Apply Now</button>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-30 w-full h-auto">
        <div className="col-span-1 ml-5 border border-gray-100 p-4 shadow-sm">
          <h1 className="text-2xl text-[#9A2D2D] font-bold text-center">About University</h1>
          <div className="w-full h-[2px] flex justify-center mt-5">
            <div className="w-[80%] h-full border-b border-gray-300"></div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-[80%] flex justify-center">
              <p className="text-center text-black-300 opacity-75 font-semibold text-m mt-5">{university_description}</p>
            </div>
          </div>

          <div className="w-full flex justify-center mt-8">
            <div className="w-[80%]">
              <p className="text-[#9A2D2D] font-bold text-lg">Available Programs</p>

              <div className="w-full flex gap-4 mt-4 flex-wrap justify-center">
                {branches_offered ? (
                  branches_offered.map((branch) => {
                    return (
                      <div className="bg-[#F5D0D0] px-5 py-2 rounded-full">
                        <p className="text-[#9A2D2D] font-etna">{branch}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No Information About Programs Offered</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4 ml-10">
          <div className="border border-gray-100 p-4 shadow-sm w-full">
            <p className="text-[#9A2D2D] font-medium text-center">The University Would Love To Talk With You!</p>
            <div className="w-full h-[2px] flex justify-center mt-5">
              <div className="w-[80%] h-full border-b border-gray-300"></div>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-2 my-2">
                <p className="text-black-300 font-etna font-medium">Website:</p>
                <a href={website} className="text-[#9A2D2D]">{website}</a>
              </div>

              <div className="flex items-center gap-2 my-2">
                <p className="text-black-300 font-etna font-medium">Chat:</p>
                <p className="text-[#9A2D2D] font-semibold">Here</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 p-4 shadow-sm w-full">
            <p className="text-[#9a2d2d] font-bold text-center">Why Join {university_name}?</p>

            <div className="w-full h-[2px] flex justify-center mt-5">
              <div className="w-[80%] h-full border-b border-gray-300"></div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-black font-semibold"><span className="text-[#9A2D2D]">1.</span>World-class faculty</p>
              <p className="text-black font-semibold"><span className="text-[#9A2D2D]">2.</span>Cutting-edge research</p>
              <p className="text-black font-semibold"><span className="text-[#9A2D2D]">3.</span>Beautiful campus</p>
              <p className="text-black font-semibold"><span className="text-[#9A2D2D]">4.</span>Strong alumini network</p>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default UniversityDetailsPage
