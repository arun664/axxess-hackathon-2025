// pages/api/zoom/callback.js
import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Authorization code is required" });
  }

  try {
    // Exchange authorization code for access token
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.ZOOM_REDIRECT_URI,
        },
        auth: {
          username: process.env.ZOOM_OAUTH_CLIENT_ID,
          password: process.env.ZOOM_OAUTH_CLIENT_SECRET,
        },
      }
    );

    const { access_token } = response.data;

    // Fetch the user's Zoom User ID
    const userResponse = await axios.get("https://api.zoom.us/v2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const zoomUserId = userResponse.data.id;

    // Save the Zoom User ID to Firestore or session
    // Example: Save to Firestore
    // await saveZoomUserId(userId, zoomUserId);

    // Redirect to the home page or a success page
    res.redirect("/");
  } catch (error) {
    console.error("Error handling Zoom OAuth callback:", error);
    res.status(500).json({ message: "Error handling Zoom OAuth callback" });
  }
}