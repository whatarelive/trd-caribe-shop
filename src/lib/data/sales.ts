import type { ISales } from "@/interfaces/models/sales.interface";

export const sales: ISales[] = [{
    id: 1,
    user: "Pepe el Salvaje",
    total: 400,
    payment_method: "APPLE_PAY",
    status: "CANCELED"
},{
    id: 2,
    user: "Colins",
    total: 1200,
    payment_method: "CREDIT_CARD",
    status: "DELIVERED"
},{
    id: 3,
    user: "Marcos Salvaje",
    total: 400,
    payment_method: "DEBIT_CARD",
    status: "PENDING"
},{
    id: 4,
    user: "Pepe Lalvaje",
    total: 40,
    payment_method: "PAYPAL",
    status: "PAID"
},{
    id: 5,
    user: "Pepe Luis",
    total: 130,
    payment_method: "STRIPE",
    status: "SHIPPED"
},{
    id: 6,
    user: "Jose Luis",
    total: 300,
    payment_method: "GOOGLE_PAY",
    status: "CANCELED"
},{
    id: 7,
    user: "Lilis Jes",
    total: 2000,
    payment_method: "APPLE_PAY",
    status: "CANCELED"
},]