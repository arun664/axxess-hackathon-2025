import { useState, useEffect } from 'react';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null); // Store original profile
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const encodedUsername = encodeURIComponent(username);
        const encodedEmail = encodeURIComponent(email);

        // Update URL to match the correct endpoint
        const response = await fetch(`/api/user/${encodedUsername}?email=${encodedEmail}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfile(data); // Set the fetched profile data to state
        setOriginalProfile(data); // Store the original profile for comparison
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    if (!originalProfile) return;

    setIsEditing(false);

    // Collect only the fields that have changed
    const updatedFields = {};
    Object.keys(profile).forEach((key) => {
      if (profile[key] !== originalProfile[key]) {
        updatedFields[key] = profile[key];
      }
    });
  
    if (Object.keys(updatedFields).length === 0) {
      alert('No changes to update');
      return;
    }
  
    try {
      const username = localStorage.getItem('username');
      const encodedUsername = encodeURIComponent(username);
      const response = await fetch(`/api/user/${encodedUsername}`, {  
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientProfile: updatedFields }), // Send only updated fields
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      const data = await response.json();
      alert('Profile updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };
    
//   const handleUpdate = async () => {
//     setIsEditing(false);
//     try {
//       // Update URL to match the correct endpoint
//     //   const profileId = localStorage.getItem('profileId');
//     //   const encodedprofileId = encodeURIComponent(profileId);
//       const username = localStorage.getItem('username');
//       const encodedUsername = encodeURIComponent(username);
//       const response = await fetch(`/api/user/${encodedUsername}`, {  // Corrected endpoint URL
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profile),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }
  
//       const data = await response.json();
//       alert('Profile updated successfully');
//     } catch (error) {
//       setError(error.message); // Set error if update fails
//     }
//   };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patient Profile</h2>
      <form>
        {/* Profile ID (read-only) */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-white">Profile ID</label>
          <input
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            type="text"
            name="profileId"
            value={profile.profileId}
            disabled
          />
        </div>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-white">Username</label>
          <input
            className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {/* Date of Birth (DOB) */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-white">Date of Birth (DOB)</label>
          <input
            className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-white">Gender</label>
          <input
            className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-white">Phone Number</label>
          <input
            className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {/* Address */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
          <div className="mb-4">
            <label className="block text-gray-900 dark:text-white">Address</label>
            <input
              className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 dark:text-white">Zip Code</label>
            <input
              className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
              type="text"
              name="zipCode"
              value={profile.zipCode}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 dark:text-white">City</label>
            <input
              className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 dark:text-white">State</label>
            <input
              className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
              type="text"
              name="state"
              value={profile.state}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 dark:text-white">Country</label>
            <input
              className={`w-full p-2 border rounded ${isEditing ? 'border-blue-500' : 'border-gray-300'} dark:${isEditing ? 'border-blue-400' : 'border-gray-600'} text-gray-900 dark:text-white ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}
              type="text"
              name="country"
              value={profile.country}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-between">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && (
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
