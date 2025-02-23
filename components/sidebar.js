const Sidebar = ({ setActiveSection }) => {
    return (
      <div className="w-64 h-screen p-4 bg-gray-800 text-white dark:bg-gray-900 dark:text-white">
        <ul>
          <li
            className="cursor-pointer py-2 hover:text-teal-500 dark:hover:text-teal-400"
            onClick={() => setActiveSection('PatientProfile')}
          >
            Patient Profile
          </li>
          <li
            className="cursor-pointer py-2 hover:text-teal-500 dark:hover:text-teal-400"
            onClick={() => setActiveSection('MedicalHistory')}
          >
            Medical History
          </li>
          <li
            className="cursor-pointer py-2 hover:text-teal-500 dark:hover:text-teal-400"
            onClick={() => setActiveSection('Appointments')}
          >
            Appointments
          </li>
          <li
            className="cursor-pointer py-2 hover:text-teal-500 dark:hover:text-teal-400"
            onClick={() => setActiveSection('Prescription')}
          >
            Prescription
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  