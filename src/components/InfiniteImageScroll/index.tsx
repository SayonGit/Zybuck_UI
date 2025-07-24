import React from "react";

interface ScrollingImage {
  id: string;
  src: string;
  alt: string;
  className?: string;
}

interface InfiniteScrollImagesProps {
  images: ScrollingImage[];
  speed?: number; // Duration in seconds for one complete cycle
  direction?: "up" | "down";
  className?: string;
}

const InfiniteScrollImages: React.FC<InfiniteScrollImagesProps> = ({
  images,
  speed = 20,
  direction = "up",
  className = "",
}) => {
  return (
    <div
      className={`hidden lg:block min-h-half-screen max-h-[60vh] ${className}`}
    >
      <div className="grid grid-cols-2 gap-4 h-full overflow-hidden">
        {/* Left Column - Larger images */}
        <div className="relative h-full overflow-hidden">
          <div
            className="flex flex-col space-y-4 animate-scroll-left"
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "up" ? "normal" : "reverse",
            }}
          >
            {/* First set of images */}
            {images.slice(0, Math.ceil(images.length / 2)).map((image) => (
              <div
                key={`left-1-${image.id}`}
                className={`rounded-2xl h-48 shadow-lg overflow-hidden flex-shrink-0 ${
                  image.className || ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {images.slice(0, Math.ceil(images.length / 2)).map((image) => (
              <div
                key={`left-2-${image.id}`}
                className={`rounded-2xl h-64 shadow-lg overflow-hidden flex-shrink-0 ${
                  image.className || ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Smaller images with offset */}
        <div className="relative h-full overflow-hidden">
          <div
            className="flex flex-col space-y-4 pt-8 animate-scroll-right"
            style={{
              animationDuration: `${speed * 1.2}s`, // Slightly different speed for variety
              animationDirection: direction === "up" ? "reverse" : "normal",
            }}
          >
            {/* First set of images */}
            {images.slice(Math.ceil(images.length / 2)).map((image) => (
              <div
                key={`right-1-${image.id}`}
                className={`rounded-2xl h-48 shadow-lg overflow-hidden flex-shrink-0 ${
                  image.className || ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {images.slice(Math.ceil(images.length / 2)).map((image) => (
              <div
                key={`right-2-${image.id}`}
                className={`rounded-2xl h-48 shadow-lg overflow-hidden flex-shrink-0 ${
                  image.className || ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollImages;
