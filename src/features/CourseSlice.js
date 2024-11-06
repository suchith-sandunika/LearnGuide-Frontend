import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: []
}

export const CourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addedCourses: (state, action) => {
            const addedCourses = {
                id: action.payload._id,
                image: action.payload.image,
                name: action.payload.name,
                description: action.payload.description,
                prerequisites: action.payload.prerequisites,
                target_audience: action.payload.target_audience,
                level: action.payload.level,
                fee: action.payload.fee,
                teacher: action.payload.teacher
            }
            state.courses.push(addedCourses);
        }
    }
}) 

export const { addedCourses } = CourseSlice.actions;

export default CourseSlice.reducer;