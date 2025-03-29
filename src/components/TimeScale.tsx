import { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface TimeScaleProps {
  timezone: string;
  windows: { start: string; end: string; timezone: string }[];
}

export default function TimeScale({ timezone, windows }: TimeScaleProps) {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now().setZone(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  // Calculate visible time range (6 hours centered on current time)
  const startHour = currentTime.hour - 3;
  const endHour = currentTime.hour + 3;
  const hours = Array.from({ length: 7 }, (_, i) => (currentTime.hour - 3 + i + 24) % 24);

  // Helper function to calculate window position
  const calculateWindowPosition = (start: DateTime, end: DateTime) => {
    const windowStartHour = start.hour;
    const windowEndHour = end.hour;
    
    // Handle windows that span across midnight
    let left = ((windowStartHour - startHour) / 6) * 100;
    let width = ((windowEndHour - windowStartHour) / 6) * 100;

    // If window ends before it starts, it spans across midnight
    if (windowEndHour < windowStartHour) {
      width = ((24 - windowStartHour + windowEndHour) / 6) * 100;
    }

    // Ensure the window stays within the visible range
    left = Math.max(0, Math.min(100, left));
    width = Math.max(0, Math.min(100, width));

    return { left, width };
  };

  // Calculate current time position
  const currentTimePosition = ((currentTime.hour - startHour + currentTime.minute / 60) / 6) * 100;

  return (
    <div className="relative w-full border rounded-lg p-4 bg-white shadow-sm my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">{timezone}</h3>
        <span className="text-sm text-gray-600">
          {currentTime.toFormat('HH:mm:ss')}
        </span>
      </div>
      
      {/* Time scale with hours */}
      <div className="relative flex w-full border-t border-gray-300 mt-2">
        {hours.map((hour, index) => (
          <div key={index} className="flex-1 text-center text-xs relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              {hour}:00
            </div>
            <div className="absolute top-0 left-1/2 w-px h-2 bg-gray-300"></div>
          </div>
        ))}
      </div>

      {/* Time windows */}
      <div className="relative h-8 mt-2">
        {windows.map((win, idx) => {
          // Convert the window times from its original timezone to the current timezone
          const start = DateTime.fromISO(win.start, { zone: win.timezone })
            .setZone(timezone);
          const end = DateTime.fromISO(win.end, { zone: win.timezone })
            .setZone(timezone);
          
          const { left, width } = calculateWindowPosition(start, end);

          // Only show windows that are within the visible range
          if (width > 0) {
            return (
              <div
                key={idx}
                className="absolute h-full bg-blue-100 border-2 border-blue-500 rounded-lg"
                style={{ 
                  left: `${left}%`, 
                  width: `${width}%`,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs text-blue-700 font-medium">
                  {start.toFormat('HH:mm')} - {end.toFormat('HH:mm')}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Current time indicator */}
      <div
        className="absolute bg-red-500 w-1 h-12"
        style={{ 
          left: `${currentTimePosition}%`,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />
    </div>
  );
}