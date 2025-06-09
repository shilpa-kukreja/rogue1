import React, { useState, useEffect } from 'react';

const DealTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [dealExpired, setDealExpired] = useState(false);

  useEffect(() => {
    // Set the date we're counting down to: June 10, 2025, 00:00:00
    // Month is 0-indexed, so June is 5
    const countDownDate = new Date(2025, 5, 17, 0, 0, 0).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        setDealExpired(true);
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

    // Initial call to display the timer immediately
    updateCountdown();

    // Update the countdown every 1 second
    const timerInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="h-[80vh] flex items-center justify-center  bg-cover bg-center bg-fixed bg-no-repeat" 
         style={{ backgroundImage: "url('background.png')" }}>
      <div className=" bg-opacity-30   backdrop-saturate-150  max-w-3xl w-full">
        {dealExpired ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 font-orbitron text-yellow-400 tracking-wider">
              DEAL EXPIRED
            </h1>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20">
              <p className="text-2xl text-yellow-400 text-center">The deal has expired!</p>
            </div>
          </>
        ) : (
          <>
            {/* <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 font-orbitron text-yellow-400 tracking-wider glow">
              EXCLUSIVE OFFER ENDS SOON!
            </h1> */}
            
            <div className="flex justify-center mb-8 md:mb-10">
              <div className="flex flex-col md:flex-row items-center  bg-opacity-10   rounded-xl ">
                <TimeSegment value={timeLeft.days} label="Days"  />
                <Separator />
                <TimeSegment value={timeLeft.hours} label="Hours" />
                <Separator />
                <TimeSegment value={timeLeft.minutes} label="Minutes" />
                <Separator />
                <TimeSegment value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>
            
           
          </>
        )}
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