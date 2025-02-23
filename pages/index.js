import React, { useState, useEffect } from "react";
import { PiFirstAidFill } from "react-icons/pi";

export default function Home() {
  // State to store doctors data
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmergencyWindowOpen, setIsEmergencyWindowOpen] = useState(false);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("./api/doctor/getAllDoctors"); // Call the API route
      const data = await response.json();

      if (data.success) {
        setDoctors(data.doctors); // Update state with fetched data
      } else {
        console.error("Failed to fetch doctors:", data.error);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filtered doctors based on search query
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleEmergencyWindow = () => {
    setIsEmergencyWindowOpen(!isEmergencyWindowOpen);
  };

  return (
    <div className="max-w-7xl w-full p-6 mx-auto">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => e.preventDefault()} // Prevent page reload
          className="flex items-center"
        >
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
              placeholder="Search Doctors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-pink-700 rounded-lg border border-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
          >
            <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div key={index} className="p-4 rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-gray-500 text-sm">{doctor.location}</p>
                <p className="text-gray-500 text-sm">🩺 Experience: {doctor.experience}</p>
                <p className="text-gray-500 text-sm">👨‍⚕️ Patients Treated: {doctor.patientsTreated}</p>
                <p className="text-gray-500 text-sm">🗣️ Languages Spoken: {doctor.languages ? doctor.languages.join(", ") : "N/A"}</p>
                <div className="mt-4 flex gap-2 justify-center">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex-1 text-sm">General Consultation</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex-1 text-sm">
                    Emergency Contact
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>

      {/* Floating Emergency Button */}
      <button
        onClick={toggleEmergencyWindow}
        className="fixed bottom-8 right-8 bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
      >
        <PiFirstAidFill className="w-8 h-8" />
      </button>

      {/* Emergency Contact Window */}
      {isEmergencyWindowOpen && (
        <div className="fixed right-4 top-20 bottom-32 bg-white w-36 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Emergency Contacts</h2>
          <ul className="space-y-2 text-md">
            <li className="text-sm" ><strong>Police:</strong> <br></br> 911</li>
            <li className="text-sm"><strong>Fire Department:</strong> <br></br> 911</li>
            <li className="text-sm"><strong>Ambulance:</strong> <br></br> 911</li>
            <li className="text-sm"><strong>Poison Control:</strong> <br></br> 1-800-222-1222</li>
          </ul>
        </div>
      )}

      {/* GitHub Repository Link */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          GitHub Repository
        </h3>
        <p className="mt-4 text-lg leading-7 text-black dark:text-white">
          Explore our code and contribute to the project on GitHub:{" "}
          <a
            href="https://github.com/arun664/axxess-hackathon-2025.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 dark:text-pink-400 font-semibold"
          >
            AxxessHealth
          </a>
        </p>
      </section>
    </div>
  );
}