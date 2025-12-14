import { format } from "date-fns";

const TimelineItem = ({
    label,
    date,
    active,
}: {
    label: string;
    date?: string | null;
    active?: boolean;
}) => {
    return (
        <div className="flex items-start gap-3">
            <div
                className={`mt-1 h-2.5 w-2.5 rounded-full ${active ? "bg-green-500" : "bg-gray-400"
                    }`}
            />
            <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                    {date ? format(new Date(date), "PPpp") : "Pending"}
                </p>
            </div>
        </div>
    )
}

export default TimelineItem