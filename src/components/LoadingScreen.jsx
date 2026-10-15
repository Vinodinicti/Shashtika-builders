import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING MASTER PLAN...');
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next === 35) {
          setStatusText('TAMILNADU NO 1 BIGGEST FARM PLOTS');
        } else if (next === 70) {
          setStatusText('WELCOME TO SHASHTIKA DEVELOPMENTS');
        } else if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setHidden(true);
              if (onLoaded) onLoaded();
            }, 350);
          }, 250);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="text-center px-4 w-full max-w-md flex flex-col items-center">
        {/* 3D Rotating Logo Cube Loader (White Cube & Red Logo) */}
        <div className="cube-loader-container">
          <div className="cube-loader">
            <div className="cube-top">
              <img
                src="/Images/Shashtika_Emblem.png"
                alt="SHASHTIKA Emblem"
                className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_4px_12px_rgba(211,47,47,0.22)]"
              />
            </div>
            <div className="cube-wrapper">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="cube-span"
                  style={{ '--i': idx }}
                >
                  <img
                    src="/Images/Shashtika_Emblem.png"
                    alt="SHASHTIKA Logo"
                    className="max-w-[88%] max-h-[88%] object-contain drop-shadow-[0_4px_12px_rgba(211,47,47,0.22)] pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Name SHASHTIKA */}
        <div className="flex flex-col items-center justify-center -mt-2 mb-3">
          <span className="font-heading font-black text-2xl sm:text-3xl tracking-[4px] leading-tight text-[#1A0709]">
            SHASHTIKA
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[2.5px] text-[#C5221F] uppercase mt-1 font-extrabold">
            PLOT DEVELOPERS &amp; BUILDERS
          </span>
        </div>

        {/* Sweep Progress Line */}
        <div className="w-full max-w-[280px] h-[3px] bg-neutral-200 rounded-full overflow-hidden my-2.5">
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #E53935, #C62828)'
            }}
          />
        </div>

        {/* Progress % and Status Text */}
        <div className="flex items-center justify-between w-full max-w-[280px] mt-1 font-mono text-[9px] sm:text-[10px] text-espresso-800 uppercase font-bold">
          <span className="tracking-[1px] text-espresso-700">{statusText}</span>
          <span className="text-[#C5221F] font-black pl-2">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
