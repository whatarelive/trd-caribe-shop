import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import { format } from "@/lib/format-date";
import { DataSection } from "@/components/admin/data-section";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TextCommentDialog } from "@/components/admin/complaints-suggestions/text-comment-dialog";
import { CreateResponseForm } from "@/components/admin/complaints-suggestions/create-response-form";
import type { IComplaints } from "@/interfaces/models/complaints-suggestions.interface";


export function ComplaintsCard({ complaint }: { complaint: IComplaints }) {
    return (
        <Card className="shadow-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="inline-flex gap-2 items-center">
                    <Avatar>{complaint.user.slice(0, 2)}</Avatar>                            
                    <span className="line-clamp-1">{complaint.user}</span>
                </CardTitle>

                <Badge variant={complaint.active ? "destructive" : "success"}>
                    {complaint.active ? "No resuelta" : "Resuelta"}
                </Badge>
            </CardHeader>
            
            <CardContent className="flex gap-3 flex-col sm:flex-row justify-between">
                <DataSection 
                    label="Fecha de Creación:" 
                    value={format(complaint.created)} 
                    icon={<CalendarArrowDown size={18} className="text-red-400"/>}
                />
                
                <DataSection 
                    label="Fecha de Respuesta:" 
                    value={complaint.active ? "-- / -- / --" : format(complaint.upate)} 
                    icon={<CalendarArrowUp size={18} className="text-green-400"/>}
                />
            </CardContent>
            <CardFooter className="flex gap-2">
                <TextCommentDialog text={complaint.text} user={complaint.user} />
                <CreateResponseForm user={complaint.user} />
            </CardFooter>
        </Card>
    )
}
