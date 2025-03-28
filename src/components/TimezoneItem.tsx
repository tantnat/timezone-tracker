import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import AddTimeWindow from "./AddTimeWindow";

interface TimeWindow {
    start: string;
    end: string;
}

interface Props {
    name: string;
    onRemove: () => void;
}

export default function TimezoneItem({ name, onRemove }: Props) {
    const [time, setTime] = useState(DateTime.now().setZone(name).toFormat("HH:mm:ss"));
    const [timeWindows, setTimeWindows] = useState<TimeWindow[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(DateTime.now().setZone(name).toFormat("HH:mm:ss"));
        }, 1000);
        return () => clearInterval(interval);
    }, [name]);

    const addTimeWindow = (start: string, end: string) => {
        setTimeWindows([...timeWindows, { start, end }]);
    };

    return (
        <li className="flex flex-col p-2 border-b">
            <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{name}: {time}</span>
                <button
                    onClick={onRemove}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                    Удалить
                </button>
            </div>

            <AddTimeWindow onAdd={addTimeWindow} />

            <ul className="mt-2">
                {timeWindows.map((win, index) => (
                    <li key={index} className="text-sm text-gray-600">
                        {win.start} - {win.end}
                    </li>
                ))}
            </ul>
        </li>
    );
}