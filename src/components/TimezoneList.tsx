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

    const removeTimezone = (timezone: string) => {
        setTimezones(timezones.filter((tz) => tz !== timezone));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Выбранные таймзоны</h2>
            <AddTimezone onAdd={addTimezone} />
            <ul className="mt-4">
                {timezones.map((tz) => (
                    <TimezoneItem key={tz} name={tz} onRemove={() => removeTimezone(tz)} />
                ))}
            </ul>
        </div>
    );
}