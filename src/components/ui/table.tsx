import type { FC } from "react";
import { cn } from "@/utils/tailwind-cn";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Table: FC<Props> = ({ className, children }) => (
  <div className="lg:relative w-full overflow-none rounded-lg lg:bg-gray-50 lg:p-1">
    <table className={cn("w-full caption-bottom text-sm", className)}>
      { children }
    </table>
  </div>
)

export const TableHeader: FC<Props> = ({ className, children }) => (
  <thead className={className}>
    { children }
  </thead>
)

export const TableBody: FC<Props> = ({ className, children }) => (
  <tbody className={className}>
    { children }
  </tbody>
)

export const TableRow: FC<Props> = ({ className, children }) => (
  <tr className={className}>
    { children }
  </tr>
)

export const TableHead: FC<Props> = ({ className, children }) => (
  <th className={cn("px-2 py-3 text-left w-[120px] align-middle font-medium", className ) }>
    { children }
  </th>
)

export const TableCell: FC<Props> = ({ className, children }) => (
  <td className={cn("p-2 align-middle", className)}>
    { children }
  </td>
)