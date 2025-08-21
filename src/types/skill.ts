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