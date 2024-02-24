import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
interface themeState {
    theme: string;
}

const initialState: themeState = {
    theme: 'dark',
};

export const themeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        switchTheme(state, action: PayloadAction<number>) {
            if (state.theme == 'dark') {
                state.theme = 'light';
            } else state.theme = 'dark';
        },
    },
});
export default themeSlice.reducer;
export const themeActions = themeSlice.actions;
