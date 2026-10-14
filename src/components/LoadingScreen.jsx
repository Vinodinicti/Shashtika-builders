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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-espresso-950 transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-4 w-full max-w-md">
        {/* 3D Rotating Logo Cube Loader (Espresso, Bronze & Biscuit Theme) */}
        <div className="cube-loader-container">
          <div className="cube-loader">
            <div className="cube-top">
              <img
                src="/Images/Shashtika_Emblem.png"
                alt="SHASHTIKA Emblem"
                className="max-w-[82%] max-h-[82%] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]"
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
                    className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gold Sweep Line */}
        <div className="gold-sweep-line">
          <div
            className="gold-sweep-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Subtext */}
        <p className="font-mono text-xs tracking-[3px] text-gold-antique uppercase mt-3">
          {statusText}
        </p>
      </div>
    </div>
  );
}
