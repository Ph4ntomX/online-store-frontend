export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface CartProduct extends Product {
    quantity: number;
}

export interface Order {
    customerName: string;
    customerEmail: string;
    products: CartProduct[];
    totalPrice: number;
    status: "pending" | "paid" | "failed" | "completed";
    billplz_id: string;
    billplz_url: string;
    paid_at: string;
}

export interface Category {
    _id: string;
    name: string;
}
