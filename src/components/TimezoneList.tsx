import { useLocalStorage } from "../hooks/useLocalStorage";
import TimezoneItem from "./TimezoneItem";

export default function TimezoneList() {
    const [timezones, setTimezones] = useLocalStorage<string[]>("timezones", []);

    return (
        <div>
            <h2>Выбранные таймзоны</h2>
            <ul>
                {timezones.map((tz) => (
                    <TimezoneItem key={tz} name={tz} />
                ))}
            </ul>
        </div>
    );
}