import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://rogue0707.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setStatus('Sending...');

    try {
      // 1. Save form data to database
      const contactRes = await axios.post(`${API_URL}/api/add`, formData);

      // 2. Send email with the same data
      const emailRes = await axios.post(`${API_URL}/api/send-email`, formData);

      toast.success('Form submitted successfully!');
      setStatus('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission Error:', err);
      toast.error(err?.response?.data?.message || 'Submission failed. Please try again.');
      setStatus('Failed to send message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-10/12 h-[75vh] m-auto pb-10 pt-5'>
      <p><strong className='text-xl font-medium block text-[#A9ABAE] text-center mb-6'>CONTACT US</strong></p>
      <p><strong className='text-xs text-center mb-10 block text-[#A9ABAE]'>Have any questions? We'd love to hear from you.</strong></p>

      <div className='flex flex-col md:flex-row justify-between gap-10'>
        <div className='md:w-1/2'>
          <p><strong className='text-base mb-2 block text-[#A9ABAE]'>GET IN TOUCH</strong></p>
          <p className='text-xs my-6 block text-[#A9ABAE]'>Reach out to us via email or phone, and our team will get back to you as soon as possible.</p>
          <p className='text-[#A9ABAE] text-xs'><strong>Email:</strong> <a href='mailto:info@rogue0707.com' className='hover:underline'>info@rogue0707.com</a></p>
          <p className='text-[#A9ABAE] text-xs'><strong>Phone:</strong> +91 8989280707</p>
          <p className='text-[#A9ABAE] text-xs'><strong>Address:</strong> B-5D 70 Rama Road, Industrial Area, Kirti Nagar, New Delhi, 110015</p>
        </div>

        <div className='md:w-1/2'>
          <p><strong className='text-base mb-2 block text-[#A9ABAE]'>SEND A MESSAGE</strong></p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <input 
                type='text' 
                name='name'
                autoComplete="off"
                placeholder='Your Name' 
                value={formData.name} 
                onChange={handleChange} 
                className={`border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 text-[#A9ABAE] text-xs focus:outline-none w-full`}
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
            </div>

            <div>
              <input 
                type='email' 
                name='email'
                autoComplete="off"
                placeholder='Your Email' 
                value={formData.email} 
                onChange={handleChange} 
                className={`border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 text-[#A9ABAE] text-xs focus:outline-none w-full`}
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
            </div>

            <div>
              <textarea 
                name='message'
                placeholder='Your Message' 
                rows='4' 
                value={formData.message} 
                onChange={handleChange} 
                className={`border-b ${errors.message ? 'border-red-500' : 'border-gray-300'} p-2 text-[#A9ABAE] text-xs focus:outline-none w-full`}
              />
              {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message}</p>}
            </div>

            <button 
              type='submit' 
              disabled={isLoading}
              className={`text-sm inline-block px-4 py-2 bg-[#605B55] text-[#D2D3D5] rounded-md cursor-pointer ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#504B45]'
              }`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <p className='text-[#D2D3D5] text-xs mt-2'>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
