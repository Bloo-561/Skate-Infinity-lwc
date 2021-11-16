import { api, LightningElement } from 'lwc';
import IMAGE_URL from '@salesforce/resourceUrl/skate_assets';

const VIDEO = 'Video';
const IMAGE = 'Image';

export default class HeroInfo extends LightningElement {

    @api title;
    @api subText;
    @api buttonText;
    @api heroPosition;
    @api resourceUrl;
    @api imgOrVideo;
    @api intRes;
    @api buttonToStore;

    get resUrl() {
        if(this.Img) {
            if(this.intRes) {
                return IMAGE_URL + this.resourceUrl;
            }
        }
        return this.resourceUrl;
    }

    get Video() {
        return this.imgOrVideo === VIDEO;
    }

    get Img() {
        return this.imgOrVideo === IMAGE;
    }

    get heroInfoPositionClass() {
        if(this.heroPosition === 'left') {
            return 'hero-center-left';
        } else if(this.heroPosition === 'right') {
            return 'hero-center-right';
        }

        return 'hero-center-default';
    }
}