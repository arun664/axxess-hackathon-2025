// components/ScheduleZoomMeeting.js
import { useState } from "react";
import { scheduleZoomMeeting } from "../services/zoom";

export default function ScheduleZoomMeeting({ zoomUserId }) {
  const [meetingLink, setMeetingLink] = useState("");

  const handleScheduleMeeting = async () => {
    try {
      const meeting = await scheduleZoomMeeting(
        zoomUserId,
        new Date().toISOString(),
        30, // Duration in minutes
        "Doctor-Patient Consultation"
      );
      setMeetingLink(meeting.join_url);
      alert("Zoom meeting scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to schedule meeting.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule Zoom Meeting</h1>
      <button
        onClick={handleScheduleMeeting}
        className="bg-pink-500 text-white p-2 rounded mb-4"
      >
        Schedule Meeting
      </button>
      {meetingLink && (
        <div className="mb-4">
          <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-pink-500">
            Join Zoom Meeting
          </a>
        </div>
      )}
    </div>
  );
}