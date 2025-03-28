import { useState } from "react";

interface Props {
    onAdd: (timezone: string) => void;
}

export default function AddTimezone({ onAdd }: Props) {
    const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");

    const handleAdd = () => {
        if (selectedTimezone) {
            onAdd(selectedTimezone);
        }
    };

    return (
        <div>
            <select value={selectedTimezone} onChange={(e) => setSelectedTimezone(e.target.value)}>
                {Intl.supportedValuesOf("timeZone").map((tz) => (
                    <option key={tz} value={tz}>
                        {tz}
                    </option>
                ))}
            </select>
            <button onClick={handleAdd}>Добавить</button>
        </div>
    );
}