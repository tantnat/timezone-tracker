import TimeWindow from "./TimeWindow";

interface TimeWindow {
    id: string;
    start: string;
    end: string;
    timezone: string;
}

interface TimeWindowListProps {
    timeWindows: TimeWindow[];
    removeWindow: (id: string) => void;
}

function TimeWindowList({ timeWindows, removeWindow }: TimeWindowListProps) {
    return (
        <div className="space-y-4">
            {timeWindows.map((window) => (
                <TimeWindow
                    key={window.id}
                    start={window.start}
                    end={window.end}
                    timezone={window.timezone}
                    onRemove={() => removeWindow(window.id)}
                />
            ))}
        </div>
    );
}

export default TimeWindowList;