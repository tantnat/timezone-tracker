interface Props {
    name: string;
    onRemove: () => void;
}

export default function TimezoneItem({ name, onRemove }: Props) {
    return (
        <li className="flex justify-between items-center p-2 border-b">
            <span className="text-lg">{name}</span>
            <button
                onClick={onRemove}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
                Удалить
            </button>
        </li>
    );
}