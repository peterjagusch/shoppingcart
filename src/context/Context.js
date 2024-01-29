import React, { createContext, useReducer, useContext } from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer  } from './Reducers';

const Cart = createContext();

const Context = ({ children }) => {
    const products = [...Array(18)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.urlPicsumPhotos(),
        inStock: faker.helpers.arrayElement([0, 1, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5])
    }))


    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
      });
    
      const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      });
        
      return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
          {children}
        </Cart.Provider>
      );
    };
    
    export const CartState = () => {
      return useContext(Cart);
    };
    
    export default Context;