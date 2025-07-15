import { useEffect, useRef, useState } from "react";
function AnalogClock() {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);
  useEffect(() => {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const hourDeg = (h % 12) * 30 + m * 0.5;
    const minuteDeg = m * 6;
    const secondDeg = s * 6;
    if (hourRef.current)
      hourRef.current.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    if (minuteRef.current)
      minuteRef.current.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    if (secondRef.current)
      secondRef.current.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  }, [time]);
  const formatTime = (n: number) => n.toString().padStart(2, "0");
  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <div className="container" data-theme={darkMode ? "dark" : "light"}>
      <button onClick={toggleDarkMode} className="toggle-btn">
        {darkMode ? " Light Mode ☀" : " Dark Mode 🌙"}
      </button>
      {/* Analog Clock */}
      <div className="clock">
        <div className="numbers">
          {[...Array(12)].map((_, i) => (
            <span key={i} style={{ "--i": i + 1 } as React.CSSProperties}>
              {i + 1}
            </span>
          ))}
        </div>
        <div ref={hourRef} className="hand hour" />
        <div ref={minuteRef} className="hand minute" />
        <div ref={secondRef} className="hand second" />
      </div>
      {/* Digital Clock */}
      <div className="digital-clock">
        {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:
        {formatTime(time.getSeconds())}
      </div>
    </div>
  );
}
export default AnalogClock;
