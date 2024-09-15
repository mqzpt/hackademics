import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import cn from "classnames";

// For tilt effect, we can keep the existing rotation range
const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

function FlipCard({ card }) {
  const [showBack, setShowBack] = useState(false);
  const ref = useRef(null);

  // Framer-motion for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 500, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 500, damping: 25 });
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  // Handle mouse movement for tilt effect
  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  // Reset tilt effect on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Handle flip card on click
  const handleClick = () => {
    if (card.variant === "click") {
      setShowBack(!showBack);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transformStyle: "preserve-3d",
        transform,
        width: "250px",  // Square size
        height: "250px", // Square size
      }}
      className={cn("flip-card-outer relative mx-auto", {
        "click-trigger": card.variant === "click",
      })}
    >
      <div
        className={cn("flip-card-inner", {
          showBack,
        })}
      >
        {/* Front of the card (Blue background with white text) */}
        <div className="card front bg-purple-500 text-white rounded-lg flex items-center justify-center">
          <div className="card-body">
            <p className="card-text text-center text-sm font-bold">{card.front}</p>
          </div>
        </div>

        {/* Back of the card (White background with black text) */}
        <div className="card back bg-white text-black rounded-lg flex items-center justify-center">
          <div className="card-body">
            <p className="card-text text-center text-sm font-bold">{card.back}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FlipCard;
