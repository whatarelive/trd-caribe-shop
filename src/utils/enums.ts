export enum SaleMethodPayment {
    CREDIT_CARD = "Tarjeta Credito",
    DEBIT_CARD = "Tarjeta Debito", 
    PAYPAL = "Paypal",
    STRIPE = "Stripe",
    APPLE_PAY = "Apple Pay",
    GOOGLE_PAY = "Google Pay",
}

export enum SaleStatus {
    PENDING = "Pendiente", 
    PAID = "Pagada",
    SHIPPED = "Enviada", 
    DELIVERED = "Entregada", 
    CANCELED = "Cancelada",
}

export enum PromotionChoice {
    greater = "Mayor que", 
    less = "Menor que", 
    between = "Entre",
}