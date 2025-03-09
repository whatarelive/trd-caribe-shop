import type { FC } from "react";
import { cn } from "@/src/lib/utils/tailwind-cn";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Table: FC<Props> = ({ className, children }) => (
  <div className="relative w-full overflow-none">
    <table className={cn("w-full caption-bottom text-sm", className)}>
      { children }
    </table>
  </div>
)

export const TableHeader: FC<Props> = ({ className, children }) => (
  <thead className={cn("border-b", className)}>
    { children }
  </thead>
)

export const TableBody: FC<Props> = ({ className, children }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)}>
    { children }
  </tbody>
)

export const TableFooter: FC<Props> = ({ className, children }) => (
  <tfoot className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}>
    { children }
  </tfoot>
)

export const TableRow: FC<Props> = ({ className, children }) => (
  <tr className={cn("border-b-4 border-white transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}>
    { children }
  </tr>
)

export const TableHead: FC<Props> = ({ className, children }) => (
  <th className={cn("px-2 py-3 text-left w-[120px] align-middle font-bold text-p_gray_900", className ) }>
    { children }
  </th>
)

export const TableCell: FC<Props> = ({ className, children }) => (
  <td className={cn("p-2 align-middle", className)}>
    { children }
  </td>
)

export const TableCaption: FC<Props> = ({ className, children }) => (
  <caption className={cn("mt-4 text-sm text-muted-foreground", className)}>
    { children }
  </caption>
)