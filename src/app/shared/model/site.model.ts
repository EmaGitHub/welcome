import { SiteService } from './site-service.model';

export interface Site {
    wccode: string;
    idSite: number;
    idArchibus: string;
    idFacilityManager: string;
    address: string;
    city: string;
    region: string;
    country: string;
    serviceList?: SiteService[];
}
