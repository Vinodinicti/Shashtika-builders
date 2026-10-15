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
        backgroundColor: '#0A1325',
        backgroundImage: `
          radial-gradient(circle at center, rgba(198, 161, 91, 0.14) 0%, transparent 65%),
          linear-gradient(rgba(198, 161, 91, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(198, 161, 91, 0.05) 1px, transparent 1px),
          radial-gradient(circle at center, #0F1F3D 0%, #0A1325 55%, #050B16 100%)
        `,
        backgroundSize: '100% 100%, 36px 36px, 36px 36px, 100% 100%',
      }}
    >
      <div className="text-center px-4 w-full max-w-md flex flex-col items-center">
        {/* 3D Rotating Logo Cube Loader (Royal Blue & Gold Theme) */}
        <div className="cube-loader-container">
          <div className="cube-loader">
            <div className="cube-top">
              <img
                src="/Images/Shashtika_Emblem.png"
                alt="SHASHTIKA Emblem"
                className="max-w-[82%] max-h-[82%] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
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
                    className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Name SHASHTIKA in Golden Shine like in Header */}
        <div className="flex flex-col items-center justify-center -mt-3 mb-4">
          <span className="logo-title gold-glow-letters text-2xl sm:text-3xl font-heading font-extrabold tracking-[3px] sm:tracking-[4px] leading-tight">
            SHASHTIKA
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[2.5px] text-gold-light uppercase mt-1 opacity-90">
            PLOT DEVELOPERS &amp; BUILDERS
          </span>
        </div>

        {/* Gold Sweep Line */}
        <div className="gold-sweep-line w-full max-w-[280px]">
          <div
            className="gold-sweep-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress % and Status Text */}
        <div className="flex items-center justify-between w-full max-w-[280px] mt-2 font-mono text-[9px] sm:text-[10px] text-gold-antique uppercase font-semibold">
          <span className="tracking-[1.5px] text-gold-light/90">{statusText}</span>
          <span className="text-gold-primary font-bold pl-2">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
