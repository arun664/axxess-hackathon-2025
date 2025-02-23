import { db } from '@/config/firebaseConfig';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore/lite';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    // PUT request handler for updating user details (password, email, or patient profile)
    try {
      const { username, newPassword, email, patientProfile } = req.body;

      const userDocRef = doc(db, 'users', username);

      if (newPassword) {
        // Update the document with new password
        await updateDoc(userDocRef, { password: newPassword });
        return res.status(200).json({ message: 'Password updated successfully' });
      } else if (email) {
        // Check if the email already exists in any other user document
        const usersCollection = collection(db, 'users');
        const emailQuery = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(emailQuery);

        if (!querySnapshot.empty) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        // Update the document with new email
        await updateDoc(userDocRef, { email: email });
        return res.status(200).json({ message: 'Email updated successfully' });
      } 
      
      // else if (patientProfile) {
      //   // Create an object to hold the fields that need to be updated
      //   const updatedFields = {};
      
      //   // Check each field and add to updatedFields if it exists
      //   if (patientProfile.dob) updatedFields.dob = patientProfile.dob;
      //   if (patientProfile.gender) updatedFields.gender = patientProfile.gender;
      //   if (patientProfile.phoneNumber) updatedFields.phoneNumber = patientProfile.phoneNumber;
      //   if (patientProfile.address) updatedFields.address = patientProfile.address;
      //   if (patientProfile.zipCode) updatedFields.zipCode = patientProfile.zipCode;
      //   if (patientProfile.city) updatedFields.city = patientProfile.city;
      //   if (patientProfile.state) updatedFields.state = patientProfile.state;
      //   if (patientProfile.country) updatedFields.country = patientProfile.country;
      //   if (patientProfile.insuranceProvider) updatedFields.insuranceProvider = patientProfile.insuranceProvider;
      //   if (patientProfile.groupNumber) updatedFields.groupNumber = patientProfile.groupNumber;
      //   if (patientProfile.insuranceId) updatedFields.insuranceId = patientProfile.insuranceId;
      //   if (patientProfile.currentMedication) updatedFields.currentMedication = patientProfile.currentMedication;
      //   if (patientProfile.allergies) updatedFields.allergies = patientProfile.allergies;
      //   if (patientProfile.pastSurgeries) updatedFields.pastSurgeries = patientProfile.pastSurgeries;
      
      //   // If there are fields to update, proceed with the update operation
      //   if (Object.keys(updatedFields).length > 0) {
      //     await updateDoc(userDocRef, updatedFields);
      //     return res.status(200).json({ message: 'Patient profile updated successfully' });
      //   } else {
      //     return res.status(400).json({ error: 'No valid fields provided for update' });
      //   }
      // }  
      
      else if (patientProfile) {
        // Create an object to hold the fields that need to be updated
        const updatedFields = {};
    
        // List of fields to check and update
        const fieldsToUpdate = [
            'dob', 'gender', 'phoneNumber', 'address', 'zipCode', 
            'city', 'state', 'country', 'insuranceProvider', 
            'groupNumber', 'insuranceId', 'currentMedication', 
            'allergies', 'pastSurgeries'
        ];
    
        // Loop through each field and add to updatedFields if it exists in the patient profile
        fieldsToUpdate.forEach(field => {
            if (patientProfile[field]) {
                updatedFields[field] = patientProfile[field];
            }
        });
    
        // If there are fields to update, proceed with the update operation
        if (Object.keys(updatedFields).length > 0) {
            try {
                await updateDoc(userDocRef, updatedFields);
                return res.status(200).json({ message: 'Patient profile updated successfully' });
            } catch (error) {
                return res.status(500).json({ error: 'Failed to update patient profile' });
            }
        } else {
            return res.status(400).json({ error: 'No valid fields provided for update' });
        }
    }
      
    } catch (error) {
      console.error('Error updating user details or patient profile:', error);
      return res.status(500).json({ error: 'Failed to update user details or patient profile' });
    }
  }

  if (req.method === 'GET') {
    // GET request handler for fetching user profile
    const { email, username } = req.query;

    // Validate the query parameters
    if (!email || !username) {
      return res.status(400).json({ error: 'Both Email and Username are required.' });
    }

    // Ensure email is in valid format (basic check)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
      // Define Firestore collection and query
      const userRef = collection(db, 'users');
      const userQuery = query(userRef, where('username', '==', username), where('email', '==', email));

      // Fetch the query snapshot
      const querySnapshot = await getDocs(userQuery);

      // Check if user data is found
      if (querySnapshot.empty) {
        console.log(`⚠️ No user found for username: ${username} and email: ${email}`);
        return res.status(404).json({ error: 'User not found.' });
      }

      // Extract user data from the first document
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Prepare response data
      const responseData = {
        profileId: userData.profileId,
        username: userData.username || null,
        email: userData.email || null,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        dob: userData.dob || null,
        gender: userData.gender || null,
        phoneNumber: userData.phoneNumber || null,
        address: userData.address || null,
        zipCode: userData.zipCode || null,
        city: userData.city || null,
        state: userData.state || null,
        country: userData.country || null,
        insuranceProvider: userData.insuranceProvider || null,
        groupNumber: userData.groupNumber || null,
        insuranceId: userData.insuranceId || null,
        currentMedication: userData.currentMedication || null,
        allergies: userData.allergies || null,
        pastSurgeries: userData.pastSurgeries || null,
      };

      // Log successful retrieval of user data
      console.log(`✅ User data retrieved for ${username} (${email})`);

      // Send the profile data as the response
      return res.status(200).json(responseData);
    } catch (error) {
      // Handle any errors during the process
      console.error('❌ Error fetching user profile:', error);
      return res.status(500).json({ error: 'There was an issue retrieving the user profile.' });
    }
  }

  // If method is not GET or PUT
  return res.status(405).json({ error: 'Method not allowed. Use GET or PUT.' });
}
