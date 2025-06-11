import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SaleMonth } from "@/interfaces/models/analytics.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculo de las etiquetas que necesitamos mostrar en el eje y
// basado en el registro más alto y en miles
export const generateYAxis = (sales: SaleMonth[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...sales.map((month) => month.total));
  
  const topLabel = (highestRecord <= 1000)
    ? Math.ceil(highestRecord / 100) * 1000
    : Math.ceil(highestRecord / 1000) * 1000 ;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};