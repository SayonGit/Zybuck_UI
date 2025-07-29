import React, { useRef, useEffect, useState } from "react";

interface ScrollingImage {
  id: string;
  src: string;
  alt: string;
  className?: string;
}

interface InfiniteScrollImagesProps {
  images: ScrollingImage[];
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

const InfiniteScrollImages: React.FC<InfiniteScrollImagesProps> = ({
  images,
  speed = 20,
  direction = "up",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(600); // Default reasonable height

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current?.parentElement) {
        const parentHeight = containerRef.current.parentElement.clientHeight;
        // Set reasonable bounds: minimum 500px, maximum 700px
        const boundedHeight = Math.max(500, Math.min(parentHeight, 700));
        setContainerHeight(boundedHeight);
      }
    };

    // Delay initial height calculation to allow forms to render
    const timeoutId = setTimeout(updateHeight, 100);

    const resizeObserver = new ResizeObserver(() => {
      // Debounce the height updates to prevent frequent changes
      setTimeout(updateHeight, 50);
    });

    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hidden lg:block w-full ${className}`}
      style={{
        height: `${containerHeight}px`,
        transition: "height 0.3s ease-in-out", // Smooth height transitions
        minHeight: "500px",
        maxHeight: "700px",
      }}
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
              animationDuration: `${speed * 1.2}s`,
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
