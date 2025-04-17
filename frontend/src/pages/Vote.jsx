import React, { useEffect, useState } from 'react';

const Vote = () => {
  const [elections, setElections] = useState([]);
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('votedElections');
    return saved ? JSON.parse(saved) : {};
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchElections = async () => {
      const res = await fetch('http://localhost:5000/api/elections');
      const data = await res.json();
      setElections(data);
    };
    fetchElections();
  }, []);

  const handleVote = async (electionId, candidateName) => {
    const res = await fetch('http://localhost:5000/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ electionId, candidateName })
    });

    const data = await res.json();

    if (res.ok) {
      const newSelected = { ...selected, [electionId]: candidateName };
      setSelected(newSelected);
      localStorage.setItem('votedElections', JSON.stringify(newSelected));
      alert('Vote cast successfully!');
    } else {
      alert(data.msg || 'You already voted!');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-center mb-6">Available Elections</h1>
      {elections.map((election) => (
        <div key={election._id} className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">{election.title}</h2>
          {election.candidates.map((candidate, i) => {
            const alreadyVoted = selected[election._id];
            return (
              <button
                key={i}
                onClick={() => handleVote(election._id, candidate.name)}
                className={`block w-full text-left p-2 my-1 rounded ${
                  alreadyVoted
                    ? candidate.name === alreadyVoted
                      ? 'bg-green-300 text-white cursor-default'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}
                disabled={!!alreadyVoted}
              >
                {candidate.name} {candidate.name === alreadyVoted ? '✔️ Voted' : ''}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Vote;
