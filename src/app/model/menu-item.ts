import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export class MenuItem {

    public id: number;
    public icon: IconDefinition;
    public title: string;

    constructor(id: number, icon: IconDefinition, title: string) {
        this.id = id;
        this.icon = icon;
        this.title = title;
    }

}