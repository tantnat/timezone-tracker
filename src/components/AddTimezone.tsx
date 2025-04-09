import { useState } from "react";

interface AddTimezoneProps {
    onAdd: (timezone: string) => void;
}

const COMMON_TIMEZONES = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Asia/Dubai",
    "Asia/Shanghai",
    "Europe/Moscow"
];

export default function AddTimezone({ onAdd }: AddTimezoneProps) {
    const [selectedTimezone, setSelectedTimezone] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTimezone) {
            onAdd(selectedTimezone);
            setSelectedTimezone("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
                <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="flex-1 p-2 border rounded"
                >
                    <option value="">Select a timezone</option>
                    {COMMON_TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                            {tz}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={!selectedTimezone}
                >
                    Add
                </button>
            </div>
        </form>
    );
}