import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    const response = await axios.get("https://school-management-backend-ten.vercel.app/students")
    return response.data
})

export const addStudentAsync = createAsyncThunk("students/addStudent", async () => {
    const response = await axios.post()
    return response
})

export const studentsSlice = createSlice({
    name: "students",
    initialState: {
        students: [],
        status: "idle",
        error: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = "success"
            state.students = action.payload
        })
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export default studentsSlice.reducer