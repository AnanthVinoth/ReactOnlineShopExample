import { ADD_ITEMS, PLACE_ORDER_ITEM } from './actionTypes';
import ITEMS_ARR from './data.json';

const ITEMS_OBJ = {};
for (const item of ITEMS_ARR.items) {
    ITEMS_OBJ[item.id] = item;
}
const INITIAL_STATE = {
    items: ITEMS_OBJ,
    placeOrderItems:[]
}

function rootReducer(state=INITIAL_STATE, action) {
    const {type} = action;
    switch (type) {
        case ADD_ITEMS:
            const { name, weight, price,  } = action.items;
            return { items: 
                [ ...state.items,
                    { name, price, weight}
                ]
            }
        case PLACE_ORDER_ITEM:
            return { 
                ...state, placeOrderItems: action.placeOrderItems 
            }
        default:
            return state
    }
  }
  
  export default rootReducer;
