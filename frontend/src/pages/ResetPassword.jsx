import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`https://rogue0707.com/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successful');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful reset
        }, 2000);
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className='flex h-[80vh] items-center justify-center  p-6'>
      <div className='w-full max-w-md p-8  rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-[#A9ABAE]  text-center mb-6'>Reset Password</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            className='w-full border border-gray-300 text-[#A9ABAE]  text-sm rounded-lg px-4 py-2 focus:outline-none placeholder-gray-500'
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className='w-full border text-[#A9ABAE]  text-sm  border-gray-300 rounded-lg px-4 py-2 focus:outline-none  placeholder-gray-500'
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type='submit'
            className='w-full bg-[#605B55]  px-2 mt-3 text-[#D2D3D5]  py-2 rounded-lg text-lg font-semibold  transition'
          >
            Reset Password
          </button>
        </form>
        {message && <p className='text-center text-[#A9ABAE] mt-4'>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;