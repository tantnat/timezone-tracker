import { useLocalStorage } from "../hooks/useLocalStorage";
import TimezoneItem from "./TimezoneItem";
import AddTimezone from "./AddTimezone";

export default function TimezoneList() {
    const [timezones, setTimezones] = useLocalStorage<string[]>("timezones", []);

    const addTimezone = (timezone: string) => {
        if (!timezones.includes(timezone)) {
            setTimezones([...timezones, timezone]);
        }
    };

    return (
        <div>
            <h2>Выбранные таймзоны</h2>
            <AddTimezone onAdd={addTimezone} />
            <ul>
                {timezones.map((tz) => (
                    <TimezoneItem key={tz} name={tz} />
                ))}
            </ul>
        </div>
    );
}