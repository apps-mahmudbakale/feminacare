import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { doctor, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f8] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#b5106a] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#584048]">Loading secure portal…</p>
        </div>
      </div>
    );
  }

  if (!doctor) return <Navigate to="/doctor/login" replace />;
  return children;
}
