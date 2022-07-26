import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export class RouteInfo {
    public path: string;
    public title: string;
    public icon: IconDefinition;
    public show: boolean;
    public extraCondition: boolean;
}