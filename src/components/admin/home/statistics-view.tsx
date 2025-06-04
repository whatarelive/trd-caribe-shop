import { CreditCard, MessageSquareText, Package, ShoppingCart, Users } from "lucide-react";
import { StatisticsCard } from "@/components/admin/home/statistics-card";


export async function StatisticsView() {
    const statistics = await new Promise((resolve) => {
        setTimeout(() => resolve("Hola"), 3000)
    })

    return (
        <div className="flex flex-col md:flex-wrap md:flex-row gap-6">
            <StatisticsCard label="Productos" value={120} icon={<Package className="w-4 h-4"/>} />
            <StatisticsCard label="Promociones" value={8} icon={<CreditCard className="w-4 h-4"/>}/>
            <StatisticsCard label="Comentarios" value={50} icon={<MessageSquareText className="w-4 h-4"/>}/>
            <StatisticsCard label="Usuarios" value={280} icon={<Users className="w-4 h-4"/>}/>
            <StatisticsCard label="Ventas" value={1730} icon={<ShoppingCart className="w-4 h-4"/>}/>
        </div>
    )
}
