import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface TimeWindow {
    start: string;
    end: string;
    timezone: string;
}

interface Props {
    name: string;
    timeWindows: TimeWindow[];
    onRemove: () => void;
}

export default function TimezoneItem({ name, timeWindows, onRemove }: Props) {
    const [time, setTime] = useState(DateTime.now().setZone(name).toFormat("HH:mm:ss"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(DateTime.now().setZone(name).toFormat("HH:mm:ss"));
        }, 1000);
        return () => clearInterval(interval);
    }, [name]);

    const convertTimeWindow = (win: TimeWindow) => {
        const start = DateTime.fromFormat(win.start, "HH:mm", { zone: win.timezone }).setZone(name);
        const end = DateTime.fromFormat(win.end, "HH:mm", { zone: win.timezone }).setZone(name);
        return `${start.toFormat("HH:mm")} - ${end.toFormat("HH:mm")}`;
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

            <ul className="mt-2">
                {timeWindows.map((win, index) => (
                    <li key={index} className="text-sm text-gray-600">
                        {convertTimeWindow(win)}
                    </li>
                ))}
            </ul>
        </li>
    );
}