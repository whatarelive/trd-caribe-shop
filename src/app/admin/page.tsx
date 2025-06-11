import { Suspense } from "react";
import { FileChartColumn, MonitorCheck } from "lucide-react";
import { fontTitle } from "@/config/fonts";
import { SalesChart } from "@/components/admin/home/sales-chart";
import { StatisticsView } from "@/components/admin/home/statistics-view";
import { LastUsersCard } from "@/components/admin/home/last-users-card";
import { LastCommentsCard } from "@/components/admin/home/last-comments-card";
import { LastUsersSkeleton, LastCommentsSkeleton, StatisticsSkeleton, SalesChartSkeleton } from "@/components/admin/home/skeletons";


export default function AdminPage() {
    return (
        <section className="flex flex-col gap-6 w-full p-4 min-[375px]:p-8 xl:pr-16 bg-white md:bg-transparent">
            <h1 className="title-page">Panel de Resumen</h1>
           
            <section className="flex flex-col gap-3 mt-4">
                <div className="inline-flex items-center gap-2">
                    <FileChartColumn className="w-6 h-6"/>
                    <h2 className={`${fontTitle.className} text-xl antialiased`}>
                        Resumen de recursos
                    </h2>
                </div>

                <Suspense fallback={<StatisticsSkeleton cant={5}/>}>
                    <StatisticsView/>
                </Suspense>
            </section>

            <section className="flex flex-col gap-3 mt-6">
                <div className="inline-flex items-center gap-2">
                    <MonitorCheck className="w-6 h-6"/>
                    <h2 className={`${fontTitle.className} text-xl antialiased`}>
                        Reportes de actividad
                    </h2>
                </div>
                
                <section className="flex flex-col md:flex-row md:flex-wrap 2xl:flex-nowrap gap-6">
                    <Suspense fallback={<SalesChartSkeleton/>}>
                        <SalesChart/>
                    </Suspense>

                    <div className="flex flex-col w-full lg:flex-row gap-6">
                        <Suspense fallback={<LastCommentsSkeleton cant={3}/>}>
                            <LastCommentsCard/>
                        </Suspense>

                        <Suspense fallback={<LastUsersSkeleton cant={5}/>}>
                            <LastUsersCard/>
                        </Suspense>
                    </div>
                </section>
            </section>
        </section>
    );
}
