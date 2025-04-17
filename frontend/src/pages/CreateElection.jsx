import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateElection = () => {
  const [title, setTitle] = useState('');
  const [candidates, setCandidates] = useState(['', '']);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const addCandidate = () => {
    setCandidates([...candidates, '']);
  };

  const updateCandidate = (index, value) => {
    const list = [...candidates];
    list[index] = value;
    setCandidates(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/elections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ title, candidates })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Election created!');
      navigate('/dashboard');
    } else {
      alert(data.msg || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Election</h2>
        <input
          type="text"
          placeholder="Election Title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <h3 className="font-semibold mb-2">Candidates:</h3>
        {candidates.map((name, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Candidate ${index + 1}`}
            className="w-full p-2 mb-2 border rounded"
            value={name}
            onChange={(e) => updateCandidate(index, e.target.value)}
            required
          />
        ))}

        <button type="button" onClick={addCandidate} className="text-blue-500 mb-4 underline">
          + Add Candidate
        </button>

        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
          Create Election
        </button>
      </form>
    </div>
  );
};

export default CreateElection;
