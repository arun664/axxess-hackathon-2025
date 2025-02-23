import { useState } from 'react';
import Sidebar from '../../components/sidebar';
import PatientProfile from '@/components/patientProfile';
import MedicalHistory from '@/components/medicalHistory';
import Prescription from '@/components/prescription';
import Appointments from '@/components/appointment';

const Home = () => {
  const [activeSection, setActiveSection] = useState('PatientProfile'); // Set initial active section

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Display the section based on activeSection */}
        {activeSection === 'PatientProfile' && <PatientProfile />}
        {activeSection === 'MedicalHistory' && <MedicalHistory />}
        {activeSection === 'Appointments' && <Appointments />}
        {activeSection === 'Prescription' && <Prescription />}
      </div>
    </div>
  );
};

export default Home;
