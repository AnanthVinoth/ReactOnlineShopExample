import { ADD_ITEMS, PLACE_ORDER_ITEM  } from './actionTypes';

export const itemActions = {
    addItems,
    placeOrderItems
}

function addItems(items) {
    return {
      type: ADD_ITEMS,
      items
    };
}

function placeOrderItems(placeOrderItems) {
    return {
        type: PLACE_ORDER_ITEM,
        placeOrderItems
    }
}

