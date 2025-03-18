'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <h1 className='font-serif text-xl text-blue-700 p-4 font-bold'>NextGenStore</h1>

            {!isLoggedIn ? (
                <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
                    <h2 className="text-xl font-bold mb-4 text-gray-300">Login</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-black"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                        Login
                    </button>
                </form>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-xl font-bold text-gray-400">Welcome, {username}!</p>
                    <div className="w-16 h-16 bg-gray-300 rounded-full mt-4 flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
                        Logout
                    </button>
                </div>
            )}
            <button onClick={() => router.push('/')} className="mt-4 px-4 py-2 bg-gray-400 rounded-md">Back</button>
        </div>
    );
};

export default LoginForm;
