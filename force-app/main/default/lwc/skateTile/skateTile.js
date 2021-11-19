import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {

    @api draggable;

    _product;

    @api
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
        this.pictureUrl = value.Picture_Hyperlink__c;
        this.name = value.Name;
        this.msrp = value.MSRP_Price__c;
    }


    pictureUrl;
    name;
    msrp;

    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.product.Id
        });
        this.dispatchEvent(selectedEvent);
    }

    handleDragStart(event) {
        event.dataTransfer.setData('product', JSON.stringify(this.product));
    }
}