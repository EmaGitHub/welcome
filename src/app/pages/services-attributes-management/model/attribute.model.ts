export interface Attribute {
    id_att_service: number;
    language: string;
    icon: string;
    position: number;
    is_deleted: boolean; 
    is_attachment: boolean;
    name: string;
    value?: string;
    attachment?: string;
}
