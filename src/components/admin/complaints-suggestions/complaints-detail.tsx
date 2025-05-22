import { fontText } from "@/config/fonts";
import { DataSection } from "@/components/admin/sales/sales-utils";
import { UserNameView } from "@/components/admin/users/users-utils";
import { ComplaintState } from "@/components/admin/complaints-suggestions/complaints-utils";
import { suggestions } from "@/lib/data/suggestions";

const suggestion = suggestions[1];

export const ComplaintsDetail = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Sección de contenido */}
            <div className="p-4 min-h-72 space-y-2 bg-gray-50 rounded-md md:space-y-4 lg:w-4/6">
                <h2 className="text-lg font-medium">
                    Comentario del Usuario
                </h2>

                <p className={`${fontText.className} text-sm bg-white p-4 rounded-md md:text-base`}>
                    { suggestion.text }
                </p>
            </div>
            
            {/* Seección de detalles */}
            <div className="flex flex-col p-4 gap-4 h-fit bg-gray-50 rounded-md lg:w-2/6">
                <div className="flex gap-4 justify-between">
                    <UserNameView value={suggestion.user}/>
                    <ComplaintState active={suggestion.active}/>
                </div>

                <hr className="text-gray-300"/>

                <div className="flex justify-between">
                    <DataSection 
                        label="Creado:" 
                        className="flex-col sm:flex-row"
                        value={suggestion.created}
                    />

                    <DataSection 
                        label="Resuelto:" 
                        className="flex-col sm:flex-row"
                        value={suggestion.upate.length === 0 ? "--/--/--" : suggestion.upate}
                    />
                </div>

                {
                    !suggestion.active && (
                        <button 
                            className="button-primary h-11"
                        >
                            Resolver Comentario
                        </button>
                    )
                }
            </div>
        </div>
    )
}
