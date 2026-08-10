import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // ◄── Supabase client connect kiya

export default function Signup({ onBackToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('parent'); // Default entry role 'parent'
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 📤 DATABASE ME DATA INSERT: user ki nayi row data entry real table mein upload ho rahi hai
      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
                username: username.toLowerCase().trim(), 
                password: password, 
                role: role,
                full_name: username, // For now, using username as full name layout fallback
                email: email
              }
        ]);

      if (error) {
        alert('Signup Error: ' + error.message);
      } else {
        alert('Account Created Successfully on Supabase Cloud! 🎉 You can now log in.');
        onBackToLogin(); // Successful hone par wapas Login screen par bhej dega
      }
    } catch (err) {
      console.error(err);
      alert('Network upload failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form_main flex flex-col p-6 gap-4 bg-white max-w-sm rounded-xl">
      <p className="heading text-xl font-bold text-purple-700 text-center">Create New Account</p>
      
      <div className="inputContainer flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Choose Username ID</label>
        <input 
          type="text" 
          placeholder="Choose a single-word name (e.g., geeta)..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2.5 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-purple-600"
          required
        />
      </div>
      
      <div className="inputContainer flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Set Access Password</label>
        <input 
          type="password" 
          placeholder="Create password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2.5 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-purple-600"
          required
        />
      </div>

      <div className="inputContainer flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Email Address</label>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2.5 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-purple-600"
          required
        />
      </div>

      {/* 💡 Role Selection Dropdown: Isse entry direct sahi dashboard se link ho jayegi */}
      <div className="inputContainer flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Select Portal Clearance</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="border p-2.5 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-purple-600"
        >
          <option value="parent">Parent Workspace</option>
          <option value="volunteer">Volunteer Unit</option>
          <option value="admin">NGO Admin Command</option>
        </select>
      </div>
                
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 rounded-xl text-sm shadow cursor-pointer mt-2 disabled:opacity-50"
      >
        {isLoading ? 'Creating Cloud Rows...' : 'Complete Global Signup'}
      </button>
    </form>
  );
}
