import { createSlice } from '@reduxjs/toolkit';
import products from '../data/products';

const initialState = {
    products: products
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Add reducers here if needed in the future
    }
});

export default productsSlice.reducer;