import React, { useRef } from "react";

export default function Header() {
  // Ref to the top of the page
  const topRef = useRef(null);

  // Function to handle scroll to top
  const scrollToTop = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={topRef} /> {/* Move this div outside of the header */}
      <header className="fixed top-0 w-full clearNav z-50 bg-white">
        <div className="max-w-5xl mx-auto flex p-5 justify-between items-center">
          <a
            onClick={scrollToTop} // Handle click event directly
            className="text-3xl text-black font-medium cursor-pointer"
          >
            Hackademics
          </a>
          
        </div>
      </header>
    </>
  );
}
