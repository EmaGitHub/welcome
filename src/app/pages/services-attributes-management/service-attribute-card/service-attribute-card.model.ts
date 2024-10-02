import {ServiceAttributeType} from '../../../shared/constants/ServiceAttributeType';
import { Category } from '../model/category.model';

export interface ServiceAttributeCard {
    id: number;
    name: string;
    is_deleted: boolean;
    language: string;
    icon?: string;
    type: ServiceAttributeType;
    category? : Category ;
}
