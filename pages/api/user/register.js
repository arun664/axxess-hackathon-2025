import { db } from '@/config/firebaseConfig';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore/lite'; // Firestore functions

export default async function handler(req, res) {
  const { email, username, password,   firstName,
    lastName,
    dob,
    gender,
    phoneNumber,
    address,
    zipCode,
    city,
    state,
    country,
    insuranceProvider,
    groupNumber,
    insuranceId,
    currentMedication,
    allergies,
    pastSurgeries, } = req.body;

  try {
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await setDoc(doc(db, 'users', username), {
      email,
      username,
      password, // Consider hashing this password for security
      firstName,
      lastName,
      dob,
      gender,
      phoneNumber,
      address,
      zipCode,
      city,
      state,
      country,
      insuranceProvider,
      groupNumber,
      insuranceId,
      currentMedication,
      allergies,
      pastSurgeries,
    });

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'There was an issue registering the user' });
  }
}