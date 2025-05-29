import { format } from "@/lib/format-date";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import type { IComplaints } from "@/interfaces/models/complaints-suggestions.interface";


export function ComplaintsCard({ complaint }: { complaint: IComplaints }) {
    return (
        <Card className="flex gap-3 px-4 justify-between shadow-md">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <Avatar>{complaint.user.slice(0, 2)}</Avatar>                            
                    <span className="line-clamp-1">{complaint.user}</span>
                </div>

                <span className="text-nowrap">
                    {format(complaint.created)}
                </span>
            </div>
            
            <hr className="text-gray-300"/>

            <div className="relative grow">
                <p className="">{complaint.text}</p>
            </div>
        </Card>
    )
}