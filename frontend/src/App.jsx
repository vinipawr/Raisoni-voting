import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">Raisoni Voting System</h1>
        <p className="text-gray-600 mb-8">Secure and Transparent College Elections</p>
        
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-100 transition"
          >
            Register
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-1 font-medium">Default Admin Login:</p>
          <p>Email: <span className="font-mono text-gray-700">admin@raisoni.edu</span></p>
          <p>Password: <span className="font-mono text-gray-700">admin123</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
