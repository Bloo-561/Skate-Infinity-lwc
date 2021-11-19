import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';


import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import COLOR_FIELD from '@salesforce/schema/Product__c.Color__c';



import { publish, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';


const DELAY = 350;

export default class SkateFilter extends LightningElement {
    searchKey = '';
    maxPrice = 200;

    filters = {
        searchKey: '',
        maxPrice: 200
    };

    @wire(MessageContext)
    messageContext;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CATEGORY_FIELD
    })
    categories;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: COLOR_FIELD
    })
    colors;

    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleMaxPriceChange(event) {
        const maxPrice = event.target.value;
        this.filters.maxPrice = maxPrice;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event) {
        if (!this.filters.categories) {
            this.filters.categories = this.categories.data.values.map(
                (item) => item.value
            );
            this.filters.colors = this.colors.data.values.map(
                (item) => item.value
            );
        }
        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];
        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                (item) => item !== value
            );
        }
        
        publish(this.messageContext, PRODUCTS_FILTERED_MESSAGE, {
            filters: this.filters
        });
    }

    delayedFireFilterChangeEvent() {
        
        window.clearTimeout(this.delayTimeout);
        
        this.delayTimeout = setTimeout(() => {
            publish(this.messageContext, PRODUCTS_FILTERED_MESSAGE, {
                filters: this.filters
            });
        }, DELAY);
    }
}