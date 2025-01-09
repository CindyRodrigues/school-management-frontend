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

export const updateTeacherAsync = createAsyncThunk("teachers/updateTeacher", async ({ teacherId, updatedTeacher }) => {
    const response = await axios.put(`https://school-management-backend-ten.vercel.app/teachers/${teacherId}`, updatedTeacher)
    return response.data
})

export const deleteTeacherAsync = createAsyncThunk("teachers/deleteTeacher", async (teacherId) => {
    const response = await axios.delete(`https://school-management-backend-ten.vercel.app/teachers/${teacherId}`)
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
        builder.addCase(updateTeacherAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(updateTeacherAsync.fulfilled, (state, action) => {
            state.status = "success"
            const index = state.teachers.findIndex((teacher) => teacher._id === action.payload._id)
            if(index >= 0) {
                state.teachers[index] = action.payload
            }
        })
        builder.addCase(updateTeacherAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(deleteTeacherAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(deleteTeacherAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.teachers = state.teachers.filter((teacher) => teacher._id !== action.payload.teacher._id)
        })
        builder.addCase(deleteTeacherAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export default teachersSlice.reducer