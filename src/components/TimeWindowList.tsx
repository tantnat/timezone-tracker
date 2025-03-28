import { Trash } from "lucide-react";

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
        <div>
            {timeWindows.map((window) => (
                <div key={window.id} className="flex items-center gap-2 border p-2 rounded">
                    <span>{window.start} - {window.end} ({window.timezone})</span>
                    <button onClick={() => removeWindow(window.id)} className="text-red-500 hover:text-red-700">
                        <Trash size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TimeWindowList;