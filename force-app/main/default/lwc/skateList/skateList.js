import { LightningElement, api, wire } from 'lwc';

import { publish, subscribe, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';

import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class SkateList extends LightningElement {
    
    @api searchBarIsVisible = false;
    @api tilesAreDraggable = false;

    pageNumber = 1;
    pageSize;
    totalItemCount = 0;
    filters = {};

    @wire(MessageContext) messageContext;

    productFilterSubscription;

    @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber' })
    products;

    connectedCallback() {
        this.productFilterSubscription = subscribe(
            this.messageContext,
            PRODUCTS_FILTERED_MESSAGE,
            (message) => this.handleFilterChange(message)
        );
    }

    handleProductSelected(event) {
        publish(this.messageContext, PRODUCT_SELECTED_MESSAGE, {
            productId: event.detail
        });
    }

    handleSearchKeyChange(event) {
        this.filters = {
            searchKey: event.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    handleFilterChange(message) {
        this.filters = { ...message.filters };
        this.pageNumber = 1;
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
}
