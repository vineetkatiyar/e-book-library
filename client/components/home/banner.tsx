// components/Banner.tsx
import Image from "next/image";

const Banner = () => {
  return (
    <section className="w-full">
      {/* Desktop Banner - Only shows on md screens and above */}
      <div className="hidden md:block max-w-5xl mx-auto py-6">
        <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <Image
            src="/desktop.png"
            alt="Discover Amazing Books - Desktop Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Mobile Banner - Only shows on small screens */}
      <div className="block md:hidden w-full py-4">
        <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <Image
            src="/mobile.png"
            alt="Discover Amazing Books - Mobile Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
