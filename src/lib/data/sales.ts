import type { ISales, ISalesDetail } from "@/interfaces/models/sales.interface";

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

export const saleForId: ISalesDetail = {
    id: 1,
    user: "Pepe el Salvaje",
    total: 1240,
    payment_method: "CREDIT_CARD",
    status: "CANCELED",
    products: [
        {
            id: 1,
            name: "Camiseta blanca",
            price: 20,
            discount: "5",
            quantity: 12,
            charged_price: "190.00"
        }, {
            id: 2,
            name: "Zapatos Adidas",
            price: 60,
            discount: "10",
            quantity: 5,
            charged_price: "250.00",
        }, {
            id: 3,
            name: "Papas fritas",
            price: 8,
            discount: "3",
            quantity: 10,
            charged_price: "50.00"
        }, {
            id: 4,
            name: "Refresco Coca Cola",
            price: 12,
            discount: "2",
            quantity: 12,
            charged_price: "120.00"
        }, {
            id: 5,
            name: "Batidora",
            price: 40,
            discount: "0",
            quantity: 12,
            charged_price: "480.00"
        }, {
            id: 6,
            name: "Papas fritas",
            price: 8,
            discount: "3",
            quantity: 10,
            charged_price: "50.00"
        }, {
            id: 7,
            name: "Refresco Coca Cola",
            price: 12,
            discount: "2",
            quantity: 12,
            charged_price: "120.00"
        }, {
            id: 8,
            name: "Batidora",
            price: 40,
            discount: "0",
            quantity: 12,
            charged_price: "480.00"
        },
    ],
}