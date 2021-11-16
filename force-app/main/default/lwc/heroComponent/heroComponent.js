import { LightningElement, api, wire } from 'lwc';
import getRecordInfo from '@salesforce/apex/ProductRecordInfoController.getRecordInfo';

export default class HeroComponent extends LightningElement {
    @api title = 'Hero Infomation';
    @api subText;
    @api recordName;

    recordInfoData;
    hrefUrl;

    @wire(getRecordInfo, { productOrFamilyName: '$recordName'})
    recordInfo({ error, data }) {
        this.recordInfoData = { error, data };
        // Temporary workaround so that clicking on button navigates every time
        if (!error && data) {
            if (data[1] === 'Product__c') {
                this.hrefUrl = `product/${data[0]}`;
            } else {
                this.hrefUrl = `product-family/${data[0]}`;
            }
        }
    }
}