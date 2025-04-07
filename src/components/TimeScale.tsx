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

  // Show all 24 hours
  const hours = Array.from({ length: 25 }, (_, i) => i); // 25 to show the last hour mark

  // Helper function to calculate window position
  const calculateWindowPosition = (start: DateTime, end: DateTime) => {
    const windowStartHour = start.hour + start.minute / 60;
    const windowEndHour = end.hour + end.minute / 60;
    
    // Handle windows that span across midnight
    let left = (windowStartHour / 24) * 100;
    let width = ((windowEndHour - windowStartHour) / 24) * 100;

    // If window ends before it starts, it spans across midnight
    if (windowEndHour < windowStartHour) {
      width = ((24 - windowStartHour + windowEndHour) / 24) * 100;
    }

    return { left, width };
  };

  // Calculate current time position
  const currentTimePosition = ((currentTime.hour + currentTime.minute / 60) / 24) * 100;

  return (
    <div className="relative w-full border rounded-lg p-4 bg-white shadow-sm my-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{timezone}</h3>
        <span className="text-base font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
          {currentTime.toFormat('HH:mm:ss')}
        </span>
      </div>

      <div className="relative mt-8">
        {/* Main timeline line */}
        <div className="absolute left-0 right-0 h-1 bg-gray-300 top-6"></div>

        {/* Hour markers */}
        <div className="relative">
          {hours.map((hour) => (
            <div
              key={hour}
              className="absolute -top-2"
              style={{ left: `${(hour / 24) * 100}%` }}
            >
              <div className="h-4 w-0.5 bg-gray-400"></div>
              <div className="absolute -left-4 top-4 w-8 text-center">
                <span className="text-sm font-medium text-gray-600">
                  {hour.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Time windows */}
        <div className="relative h-14 mt-12">
          {windows.map((win, idx) => {
            const start = DateTime.fromISO(win.start, { zone: win.timezone })
              .setZone(timezone);
            const end = DateTime.fromISO(win.end, { zone: win.timezone })
              .setZone(timezone);
            
            const { left, width } = calculateWindowPosition(start, end);

            if (width > 0) {
              return (
                <div
                  key={idx}
                  className="absolute h-full bg-blue-50 border border-blue-300 hover:bg-blue-100 transition-colors"
                  style={{ 
                    left: `${left}%`, 
                    width: `${width}%`,
                    borderRadius: '4px',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800 px-2 truncate">
                      {start.toFormat('HH:mm')} - {end.toFormat('HH:mm')}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Current time indicator */}
        <div 
          className="absolute top-0 z-10"
          style={{ 
            left: `${currentTimePosition}%`,
            height: 'calc(100% - 1rem)'
          }}
        >
          <div className="relative h-full">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full font-medium">
                {currentTime.toFormat('HH:mm')}
              </span>
            </div>
            <div className="w-0.5 h-full bg-red-500"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}