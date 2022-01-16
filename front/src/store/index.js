import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import themeSlice from './themeSlice'

const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store