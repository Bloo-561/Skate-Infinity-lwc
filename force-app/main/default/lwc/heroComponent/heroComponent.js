import { LightningElement, api, wire } from 'lwc';
import getRecordInfo from '@salesforce/apex/ProductRecordInfoController.getRecordInfo';

export default class HeroDetails extends LightningElement {
    @api title = 'Hero Details'; 
    @api slogan;
    @api recordName;

    recordInfoData;
    isUrl;

    @wire(getRecordInfo, { productOrFamilyName: '$recordName' })
    recordInfo({ error, data }) {
        this.recordInfoData = { error, data };
        
        if (!error && data) {
            if (data[1] === 'Product__c') {
                this.isUrl = `product/${data[0]}`;
            } else {
                this.isUrl = `product-family/${data[0]}`;
            }
        }
    }
}
