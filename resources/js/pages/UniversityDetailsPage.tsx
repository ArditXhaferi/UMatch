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


const UniversityDetails = ({university_id,university_name,image,university_logo,university_description,branches_offered,address,website}:UniversityDetailsPageProps) => {
    return (
      <div className="min-h-screen bg-[#fdf5ec] text-[#7a2626] p-4 md:p-8">
        {/* Header */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{university_name}</h1>
            <p className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13401 2 5 5.13401 5 9C5 13.25 12 22 12 22C12 22 19 13.25 19 9C19 5.13401 15.866 2 12 2ZM7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 11.8072 14.0708 16.1296 12 18.8826C9.92922 16.1296 7 11.8072 7 9ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"/>
              </svg>
              {address}
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-[#7a2626] text-white px-6 py-2 rounded-lg hover:bg-[#601f1f] transition" onClick={() => {window.location.href = `/universityApplication?university_id=${university_id}`}}>
            Apply Now
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About University */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-[#7a2626] pb-2">About University</h2>
            <p className="text-gray-800 mb-4 leading-relaxed">
              The Polytechnic University of Tirana is a leading institution in engineering and technology, known for its cutting-edge research and innovative programs. Established in 1951, it offers a comprehensive range of degrees in Engineering, Architecture, and Information Technology. The university is dedicated to preparing students for the challenges of the modern world through hands-on learning and industry collaborations.
            </p>
            <h3 className="text-lg font-semibold mb-2">Available Programs</h3>
            <div className="flex flex-wrap gap-2">
              {branches_offered.map(program => (
                <span key={program} className="bg-[#edcfcf] text-[#7a2626] px-4 py-1 rounded-full text-sm font-medium">
                  {program}
                </span>
              ))}
            </div>
          </div>

          {/* Contact + Why Join */}
          <div className="flex flex-col gap-6">
            {/* Contact Section */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b border-[#7a2626] pb-2">The University Would Love To Talk With You!</h2>
              <p className="mb-2"><span className="font-semibold">Website:</span> <a href="http://www.upt.al" className="text-[#7a2626] underline">http://www.upt.al</a></p>
              <p><span className="font-semibold">Chat:</span> <a href="#" className="text-[#7a2626] underline">Here</a></p>
            </div>

            {/* Why Join Section */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b border-[#7a2626] pb-2">Why Join Polytechnic University of Tirana?</h2>
              <ol className="list-decimal list-inside text-gray-800 space-y-2">
                <li><span className="font-semibold text-[#7a2626]">World-class faculty</span></li>
                <li><span className="font-semibold text-[#7a2626]">Cutting-edge research</span></li>
                <li><span className="font-semibold text-[#7a2626]">Beautiful campus</span></li>
                <li><span className="font-semibold text-[#7a2626]">Strong industry connections</span></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UniversityDetails;
