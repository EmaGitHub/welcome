import { SiteService } from '../../shared/model/site-service.model';

export interface SiteDetails {
    id_site: number;
    id_building_manager: string;
    address: string;
    language: string;
    serviceList: SiteService[];
}
