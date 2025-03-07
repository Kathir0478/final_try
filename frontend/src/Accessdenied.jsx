import React from "react";
import { useNavigate } from "react-router-dom";

const Accessdenied = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
            <h1 className="text-3xl font-bold text-white">Access <span className="text-red-500">Denied</span></h1>
            <p className="text-gray-600 mt-2">You are not authorized to view this page.</p>
            <button onClick={() => navigate("/login")} className="mt-4 p-2 bg-green-500 text-white rounded shadow-lg shadow-green-500">
                Go to Login
            </button>
        </div>
    );
};

export default Accessdenied;
