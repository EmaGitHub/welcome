import { ServiceAttribute } from './service-attribute.model';
import {Service} from '../../pages/services-attributes-management/model/service.model';

export interface SiteService extends Service {
    attributeServiceList: ServiceAttribute[];
}
