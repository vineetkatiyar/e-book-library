import { Skeleton } from "@/components/ui/skeleton";

export default function BookLoadingSkeleton() {
  // Different skeleton variations for more natural look
  const skeletonVariations = [
    { titleWidth: "w-full", authorWidth: "w-3/4" },
    { titleWidth: "w-11/12", authorWidth: "w-2/3" },
    { titleWidth: "w-full", authorWidth: "w-4/5" },
    { titleWidth: "w-10/12", authorWidth: "w-3/4" },
    { titleWidth: "w-full", authorWidth: "w-2/3" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => {
        const variation = skeletonVariations[index % skeletonVariations.length];
        
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden book-text animate-pulse"
          >
            {/* Square Image Skeleton */}
            <div className="relative w-full aspect-square">
              <Skeleton className="w-full h-full rounded-none bg-gray-200" />
            </div>
            
            <div className="p-4 space-y-3">
              {/* Title Skeleton */}
              <Skeleton className={`h-5 ${variation.titleWidth} rounded-md bg-gray-200`} />
              
              {/* Author Skeleton */}
              <Skeleton className={`h-4 ${variation.authorWidth} rounded-md bg-gray-200`} />
              
              {/* Button Skeleton */}
              <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
            </div>
          </div>
        );
      })}
    </div>
  );
}