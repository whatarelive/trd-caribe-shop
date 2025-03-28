import { IPromotions } from "@/interfaces/models/promotions.interface";

export const promotions: IPromotions[] = [{
    id: 1,
    name: "Promoción 1",
    choice: "between",
    porcentage: "20",
    max_price: "25.00",
    min_price: "15.00"
},{
    id: 2,
    name: "Promoción 2",
    choice: "less",
    porcentage: "10",
    max_price: "15.00"
},{
    id: 3,
    name: "Promoción 3",
    choice: "between",
    porcentage: "20",
    max_price: "45.00",
    min_price: "25.00"
},{
    id: 4,
    name: "Promoción 4",
    choice: "greater",
    porcentage: "5",
    min_price: "25.00",
},{
    id: 5,
    name: "Promoción 5",
    choice: "less",
    porcentage: "25",
    max_price: "10.00"
},{
    id: 6,
    name: "Promoción 6",
    choice: "greater",
    porcentage: "10",
    min_price: "50.00",
},{
    id: 7,
    name: "Promoción 7",
    choice: "between",
    porcentage: "5",
    max_price: "5.00",
    min_price: "1.00"
}]