import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    const response = await axios.get("https://school-management-backend-ten.vercel.app/students")
    return response.data
})

export const addStudentAsync = createAsyncThunk("students/addStudent", async (newStudent) => {
    const response = await axios.post("https://school-management-backend-ten.vercel.app/students", newStudent)
    return response.data
})

export const updateStudentAsync = createAsyncThunk("students/updateStudent", async ({studentId, updatedStudent}) => {
    const response = await axios.put(`https://school-management-backend-ten.vercel.app/students/${studentId}`, updatedStudent)
    return response.data
})

export const deleteStudentAsync = createAsyncThunk("students/deleteStudent", async (studentId) => {
    const response = await axios.delete(`https://school-management-backend-ten.vercel.app/students/${studentId}`)
    return response.data
})

export const studentsSlice = createSlice({
    name: "students",
    initialState: {
        students: [],
        status: "idle",
        error: null,
        filter: "All",
        sortBy: "name"
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setSortBy: (state,action) => {
            state.sortBy = action.payload
        }
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
        builder.addCase(addStudentAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addStudentAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.students.push(action.payload)
        })
        builder.addCase(addStudentAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(updateStudentAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
            state.status = "success"
            const index = state.students.findIndex((student) => student._id === action.payload._id)
            if(index >= 0) {
                state.students[index] = action.payload
            }
        })
        builder.addCase(updateStudentAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(deleteStudentAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.students = state.students.filter((student) => student._id !== action.payload.student._id)
        })
        builder.addCase(deleteStudentAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export const { setFilter, setSortBy } = studentsSlice.actions

export default studentsSlice.reducer