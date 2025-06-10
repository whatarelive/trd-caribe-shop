interface Props {
    label: string;
    value: number;
    icon: React.ReactNode;
}

export function StatisticsCard({ label, value, icon }: Props) {
    return (
        <div className="flex flex-col grow bg-white rounded-md p-4 shadow-md">
            <div className="flex items-center gap-6 justify-between">
                <h3 className="text-sm text-nowrap font-medium">
                    Cantidad de {label}
                </h3>
                {icon}
            </div>
            
            <div>
                <span className="text-xl font-bold">
                    {value} 
                </span>
            </div>
        </div>
    )
}
