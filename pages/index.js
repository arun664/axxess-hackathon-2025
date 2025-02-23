import React, { useState, useEffect } from "react";
import { PiFirstAidFill } from "react-icons/pi";
/*
const doctors = [
  { name: "Dr. Ayesha Khan", specialty: "Cardiologist", location: "New York, NY", email: "ayesha.khan@example.com", experience: "15 years", patientsTreated: 5000, languages: ["English", "Spanish"]},
  { name: "Dr. Omar Siddiqui", specialty: "Dermatologist", location: "Los Angeles, CA", email: "omar.siddiqui@example.com", experience: "10 years", patientsTreated: 3500 , languages: ["English", "French"]},
  { name: "Dr. Fatima Rahman", specialty: "Pediatrician", location: "Chicago, IL", email: "fatima.rahman@example.com", experience: "8 years", patientsTreated: 2000 , languages: ["English"]},
  { name: "Dr. Ahmed Patel", specialty: "Orthopedic Surgeon", location: "Houston, TX", email: "ahmed.patel@example.com", experience: "20 years", patientsTreated: 7000 , languages: ["English"]},
  { name: "Dr. Sara Malik", specialty: "Neurologist", location: "San Francisco, CA", email: "sara.malik@example.com", experience: "12 years", patientsTreated: 4000 , languages: ["English"]},
  { name: "Dr. Zain Ali", specialty: "General Practitioner", location: "Seattle, WA", email: "zain.ali@example.com", experience: "6 years", patientsTreated: 1500 , languages: ["English, Chinese"]},
  { name: "Dr. Noor Hassan", specialty: "Endocrinologist", location: "Miami, FL", email: "noor.hassan@example.com", experience: "18 years", patientsTreated: 6000 , languages: ["English"]},
  { name: "Dr. Bilal Khan", specialty: "Psychiatrist", location: "Boston, MA", email: "bilal.khan@example.com", experience: "9 years", patientsTreated: 2500 , languages: ["English"]},
  { name: "Dr. Layla Saeed", specialty: "Rheumatologist", location: "Denver, CO", email: "layla.saeed@example.com", experience: "14 years", patientsTreated: 4500 , languages: ["English"]}
];
*/
export default function Home() {
  // State to store doctors data
  const [doctors, setDoctors] = useState([]);
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

  const toggleEmergencyWindow = () => {
    setIsEmergencyWindowOpen(!isEmergencyWindowOpen);
  };

  return (
    <div className="max-w-7xl w-full p-6 mx-auto">
      {/* Search Bar */}
      <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
      <div className="max-w-2xl mx-auto">
        <form className="flex items-center">
          <label htmlFor="voice-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Doctors" required />
            <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search</button>
        </form>

        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
      </div>

      {/* Search Results */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="p-4 rounded-2xl shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-500 text-sm">{doctor.location}</p>
              <p className="text-gray-500 text-sm">🩺 Experience: {doctor.experience}</p>
              <p className="text-gray-500 text-sm">👨‍⚕️ Patients Treated: {doctor.patientsTreated}</p>
              <p className="text-gray-500 text-sm">🗣️ Languages Spoken: <br></br> &emsp; {doctor.languages ? doctor.languages.join(", ") : "N/A"}</p>
              <div className="mt-4 flex gap-2 justify-center">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex-1 text-sm">General Consultation</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex-1 text-sm">
                  Emergency Contact
                </button>
              </div>
            </div>
          ))}
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
            className="text-blue-600 dark:text-blue-400 font-semibold"
          >
            AxxessHealth
          </a>
        </p>
      </section>
    </div>
  );
}