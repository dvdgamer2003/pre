import React from 'react';

export function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Newspaper texture overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=1800')] bg-cover opacity-10" />
      
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="https://cdn.coverr.co/videos/coverr-newspaper-printing-5162/1080p.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
    </div>
  );
}