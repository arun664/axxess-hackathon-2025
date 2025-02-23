import { useState, useEffect } from 'react';
import prescriptionData from '../public/data/prescriptions.json';

const Prescription = () => {
  const [currentPrescriptions, setCurrentPrescriptions] = useState([]);
  const [pastPrescriptions, setPastPrescriptions] = useState([]);
  
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Initialize state from the imported data
    setCurrentPrescriptions(prescriptionData.currentPrescriptions);
    setPastPrescriptions(prescriptionData.pastPrescriptions);
  }, []);

  const handleSearch = () => {
    setShowHistory(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`; // Format to "MM/DD/YYYY at HH:MM:SS AM/PM"
    return 
};
  

  const filterByDate = (prescriptions) => {
    if (!fromDate || !toDate) return prescriptions;
    
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return prescriptions.filter((prescription) => {
      const prescriptionDate = new Date(prescription.date); // Assuming prescriptions have a date property
      return prescriptionDate >= from && prescriptionDate <= to;
    });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">Prescription</h2>
      
      {/* Date Range Picker */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-300 mb-2">Filter by Date Range</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600"
          >
            Search
          </button>
        </div>
      </div>
      
      {showHistory && (
        <>
          {/* Current Prescriptions */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-300 mb-2">Current Prescriptions</h3>
            <ul className="list-disc pl-6">
              {filterByDate(currentPrescriptions).map((prescription, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <div>{prescription.name}</div> {/* Assuming prescriptions have a 'name' property */}
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    {formatDate(prescription.date)} {/* Format and display the date and time */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Past Prescriptions */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-300 mb-2">Past Prescriptions</h3>
            <ul className="list-disc pl-6">
              {filterByDate(pastPrescriptions).map((prescription, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <div>{prescription.name}</div> {/* Assuming prescriptions have a 'name' property */}
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    {formatDate(prescription.date)} {/* Format and display the date and time */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Prescription;
