import { useState, useEffect } from 'react';
import medicalData from '../public/data/medicalHistory.json'; // Importing data from JSON

const MedicalHistory = () => {
  const [currentMedication, setCurrentMedication] = useState([]);
  const [pastMedication, setPastMedication] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [pastSurgeries, setPastSurgeries] = useState([]);

  const [isEditingMedication, setIsEditingMedication] = useState(false);
  const [newMedication, setNewMedication] = useState('');

  const [isEditingAllergies, setIsEditingAllergies] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Initialize state from the imported data
    setCurrentMedication(medicalData.currentMedication);
    setPastMedication(medicalData.pastMedication);
    setAllergies(medicalData.allergies);
    setPastSurgeries(medicalData.pastSurgeries);
  }, []);

  const handleSearch = () => {
    setShowHistory(true);
  };

  const handleAddMedication = () => {
    setCurrentMedication([...currentMedication, newMedication]);
    setNewMedication('');
    setIsEditingMedication(false);
  };

  const handleAddAllergy = () => {
    setAllergies([...allergies, newAllergy]);
    setNewAllergy('');
    setIsEditingAllergies(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">Medical History</h2>

      {/* Date Range Picker */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-teal-500 mb-2">Filter by Date Range</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
          >
            Search
          </button>
        </div>
      </div>

      {showHistory && (
        <>
          {/* Current Medication */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-teal-500 mb-2">Current Medication</h3>
            <ul className="list-disc pl-6">
              {currentMedication.map((med, index) => (
                <li key={index} className="text-gray-700">{med}</li>
              ))}
            </ul>
          </div>

          {/* Past Medication History */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-teal-500 mb-2">Past Medication History</h3>
            <ul className="list-disc pl-6">
              {pastMedication.map((med, index) => (
                <li key={index} className="text-gray-700">{med}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Allergies */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-teal-500 mb-2">Allergies</h3>
        <ul className="list-disc pl-6">
          {allergies.map((allergy, index) => (
            <li key={index} className="text-gray-700">{allergy}</li>
          ))}
        </ul>
        <button
          onClick={() => setIsEditingAllergies(!isEditingAllergies)}
          className="mt-2 bg-teal-500 text-white py-1 px-3 rounded hover:bg-teal-600"
        >
          {isEditingAllergies ? 'Cancel' : 'Update Allergies'}
        </button>
        {isEditingAllergies && (
          <div className="mt-4">
            <input
              type="text"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter new allergy"
            />
            <button
              onClick={handleAddAllergy}
              className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            >
              Add Allergy
            </button>
          </div>
        )}
      </div>

      {/* Past Surgeries (Static) */}
      <div>
        <h3 className="text-xl font-semibold text-teal-500 mb-2">Past Surgeries</h3>
        <ul className="list-disc pl-6">
          {pastSurgeries.map((surgery, index) => (
            <li key={index} className="text-gray-700">{surgery}</li>
          ))}
        </ul>
        <p className="text-gray-500 text-sm">(Only doctors can update this information)</p>
      </div>
    </div>
  );
};

export default MedicalHistory;