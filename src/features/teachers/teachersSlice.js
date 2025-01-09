import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async () => {
    const response = await axios.get("https://school-management-backend-ten.vercel.app/teachers")
    return response.data
})

export const addTeacherAsync = createAsyncThunk("teachers/addTeacher", async (newTeacher) => {
    const response = await axios.post("https://school-management-backend-ten.vercel.app/teachers", newTeacher)
    return response.data
})

export const teachersSlice = createSlice({
    name: "teachers",
    initialState: {
        teachers: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchTeachers.fulfilled, (state, action) => {
            state.status = "success"
            state.teachers = action.payload
        })
        builder.addCase(fetchTeachers.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(addTeacherAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addTeacherAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.teachers.push(action.payload)
        })
        builder.addCase(addTeacherAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export default teachersSlice.reducer