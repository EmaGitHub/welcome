export interface Message {
    uuid: string;
    message: string;
}

export interface Pizza {
    name: string;
    description: string;
    price: string;
    icon?: string;
}

export interface User {
    userId: string;
    name: string;
}

export interface Order {
    orderId: string;
    customerName: string;
    pizzaType?: string;
    quantity?: bigint;
    delivered?: boolean;
}

export interface UserData {
    user: string;
    surname: string;
    name: string;
    email: string;
}

export interface Code {
    code: string;
}

export interface TerritoryCode {
    code: string;
    description: string;
    level: bigint;
}

export interface RestResponse<T> {
    errorMessages: Record<string, string>;
    output: T;
    totalPages?: number;
    totalCounts?: number;
}

export interface Session {
    expiration: bigint;
}

export interface PagedList<T> {
    list: T[];
    totalPage: number;
    totalCount: number;
}
