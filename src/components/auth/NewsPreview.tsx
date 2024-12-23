import React from 'react';

const PREVIEW_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800',
    title: 'Latest Headlines',
    category: 'Breaking News'
  },
  {
    url: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=800',
    title: 'Market Watch',
    category: 'Business'
  },
  {
    url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800',
    title: 'Tech Today',
    category: 'Technology'
  }
];

export function NewsPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {PREVIEW_IMAGES.map((image, index) => (
        <div
          key={index}
          className="group relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500"
          style={{ 
            animationDelay: `${index * 200}ms`,
            height: '320px'
          }}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-primary/90 text-sm rounded-full mb-3">
              {image.category}
            </span>
            <h3 className="text-xl font-bold mb-2 font-serif">
              {image.title}
            </h3>
            <div className="h-1 w-12 bg-primary/80 rounded transform origin-left transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}