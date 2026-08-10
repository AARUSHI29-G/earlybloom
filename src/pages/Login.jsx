import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // ◄── Supabase client connect kiya

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

    try {
      // 📥 DATABASE SE USER FETCH: profiles table se exact username match dhoond rahe hain
      const { data, error } = await supabase
        .from('profiles')
        .select('username, password, role')
        .eq('username', username.toLowerCase().trim())
        .single();

      if (error || !data) {
        alert('User record not found in database! Please signup first.');
        setIsLoading(false);
        return;
      }

      // Password Verification
      if (data.password === password) {
        alert(`Welcome back, ${data.username}! 🎉`);
        onLoginSuccess({
            username: data.username,
            role: data.role.toLowerCase().trim()
        }); // User role direct App.jsx ko bhej diya
      } else {
        alert('Incorrect password! Authentication failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Network pipeline communication issue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form_main flex flex-col p-6 gap-4 bg-white max-w-sm rounded-xl">
      <p className="heading text-xl font-bold text-gray-800 text-center">EarlyBloom Portal Login</p>
      
      <div className="inputContainer flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Username ID</label>
        <input 
          type="text" 
          placeholder="Enter username (e.g., sita, rahul)..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2.5 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-purple-600"
          required
        />
      </div>
      
      <div className="inputContainer flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Password</label>
        <input 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2.5 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-purple-600"
          required
        />
      </div>
                
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 rounded-xl text-sm shadow cursor-pointer mt-2 disabled:opacity-50"
      >
        {isLoading ? 'Verifying Credentials...' : 'Login Account'}
      </button>
    </form>
  );
}
