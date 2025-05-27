interface Props {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function DataSection({ label, value, icon }: Props) {
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {icon}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {label}
                </span>
                <span className="text-sm font-semibold text-gray-900 truncate">
                    {value}
                </span>
            </div>
        </div>
    )
}
