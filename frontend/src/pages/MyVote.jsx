import React, { useEffect, useState } from 'react';

const MyVote = () => {
  const [votes, setVotes] = useState({});
  const [elections, setElections] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchElections = async () => {
      const res = await fetch('http://localhost:5000/api/elections');
      const data = await res.json();
      setElections(data);

      // Load voted data from localStorage
      const savedVotes = localStorage.getItem('votedElections');
      if (savedVotes) {
        setVotes(JSON.parse(savedVotes));
      }
    };

    fetchElections();
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Votes</h1>
      {elections.map((election) => (
        <div key={election._id} className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">{election.title}</h2>
          {votes[election._id] ? (
            <p className="text-green-600 font-medium">You voted for: {votes[election._id]}</p>
          ) : (
            <p className="text-gray-500">You have not voted in this election.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyVote;
