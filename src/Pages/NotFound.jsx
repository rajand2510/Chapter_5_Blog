import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-white text-black">
      <h1 className="text-9xl font-extrabold animate-pulse drop-shadow-lg">404</h1>
      <p className="text-3xl mt-4 font-mono tracking-tight animate-bounce">
        Page Not Found!
      </p>
      <p className="text-lg mt-3 opacity-60 font-light">
        Seems like you're lost in space!
      </p>
      <a
        href="/"
        className="mt-8 px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;