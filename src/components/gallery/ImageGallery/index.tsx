import React from "react";

const ImageGallery: React.FC = () => {
  const images = [
    { id: 1, src: "/api/placeholder/300/200", alt: "Destination 1" },
    { id: 2, src: "/api/placeholder/300/300", alt: "Destination 2" },
    { id: 3, src: "/api/placeholder/300/200", alt: "Destination 3" },
    { id: 4, src: "/api/placeholder/300/250", alt: "Destination 4" },
    { id: 5, src: "/api/placeholder/300/200", alt: "Destination 5" },
  ];

  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="space-y-4">
          {images.slice(0, 2).map((image) => (
            <div
              key={image.id}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {images.slice(2).map((image) => (
            <div
              key={image.id}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
