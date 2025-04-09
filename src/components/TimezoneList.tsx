import TimezoneItem from "./TimezoneItem";
import { TimeWindow } from "../types";

interface TimezoneListProps {
    timezones: string[];
    timeWindows: TimeWindow[];
    onRemove: (timezone: string) => void;
}

export default function TimezoneList({ timezones, timeWindows, onRemove }: TimezoneListProps) {
    return (
        <div className="space-y-4">
            {timezones.map((tz) => (
                <TimezoneItem 
                    key={tz} 
                    name={tz} 
                    timeWindows={timeWindows} 
                    onRemove={() => onRemove(tz)} 
                />
            ))}
        </div>
    );
}