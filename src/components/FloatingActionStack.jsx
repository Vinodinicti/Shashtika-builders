import React from 'react';

export default function FloatingActionStack() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5">
      {/* Call Button */}
      <a
        href="tel:+919842212345"
        className="group relative w-12 h-12 rounded-full bg-espresso-950/90 border-[1.5px] border-gold-primary text-gold-light hover:bg-gold-primary hover:text-espresso-950 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105"
        title="Call Us (+91 98422 12345)"
        aria-label="Call Us Direct"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-14 px-3 py-1.5 rounded bg-espresso-950 border border-gold-border text-cream text-[11px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Call Us (+91 98422 12345)
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919363599754?text=Hello%20SHASHTIKA,%20I%20want%20to%20enquire%20about%20plots"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 rounded-full bg-espresso-950/90 border-[1.5px] border-gold-primary text-gold-light hover:bg-gold-primary hover:text-espresso-950 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-14 px-3 py-1.5 rounded bg-espresso-950 border border-gold-border text-cream text-[11px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
