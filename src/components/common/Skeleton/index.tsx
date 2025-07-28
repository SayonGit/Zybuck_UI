import React from "react";

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  height = "h-4",
  width = "w-full",
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="space-y-4">
        <Skeleton height="h-6" width="w-3/4" />
        <Skeleton height="h-4" width="w-1/2" />
        <div className="space-y-2">
          <Skeleton height="h-4" />
          <Skeleton height="h-4" width="w-5/6" />
        </div>
        <div className="flex gap-2">
          <Skeleton height="h-8" width="w-20" />
          <Skeleton height="h-8" width="w-24" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonFilter: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <Skeleton height="h-5" width="w-1/3" className="mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton height="h-4" width="w-4" />
            <Skeleton height="h-4" width="w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonSearchResults: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
