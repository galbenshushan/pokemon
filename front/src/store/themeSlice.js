import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'theme',
    initialState: false,
    reducers: {
        toggleTheme(state) {
            return state = !state
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice