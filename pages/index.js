import { useState } from "react";
import { FaBell, FaBrain, FaComments } from "react-icons/fa";

const tools = [
  { value: "axe-core", label: "Axe-Core" },
  { value: "pa11y", label: "Pa11y" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl w-full p-6 mx-auto">
      {/* About Us Section */}
      <section>
        <h2 className="mt-2 text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
          Empowering Patients Through Technology
        </h2>
        <p className="mt-4 max-w-2xl text-xl leading-7 text-black dark:text-white">
          Our platform revolutionizes home healthcare by providing innovative
          tools for patient engagement, personalized care, and seamless
          communication. From dosage reminders to AI-driven health insights, we
          empower patients to take control of their health journey.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Key Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Dosage Reminders */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
            <FaBell className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Smart Dosage Reminders
            </h4>
            <p className="text-lg text-black dark:text-white mt-4">
              Customizable reminders via SMS, email, or voice assistants like
              Alexa to ensure patients never miss a dose.
            </p>
          </div>

          {/* Feature 2: AI-Powered Insights */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
            <FaBrain className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              AI-Driven Health Insights
            </h4>
            <p className="text-lg text-black dark:text-white mt-4">
              Personalized diet and health strategies based on patient medical
              history, powered by Mistral AI.
            </p>
          </div>

          {/* Feature 3: Real-Time Communication */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
            <FaComments className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Real-Time Communication
            </h4>
            <p className="text-lg text-black dark:text-white mt-4">
              AI-transcribed meeting summaries and regular follow-ups to track
              patient health status via voice or text input.
            </p>
          </div>
        </div>
      </section>

      {/* GitHub Repository Link */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          GitHub Repository
        </h3>
        <p className="mt-4 text-lg leading-7 text-black dark:text-white">
          Explore our code and contribute to the project on GitHub:{" "}
          <a
            href="https://github.com/arun664/axxess-hackathon-2025.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-semibold"
          >
            AxxessHealth
          </a>
        </p>
      </section>
    </div>
  );
}
