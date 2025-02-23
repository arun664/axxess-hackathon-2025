import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '@/config/firebaseConfig';

export default async function handler(req, res) {
    try {
        // Reference to the "doctors" collection in Firestore
        const doctorsCollection = collection(db, 'doctors');

        // Fetch all documents from the "doctors" collection
        const doctorsSnapshot = await getDocs(doctorsCollection);

        // Map over the documents to extract data
        const doctorsData = doctorsSnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        // Return the doctors data as a JSON response
        return res.status(200).json({ success: true, doctors: doctorsData });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch doctors data' });
    }
}