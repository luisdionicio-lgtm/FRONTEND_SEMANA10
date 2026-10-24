"use client";
import { useState } from "react";
import { IoPauseOutline, IoPlayOutline } from "react-icons/io5";

export default function MotionToggle() {
  const [paused, setPaused] = useState(false);
  function toggle() {
    const next = !paused;
    document.documentElement.dataset.portalMotion = next ? "paused" : "running";
    setPaused(next);
  }
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Reanudar animaciones" : "Pausar animaciones"}
    >
      {paused ? <IoPlayOutline /> : <IoPauseOutline />}
      <span>{paused ? "Reanudar" : "Pausar"}</span>
    </button>
  );
}
