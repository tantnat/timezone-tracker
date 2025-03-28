import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface Props {
    name: string;
    onRemove: () => void;
}

export default function TimezoneItem({ name, onRemove }: Props) {
    const [time, setTime] = useState(DateTime.now().setZone(name).toFormat("HH:mm:ss"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(DateTime.now().setZone(name).toFormat("HH:mm:ss"));
        }, 1000);
        return () => clearInterval(interval);
    }, [name]);

    return (
        <li className="flex justify-between items-center p-2 border-b">
            <span className="text-lg font-medium">{name}: {time}</span>
            <button
                onClick={onRemove}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
                Удалить
            </button>
        </li>
    );
}