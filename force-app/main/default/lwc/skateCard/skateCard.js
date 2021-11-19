import { LightningElement, wire } from 'lwc';


import { NavigationMixin } from 'lightning/navigation';
import { subscribe, MessageContext } from 'lightning/messageService';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';


import { getFieldValue } from 'lightning/uiRecordApi';


import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_Hyperlink__c';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP_Price__c';
import COLOR_FIELD from '@salesforce/schema/Product__c.Color__c';


export default class SkateCard extends NavigationMixin(LightningElement) {
    
    categoryField = CATEGORY_FIELD;
    msrpField = MSRP_FIELD;
    colorField = COLOR_FIELD;

    recordId;
    productName;
    productPictureUrl;

    
    @wire(MessageContext) messageContext;

    
    productSelectionSubscription;

    connectedCallback() {
        
        this.productSelectionSubscription = subscribe(
            this.messageContext,
            PRODUCT_SELECTED_MESSAGE,
            (message) => this.handleProductSelected(message.productId)
        );
    }

    handleRecordLoaded(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.productName = getFieldValue(recordData, NAME_FIELD);
        this.productPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
    }

    handleProductSelected(productId) {
        this.recordId = productId;
    }

    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }
}
