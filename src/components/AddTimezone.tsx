import { useState } from "react";

interface AddTimezoneProps {
    onAdd: (timezone: string) => void;
}

const COMMON_TIMEZONES = [
    // UTC and GMT
    "UTC",
    "GMT",
    
    // Americas
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "America/Adak",
    "America/Phoenix",
    "America/Toronto",
    "America/Vancouver",
    "America/Mexico_City",
    "America/Sao_Paulo",
    "America/Buenos_Aires",
    "America/Santiago",
    
    // Europe
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Europe/Madrid",
    "Europe/Amsterdam",
    "Europe/Brussels",
    "Europe/Vienna",
    "Europe/Zurich",
    "Europe/Stockholm",
    "Europe/Oslo",
    "Europe/Copenhagen",
    "Europe/Helsinki",
    "Europe/Prague",
    "Europe/Warsaw",
    "Europe/Budapest",
    "Europe/Bucharest",
    "Europe/Athens",
    "Europe/Istanbul",
    "Europe/Moscow",
    
    // Asia
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Seoul",
    "Asia/Hong_Kong",
    "Asia/Singapore",
    "Asia/Bangkok",
    "Asia/Jakarta",
    "Asia/Manila",
    "Asia/Kolkata",
    "Asia/Dubai",
    "Asia/Tehran",
    "Asia/Karachi",
    "Asia/Dhaka",
    "Asia/Kathmandu",
    
    // Australia and Pacific
    "Australia/Sydney",
    "Australia/Melbourne",
    "Australia/Brisbane",
    "Australia/Perth",
    "Australia/Adelaide",
    "Australia/Darwin",
    "Pacific/Auckland",
    "Pacific/Honolulu",
    "Pacific/Guam",
    
    // Africa
    "Africa/Cairo",
    "Africa/Johannesburg",
    "Africa/Lagos",
    "Africa/Nairobi",
    "Africa/Casablanca"
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