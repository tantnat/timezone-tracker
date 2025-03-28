import { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface TimeScaleProps {
  timezone: string;
  windows: { start: string; end: string }[];
}

export default function TimeScale({ timezone, windows }: TimeScaleProps) {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now().setZone(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const startHour = currentTime.hour - 3;
  const endHour = currentTime.hour + 3;
  const hours = Array.from({ length: 7 }, (_, i) => (currentTime.hour - 3 + i + 24) % 24);

  return (
    <div className="relative w-full border rounded p-2 my-4 bg-gray-100">
      <p className="text-center font-bold">{timezone}</p>
      <div className="relative flex w-full border-t border-gray-400 mt-2">
        {hours.map((hour, index) => (
          <div key={index} className="flex-1 text-center text-xs relative">
            {hour}:00
          </div>
        ))}
      </div>
      {windows.map((win, idx) => {
        const start = DateTime.fromISO(win.start, { zone: timezone }).hour;
        const end = DateTime.fromISO(win.end, { zone: timezone }).hour;
        const left = ((start - startHour) / 6) * 100;
        const width = ((end - start) / 6) * 100;
        return (
          <div
            key={idx}
            className="absolute bg-blue-400 h-6 rounded opacity-80"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        );
      })}
      {/* Линия текущего времени */}
      <div
        className="absolute bg-red-500 w-1 h-8"
        style={{ left: `${((currentTime.hour - startHour) / 6) * 100}%` }}
      />
    </div>
  );
}