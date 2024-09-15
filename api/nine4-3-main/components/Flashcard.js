import { useState } from "react";
import cn from "classnames";

function FlipCard({ card }) {
  const [showBack, setShowBack] = useState(false);

  function handleClick() {
    // Only handle click variant
    if (card.variant === "click") {
      setShowBack(!showBack);
    }
  }

  return (
    <div
      tabIndex={card.id}
      className={cn("flip-card-outer", { 
        "click-trigger": card.variant === "click" // You can define this class in your CSS if needed
      })}
      onClick={handleClick}
    >
      <div
        className={cn("flip-card-inner", {
          showBack
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">{card.front}</p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">{card.back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
