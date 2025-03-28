import { useState, useEffect } from "react";
import AddTimezone from "./components/AddTimezone";
import TimezoneItem from "./components/TimezoneItem";
import AddTimeWindow from "./components/AddTimeWindow";
import TimeWindowList from "./components/TimeWindowList";

import { DateTime } from "luxon";

interface TimeWindow {
    id: string;
    start: string;
    end: string;
    timezone: string;
}

export default function App() {
    const [timezones, setTimezones] = useState<string[]>([]);
    const [timeWindows, setTimeWindows] = useState<TimeWindow[]>([]);

    useEffect(() => {
        const savedTimezones = localStorage.getItem("timezones");
        if (savedTimezones) {
            try {
                setTimezones(JSON.parse(savedTimezones));
            } catch (e) {
                console.error("Ошибка загрузки таймзон:", e);
            }
        }
    
        const savedWindows = localStorage.getItem("timeWindows");
        if (savedWindows) {
            try {
                setTimeWindows(JSON.parse(savedWindows));
            } catch (e) {
                console.error("Ошибка загрузки окон:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (timezones.length > 0) {
            localStorage.setItem("timezones", JSON.stringify(timezones));
        }
    }, [timezones]);
    
    useEffect(() => {
        if (timeWindows.length > 0) {
            localStorage.setItem("timeWindows", JSON.stringify(timeWindows));
        }
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
        const newWindow: TimeWindow = {
            id: crypto.randomUUID(),
            start,
            end,
            timezone
        };
        setTimeWindows([...timeWindows, newWindow]);
    };

    const removeTimeWindow = (id: string) => {
        setTimeWindows((prevWindows) => {
            const updatedWindows = prevWindows.filter(window => window.id !== id);
            localStorage.setItem("timeWindows", JSON.stringify(updatedWindows));
            return updatedWindows;
        });
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
    
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Временные окна</h2>
                <TimeWindowList timeWindows={timeWindows} removeWindow={removeTimeWindow} />
            </div>
        </div>
    );
}