import React from 'react';

export const HoneycombBanner: React.FC = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#0d3b66] via-[#1a4a75] to-[#0e3357] overflow-hidden py-4 sm:py-6 shadow-md border-y border-blue-900/40">
      {/* Background subtle hexagon pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Hexagonal Mosaic Grid Container matching official portal */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-44 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center">
          {/* Hexagon 1: Telecom Tower (Leftmost) */}
          <div className="absolute left-[3%] sm:left-[6%] md:left-[8%] top-1/2 -translate-y-1/2 w-28 sm:w-36 md:w-44 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-52 z-10 transition-transform duration-300 hover:scale-105">
            <div
              className="w-full h-full relative overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                alt="Telecommunications Infrastructure"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
          </div>

          {/* Hexagon 2: Cargo Shipping Containers & Cranes */}
          <div className="absolute left-[20%] sm:left-[24%] md:left-[26%] top-1/2 -translate-y-1/2 w-28 sm:w-36 md:w-44 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-52 z-20 transition-transform duration-300 hover:scale-105">
            <div
              className="w-full h-full relative overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                alt="Logistics and Freight Shipping Containers"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
          </div>

          {/* Hexagon 3: Automotive Assembly & Manufacturing (Center) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-32 sm:w-40 md:w-48 lg:w-54 h-36 sm:h-44 md:h-54 lg:h-60 z-30 transition-transform duration-300 hover:scale-105">
            <div
              className="w-full h-full relative overflow-hidden shadow-2xl border-2 sm:border-4 border-white"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Automotive Industrial Manufacturing"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Hexagon 4: Textile Machinery Loom Rollers */}
          <div className="absolute right-[20%] sm:right-[24%] md:right-[26%] top-1/2 -translate-y-1/2 w-28 sm:w-36 md:w-44 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-52 z-20 transition-transform duration-300 hover:scale-105">
            <div
              className="w-full h-full relative overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                alt="Textile & Paper Processing Manufacturing"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
          </div>

          {/* Hexagon 5: Professional Female Accountant on GST Computer (Rightmost) */}
          <div className="absolute right-[3%] sm:right-[6%] md:right-[8%] top-1/2 -translate-y-1/2 w-28 sm:w-36 md:w-44 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-52 z-10 transition-transform duration-300 hover:scale-105">
            <div
              className="w-full h-full relative overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Tax Professional Filing Returns on Computer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
