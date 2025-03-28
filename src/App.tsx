import { useState, useEffect } from "react";
import AddTimezone from "./components/AddTimezone";
import TimezoneItem from "./components/TimezoneItem";
import AddTimeWindow from "./components/AddTimeWindow";

import { DateTime } from "luxon";

interface TimeWindow {
    start: string;  // Время начала в исходной таймзоне
    end: string;    // Время окончания в исходной таймзоне
    timezone: string;  // Исходная таймзона
}

export default function App() {
    const [timezones, setTimezones] = useState<string[]>([]);
    const [timeWindows, setTimeWindows] = useState<TimeWindow[]>([]);

    useEffect(() => {
        const savedTimezones = localStorage.getItem("timezones");
        if (savedTimezones) setTimezones(JSON.parse(savedTimezones));

        const savedWindows = localStorage.getItem("timeWindows");
        if (savedWindows) setTimeWindows(JSON.parse(savedWindows));
    }, []);

    useEffect(() => {
        console.log("Обновленный список окон:", timeWindows);  // ✅ Проверяем обновление состояния
        localStorage.setItem("timeWindows", JSON.stringify(timeWindows));
    }, [timeWindows]);

    useEffect(() => {
        localStorage.setItem("timeWindows", JSON.stringify(timeWindows));
    }, [timeWindows]);

    const addTimezone = (tz: string) => {
        if (!timezones.includes(tz)) {
            setTimezones([...timezones, tz]);
        }
    };

    const removeTimezone = (tz: string) => {
        setTimezones(timezones.filter((t) => t !== tz));
    };

    const addTimeWindow = (start: string, end: string, timezone: string) => {
        console.log("Получено новое окно:", { start, end, timezone }); // ✅ Проверяем, что данные дошли
        const newWindow: TimeWindow = { start, end, timezone };
        setTimeWindows([...timeWindows, newWindow]);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Таймзоны и временные окна</h1>
            <AddTimezone onAdd={addTimezone} />
            <AddTimeWindow onAdd={addTimeWindow} timezones={timezones} />
            <ul className="mt-4 border rounded">
                {timezones.map((tz) => (
                    <TimezoneItem key={tz} name={tz} timeWindows={timeWindows} onRemove={() => removeTimezone(tz)} />
                ))}
            </ul>
        </div>
    );
}