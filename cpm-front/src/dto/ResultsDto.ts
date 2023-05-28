export interface PostDataDtov2 {
    response: Responsev2;
}

export interface Responsev2 {
    Income:            number;
    Individualprofits: number[];
    Optimaltransport:  number[];
    Profit:            number;
    Total_cost:        number;
}