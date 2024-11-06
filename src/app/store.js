import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../features/UserSlice'; 
import CourseReducer from '../features/CourseSlice';

const store = configureStore({
    reducer: {
        user: UserReducer,
        course: CourseReducer
    }
    //reducer: UserReducer, // This is the new way to structure your Redux store with Redux Toolkit
}) 

export default store;