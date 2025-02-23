import React, { useState } from 'react';
import AppointmentTabs from '../components/AppointmentTabs';
import SideBar from '../components/sidebar';

const AppointmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  const renderContent = () => {
    switch (activeTab) {
      case 'Pending':
        return <div>Your pending appointments will be displayed here.</div>;
      case 'Upcoming':
        return <div>Your upcoming appointments will be displayed here.</div>;
      case 'Completed':
        return <div>Your completed appointments will be displayed here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
    <SideBar />
    <div className = "flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Dashboard</h1>
      <AppointmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
    </div>
  );
};

export default AppointmentDashboard;