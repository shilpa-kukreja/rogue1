import React, { useState, useEffect, useContext } from 'react';
import { RiLock2Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';

const DealTimer = ({ onDealEnd }) => {
  const { setTimerExpire, timerExpire } = useContext(ShopContext);

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://rogue0707.com/api/subscribe", { email });
      toast(response.data.message, {
        style: {
          background: '#605B55',
          color: '#A9ABAE',
          width: '300px',
          fontSize: '10px',
          borderRadius: '8px',
          fontFamily: "'Andale Mono', monospace"
        },
        progressStyle: {
          background: '#5C4033',
        },
      });
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed");
    }
  };

  useEffect(() => {
    const countDownDate = new Date(2025, 6, 5, 17, 38, 0).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        setTimerExpire(true);
        if (onDealEnd) onDealEnd();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? `0${days}` : days.toString(),
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
      });
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerInterval);
  }, [onDealEnd, setTimerExpire]);

  if (timerExpire) return null; // ✅ Don't render anything if timer expired

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('background.png')" }}>
      <div className="bg-opacity-30 backdrop-saturate-150 max-w-3xl w-full">

        <div className="flex justify-center mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row items-center bg-opacity-10 rounded-xl">
            <TimeSegment value={timeLeft.days} label="Days" />
            <Separator />
            <TimeSegment value={timeLeft.hours} label="Hours" />
            <Separator />
            <TimeSegment value={timeLeft.minutes} label="Minutes" />
            <Separator />
            <TimeSegment value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'> 
          <p className="text-[15px] text-[#63605c] font-bold text-center tracking-widest mb-4">"0707 BLACKLIST"</p>

          <form
            onSubmit={handleSubmit}
            className="w-[280px] sm:w-[340px] flex items-center gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="flex-1 px-3 py-0.5 rounded-full bg-[#40403e] text-[#A9ABAE] placeholder-[#A9ABAE] focus:outline-none"
            />
            <button
              type="submit"
              className="text-3xl text-[#40403e]"
            >
              <RiLock2Fill />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

const TimeSegment = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center px-4 md:px-6 py-2 min-w-[70px] md:min-w-[90px]">
    <span className="font-orbitron text-4xl md:text-6xl font-bold text-[#63605c] mb-1 md:mb-2 glow">
      {value}
    </span>
    <span className="text-xs md:text-sm uppercase tracking-wider text-[#63605c]">
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span className="font-orbitron text-4xl md:text-5xl text-[#63605c] text-opacity-50 flex items-center px-2 md:px-3">
    :
  </span>
);

export default DealTimer;
