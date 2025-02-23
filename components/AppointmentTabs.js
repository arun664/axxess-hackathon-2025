import React, { useState } from 'react';

const AppointmentTabs = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  const renderContent = () => {
    switch (activeTab) {
      case 'Pending':
        return <div>Pending Appointments</div>;
      case 'Upcoming':
        return <div>Upcoming Appointments</div>;
      case 'Completed':
        return <div>Completed Appointments</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'Pending' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'Upcoming' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('Upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'Completed' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('Completed')}
        >
          Completed
        </button>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AppointmentTabs;