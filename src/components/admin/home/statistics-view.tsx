import { CreditCard, MessageSquareText, Package, ShoppingCart, Users } from "lucide-react";
import { getResourceSummary } from "@/actions/analytics/get-resources";
import { StatisticsCard } from "@/components/admin/home/statistics-card";
import { ErrorSection } from "@/components/global/ErrorSection";


export async function StatisticsView() {
    const { data, result } = await getResourceSummary();

    if (!result || !data) {
        return <ErrorSection variant="error"/>
    }

    return (
        <div className="flex flex-col md:flex-wrap md:flex-row gap-6">
            <StatisticsCard label="Productos" value={data.products} icon={<Package className="w-4 h-4"/>} />
            <StatisticsCard label="Promociones" value={data.promotions} icon={<CreditCard className="w-4 h-4"/>}/>
            <StatisticsCard label="Comentarios" value={data.comments} icon={<MessageSquareText className="w-4 h-4"/>}/>
            <StatisticsCard label="Usuarios" value={data.users} icon={<Users className="w-4 h-4"/>}/>
            <StatisticsCard label="Ventas" value={data.sales} icon={<ShoppingCart className="w-4 h-4"/>}/>
        </div>
    )
}
