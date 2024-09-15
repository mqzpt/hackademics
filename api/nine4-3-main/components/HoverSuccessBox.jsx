import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ButtonWrapper = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-slate-800 px-4">
      <Spotlight />
    </div>
  );
};

const Spotlight = () => {
  const divRef = useRef(null);
  const spanRef = useRef(null);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const offsetX = ((e.clientX - left) / width) * 100;
      const offsetY = ((e.clientY - top) / height) * 100;

      setSpotlightPosition({ x: `${offsetX}%`, y: `${offsetY}%` });

      spanRef.current.animate({ left: `${offsetX}%`, top: `${offsetY}%` }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      setSpotlightPosition({ x: "50%", y: "50%" });
      spanRef.current.animate({ left: "50%", top: "50%" }, { duration: 100, fill: "forwards" });
    };

    divRef.current.addEventListener("mousemove", handleMouseMove);
    divRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      divRef.current.removeEventListener("mousemove", handleMouseMove);
      divRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
  ref={divRef}
  className="relative w-full overflow-hidden rounded-lg bg-[#39FF14] px-8 py-6 text-2xl font-medium text-white flex items-center justify-center"
  style={{
    width: "1200px", // Set your desired width here
    background: `radial-gradient(circle at ${spotlightPosition.x} ${spotlightPosition.y}, rgba(191, 0, 255, 0.4), rgba(0, 0, 0, 0.6))`,
  }}
>
  <span className="pointer-events-none relative z-10 mix-blend-difference text-center">
    Your File has been Successfully Uploaded
  </span>
  <span
    ref={spanRef}
    className="pointer-events-none absolute left-[50%] top-[50%] h-64 w-64 -translate-x-[50%] -translate-y-[50%] rounded-full bg-[#BF00FF]"
  />
</div>

  );
};

export default ButtonWrapper;
