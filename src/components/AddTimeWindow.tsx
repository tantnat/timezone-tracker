import { useEffect, useState } from "react";

interface Props {
    onAdd: (start: string, end: string, timezone: string) => void;
    timezones: string[];
}

export default function AddTimeWindow({ onAdd, timezones }: Props) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [selectedTimezone, setSelectedTimezone] = useState(timezones[0] || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (start && end && selectedTimezone) {
            console.log("Adding window:", { start, end, selectedTimezone });
            onAdd(start, end, selectedTimezone);
            setStart("");
            setEnd("");
        } else {
            console.log("Error: not all data entered");
        }
    };

    useEffect(() => {
        if (timezones.length > 0) {
            setSelectedTimezone(timezones[0]); // Take the first timezone in the list
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
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1 rounded">
                Add
            </button>
        </div>
    );
}