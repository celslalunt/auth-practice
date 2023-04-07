import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: false,
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.id = action.payload.id;
            state.value.firstName = action.payload.firstName;
            state.value.lastName = action.payload.lastName;
            state.value.email = action.payload.email;
            state.value.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.value.id = 0;
            state.value.firstName = "";
            state.value.lastName = "";
            state.value.email = "";
            state.value.isAdmin = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;