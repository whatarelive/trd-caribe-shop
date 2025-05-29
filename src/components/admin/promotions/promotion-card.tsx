import { ClipboardType, DollarSign, Percent, Tag, Trash2 } from "lucide-react";
import { deletePromotion } from "@/actions/promotions/delete-promotion";
import { AlertModal } from "@/components/global/AlertModal";
import { DataSection } from "@/components/admin/data-section";
import { PromotionChoice } from "@/components/admin/promotions/promotions-choice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IPromotions } from "@/interfaces/models/promotions.interface";


export function PromotionCard({ promotion }: { promotion: IPromotions }) {
    return (
        <Card className="shadow-md">
            <CardHeader className="pb-1">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        { promotion.name }
                    </CardTitle>

                    <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700">
                        <Tag className="w-3 h-3 mr-1" />
                        Promoción
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Información principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DataSection
                        label="Valor"
                        value={`${promotion.valor}%`}
                        icon={<Percent className="w-4 h-4 text-blue-600" />}
                    />

                     <DataSection
                        label="Tipo de Promoción"
                        value={promotion.tipo === "percentage" ? "procentage" : "fija"}
                        icon={<ClipboardType className="w-4 h-4 text-blue-600" />}
                    />

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-500 uppercase">
                            Variante
                        </span>
                        <PromotionChoice choice={promotion.choice} />
                    </div>
                </div>

                {/* Valores mínimo y máximo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DataSection
                        label="Valor Mínimo"
                        value={promotion.min_price !== "0.00" ? `$${promotion.min_price}` : "--.--"}
                        icon={<DollarSign className="w-4 h-4 text-green-600" />}
                    />

                    <DataSection
                        label="Valor Máximo"
                        value={promotion.max_price !== "0.00" ? `$${promotion.max_price}` : "--.--"}
                        icon={<DollarSign className="w-4 h-4 text-red-600" />}
                    />
                </div>

                {/* Botón de acción */}
                <div className="flex gap-3 pt-4">
                    <AlertModal
                        title="Eliminar Promoción" 
                        message={`Deseas eliminar la promoción ${promotion.name} de la plataforma`} 
                        action={deletePromotion.bind(null, promotion.id)} 
                    >
                        <Button type="button" size="lg" className="w-full">
                            <Trash2 className="w-6 h-6"/>
                            Eliminar
                        </Button>
                    </AlertModal>
                </div>
            </CardContent>
        </Card>
    )
}
