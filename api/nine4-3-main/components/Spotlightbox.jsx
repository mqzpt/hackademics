import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SpotlightBox = () => {
  const boxRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    boxRef.current.addEventListener("mousemove", handleMouseMove);
    boxRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      boxRef.current.removeEventListener("mousemove", handleMouseMove);
      boxRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex min-h-[200px] items-center justify-center bg-slate-800 px-4">
      <motion.div
        whileTap={{ scale: 0.985 }}
        ref={boxRef}
        className="relative w-3/4 px-4 py-6 mt-4 text-center border-2 border-green-500 rounded-lg shadow-md bg-green-100"
      >
        <p className="relative z-10 text-green-600 mix-blend-difference">
          Your file has been successfully uploaded!
        </p>
        <span
          ref={spanRef}
          className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
        />
      </motion.div>
    </div>
  );
};

export default SpotlightBox;
