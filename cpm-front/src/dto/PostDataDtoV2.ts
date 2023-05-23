export interface PostDataDtov2 {
    suppliers: Supplier[];
    customers: Customer[];
}

export interface Customer {
    demand:       number;
    sellingPrice: number;
}

export interface Supplier {
    supply:         number;
    purchasePrice:  number;
    transportCosts: number[];
}