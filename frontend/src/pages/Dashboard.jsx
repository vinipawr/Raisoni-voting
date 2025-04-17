import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <button onClick={() => navigate('/dashboard')} className="hover:text-indigo-600 text-left">Dashboard</button>
          {role === 'admin' && (
            <>
              <button onClick={() => navigate('/create-election')} className="hover:text-indigo-600 text-left">Create Election</button>
              <button onClick={() => navigate('/manage-elections')} className="hover:text-indigo-600 text-left">Manage Elections</button>
              <button onClick={() => navigate('/user-management')} className="hover:text-indigo-600 text-left">User Management</button>
              <button onClick={() => navigate('/declare-result')} className="hover:text-indigo-600 text-left">Declare Result</button>
              <button onClick={() => navigate('/view-results')} className="hover:text-indigo-600 text-left">View Results</button>
            </>
          )}
          {role === 'voter' && (
            <>
              <button onClick={() => navigate('/vote')} className="hover:text-indigo-600 text-left">Vote</button>
              <button onClick={() => navigate('/my-vote')} className="hover:text-indigo-600 text-left">My Vote</button>
            </>
          )}
          <button onClick={handleLogout} className="text-red-500 hover:text-red-600 text-left">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Active Elections</p>
            <p className="text-2xl font-bold text-indigo-600">2</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Registered Voters</p>
            <p className="text-2xl font-bold text-indigo-600">5</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Completed Elections</p>
            <p className="text-2xl font-bold text-indigo-600">1</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Election Results</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-700">Candidate A</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-blue-600 h-3 rounded" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-gray-700">Candidate B</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-green-500 h-3 rounded" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-gray-700">Candidate C</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-yellow-500 h-3 rounded" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
