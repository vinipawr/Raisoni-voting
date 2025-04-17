import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { io } from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const socket = io('http://localhost:5000');

const ViewResults = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch('http://localhost:5000/api/elections');
      const data = await res.json();
      setElections(data);
    };

    fetchResults();

    socket.on('voteUpdate', (updatedElection) => {
      setElections((prev) =>
        prev.map((e) => (e._id === updatedElection._id ? updatedElection : e))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen p-6 bg-purple-50">
      <h1 className="text-2xl font-bold text-center mb-6">Live Election Results</h1>
      {elections.map((election) => {
        const labels = election.candidates.map((c) => c.name);
        const votes = election.candidates.map((c) => c.votes);

        const data = {
          labels,
          datasets: [
            {
              label: 'Votes',
              data: votes,
              backgroundColor: 'rgba(99, 102, 241, 0.6)'
            }
          ]
        };

        return (
          <div key={election._id} className="bg-white p-4 rounded shadow mb-8 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">{election.title}</h2>
            <Bar data={data} />
          </div>
        );
      })}
    </div>
  );
};

export default ViewResults;
