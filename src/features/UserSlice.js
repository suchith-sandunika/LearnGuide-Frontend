import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    registeredUsers: [],
    loggedUsers: [],
    logoutUsers: [],
    userProfileData: []
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const registeredUser = {
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                // password: action.payload.password,
                image: action.payload.image,
                role: action.payload.role,
            }
            state.registeredUsers.push(registeredUser);
        }, 

        loggedUser: (state, action) => {
            const loggedUser = {
                name: action.payload.name,
                token: action.payload.token
                // password: action.payload.password,
            }
            state.loggedUsers.push(loggedUser);
        }, 

        logoutUser: (state, action) => {
            const logoutUser = {
                id: null,
                name: null,
            }
            state.loggedUsers.pop(loggedUser);
        }, 

        profile: (state, action) => {
            const userProfile = {
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                image: action.payload.image,
                courses: action.payload.courses
            }
            state.userProfileData.push(userProfile);
        }
    }
}) 

export const { registerUser, loggedUser, logoutUser, profile } = UserSlice.actions;

export default UserSlice.reducer;