import { createSlice } from "@reduxjs/toolkit"

export const schoolSlice = createSlice({
    name: "school",
    initialState: {
        schoolStatistics: {},
        topPerformingStudent: {}
    },
    reducers: {
        updateSchoolStats: (state, action) => {
            state.schoolStatistics = action.payload
        },
        setTopStudent: (state, action) => {
            state.topPerformingStudent = action.payload
        }
    }
})

export const { updateSchoolStats, setTopStudent } = schoolSlice.actions

export default schoolSlice.reducer