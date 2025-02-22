import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AxeCoreResultTable from "@/components/AxeCoreResultTable";
import Pa11yResultTable from "@/components/Pa11yResultTable";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import CustomMultiSelect from "@/components/CustomMultiSelect";

const tools = [
  { value: "axe-core", label: "Axe-Core" },
  { value: "pa11y", label: "Pa11y" },
];

const Dashboard = () => {
  const router = useRouter();
  const { loggedIn, storedToken } = useContext(AuthContext);
  const [url, setUrl] = useState("");

  // State for selected tools
  const [selectedTools, setSelectedTools] = useState(["axe-core"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  

  const handleLoginRedirect = () => {
    toast.info("Please log in to save results.");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Landing Page
      </h1>
    </div>
  );
};

export default Dashboard;
