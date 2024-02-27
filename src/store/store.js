import { createStore } from "redux";
const intialState = {
    carts: [],
    loadingCart: false,
    searchProducts: [],
    showLocation: true,
    address: "Kiến Hưng, Hà Đông, Hà Nội",
    showAddAddress: false,
    addressUser: [],
    showOrder: false,
    productsOrder: [],
    totalBill: 0,
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
      case "Add_To_Cart": {
        return {
          ...state,
          carts: [...state.carts, action.payload],
        };
      }

      case "UPDATE_ADDRESS": {
        return {
          ...state,
          address: action.payload,
        };
      }

      case "UPDATE_CARTS_DATA":
        return {
          ...state,
          carts: action.payload,
        };

      case "LOADING_STATUS":
        return {
          ...state,
          loadingCart: action.payload,
        };

      case "SHOW_LOCATION_STATUS":
        return {
          ...state,
          showLocation: action.payload,
        };

      case "SHOW_ADD_FORM_STATUS":
        return {
          ...state,
          showAddAddress: action.payload,
        };

      case "SHOW_ORDER_STATUS":
        return {
          ...state,
          showOrder: action.payload,
        };

      case "UPDATE_SEARCH_PRODUCTS":
        return {
          ...state,
          searchProducts: action.payload,
        };

      case "INCREASE_AMOUNT":
        return {
          ...state,
          carts: state.carts.map((product) => {
            if (product.id === action.payload) {
              return {
                ...product,
                amount: product.amount + 1,
              };
            }
            return product;
          }),
        };
      case "DECREASE_AMOUNT":
        return {
          ...state,
          carts: state.carts.map((product) => {
            if (product.id === action.payload && product.amount > 1) {
              return {
                ...product,
                amount: product.amount - 1,
              };
            }
            return product;
          }),
        };

      case "REMOVE_FROM_CART":
        return {
          ...state,
          carts: state.carts.filter((product) => product.id !== action.payload),
        };

      case "SAVE_ADDRESS":
        return {
          ...state,
          addressUser: [...state.addressUser, action.payload],
        };

      case "SAVE_ADDRESS_ARR":
        return {
          ...state,
          addressUser: action.payload,
        };

      case "ADD_PRODUCTS_ORDER": {
        return {
          ...state,
          productsOrder: action.payload,
        }
      }

      case "REMOVE_FROM_ADDRESS":
        return {
          ...state,
          addressUser: state.addressUser.filter(
            (user) => user.id !== action.payload
          ),
        };
      
      case "GET_TOTAL_BILL": 
      return {
        ...state,
        totalBill: action.payload,
      }

      default:
        return state;
    }
}

const store = createStore(reducer);
export default store;