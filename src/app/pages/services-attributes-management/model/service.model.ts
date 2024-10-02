import { Category } from "./category.model";

export interface Service {
    id_service: number;
    position: number;
    is_deleted: boolean;
    is_disabled: boolean;
    name: string;
    language: string;
    icon: string;
    category : Category ; 
}
