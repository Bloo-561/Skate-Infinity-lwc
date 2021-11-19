import { api, LightningElement } from 'lwc';
import IMAGE_URL from '@salesforce/resourceUrl/skate_assets';

const VIDEO = 'Video';
const IMAGE = 'Image';

export default class HeroInfo extends LightningElement {

    @api title;
    @api slogan;
    @api heroDetailsPosition;
    @api resourceUrl;
    @api imgOrVideo;
    @api internalResource;
    @api overlay;
    @api opacity;

    get resUrl() {
        if (this.isImg) {
            if (this.internalResource) {
                return IMAGE_URL + this.resourceUrl;
            }
        }
        return this.resourceUrl;
    }

    get isVideo() {
        return this.imgOrVideo === VIDEO;
    }

    get isImg() {
        return this.imgOrVideo === IMAGE;
    }

    get heroPositionClass() {
        if (this.heroDetailsPosition === 'left') {
            return 'c-hero-center-left';
        } else if (this.heroDetailsPosition === 'right') {
            return 'c-hero-center-right';
        }

        return 'c-hero-center-default';
    }

    renderedCallback() {
        
        const overlay = this.template.querySelector('div');
        if (overlay) {
            overlay.style.opacity = parseInt(this.opacity, 10) / 10;
        }
    }
}