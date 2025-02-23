import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default async function handler(req, res) {
    const handleAppointmentRegistration = async () => {
      toast.dismiss(); // Dismiss any existing toasts
      try {
        const response = await fetch('/api/user/appointment-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctorID,
            patientID,
            appointmentStatus,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          toast.success(result.message);
  
          // Redirect to login page
          router.push('/login');
        } else {
          toast.error(result.error); // Show error message
        }
      } catch (err) {
        toast.error('There was an issue registering the user'); // Show general error
      }
        };
    
        handleRegister();
    }