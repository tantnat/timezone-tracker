import { useEffect, useState } from "react";

interface Props {
    onAdd: (start: string, end: string, timezone: string) => void;
    timezones: string[];
}

export default function AddTimeWindow({ onAdd, timezones }: Props) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [selectedTimezone, setSelectedTimezone] = useState(timezones[0] || "");

    const handleAdd = () => {
        if (start && end && selectedTimezone) {
            console.log("Добавляем окно:", { start, end, selectedTimezone });  // ✅ Проверяем, что функция вызывается
            onAdd(start, end, selectedTimezone);
            setStart("");
            setEnd("");
        } else {
            console.log("Ошибка: не все данные введены");  // ⚠️ Если что-то пустое
        }
    };

    useEffect(() => {
        if (!selectedTimezone && timezones.length > 0) {
            setSelectedTimezone(timezones[0]); // ✅ Берем первую таймзону в списке
        }
    }, [timezones]);

    return (
        <div className="flex space-x-2 mt-4">
            <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="border p-1 rounded"
            />
            <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="border p-1 rounded"
            />
            <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="border p-1 rounded"
            >
                {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                ))}
            </select>
            <button onClick={handleAdd} className="bg-blue-500 text-white px-2 py-1 rounded">
                Добавить
            </button>
        </div>
    );
}