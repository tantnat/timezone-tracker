import { DateTime } from "luxon";

interface TimeWindowProps {
    start: string;
    end: string;
    timezone: string;
    onRemove: () => void;
}

export default function TimeWindow({ start, end, timezone, onRemove }: TimeWindowProps) {
    const startTime = DateTime.fromISO(start, { zone: timezone });
    const endTime = DateTime.fromISO(end, { zone: timezone });

    return (
        <div className="relative border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-gray-800">
                        {startTime.toFormat('HH:mm')} - {endTime.toFormat('HH:mm')}
                    </h3>
                    <p className="text-sm text-gray-600">{timezone}</p>
                </div>
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full">
                <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{
                        left: `${(startTime.hour / 24) * 100}%`,
                        width: `${((endTime.hour - startTime.hour) / 24) * 100}%`
                    }}
                />
            </div>
        </div>
    );
}
