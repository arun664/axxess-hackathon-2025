import { db } from '@/config/firebaseConfig';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore/lite'; // Firestore functions

export default async function handler(req, res) {
  const { doctorID, userID, appointmentStatus, } = req.body;

  try {
    const usersRef = collection(db, 'appointments');
   
    await setDoc(doc(db, 'appointments', userID), {
     doctorID,
     userID,
     appointmentStatus,
    });

    return res.status(200).json({ message: 'Appointment request sent successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'There was an issue requesting the appointment' });
  }
}