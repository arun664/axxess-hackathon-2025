// services/zoom.js
import { collection, addDoc, setDoc, doc } from "firebase/firestore/lite";
import { db } from "@/config/firebaseConfig"; // Adjust the import path

// Save Zoom User ID to Firestore
export const saveZoomUserId = async (userId, zoomUserId) => {
  try {
    await setDoc(doc(db, "users", userId), {
      zoomUserId,
    });
  } catch (error) {
    console.error("Error saving Zoom User ID:", error);
    throw error;
  }
};

// services/zoom.js
export const scheduleZoomMeeting = async (zoomUserId, startTime, duration, topic) => {
    try {
      const accessToken = await getZoomAccessToken();
      const response = await axios.post(
        `https://api.zoom.us/v2/users/${zoomUserId}/meetings`,
        {
          topic,
          type: 2, // Scheduled meeting
          start_time: startTime,
          duration,
          settings: {
            auto_recording: "cloud", // Enable cloud recording
            transcription: true, // Enable transcription
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error scheduling Zoom meeting:", error);
      throw error;
    }
  };