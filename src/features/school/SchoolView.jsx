import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/Header"
import { updateSchoolStats, setTopStudent } from "./schoolSlice"
import { fetchStudents } from "../students/studentsSlice"

const SchoolView = () => {
    const dispatch = useDispatch()
    const { students } = useSelector((state) => state.students)
    const { schoolStatistics, topPerformingStudent } = useSelector((state) => state.school)

    useEffect(() => {
        dispatch(fetchStudents())
    }, [dispatch])

    useEffect(() => {
        const totalStudents = students.length
        const averageAttendance = totalStudents > 0 ? students.reduce((sum, student) => sum + (student.attendance || 0), 0) / totalStudents : 0
        const averageMarks = totalStudents > 0 ? students.reduce((sum, student) => sum + (student.marks || 0), 0) / totalStudents : 0
        const topStudent = totalStudents > 0 ? students.reduce((topPerformingStudent, student) => (student.marks || 0) > (topPerformingStudent?.marks || 0) ? student : topPerformingStudent , {}) : {}
        dispatch(updateSchoolStats({ totalStudents, averageAttendance, averageMarks, topStudent }))
        dispatch(setTopStudent(topStudent))
    }, [students, dispatch])

    return (
        <div>
            <Header />
            <main className="container py-3">
                <h1 className="mb-3">School View</h1>
                <p>Total Students: {schoolStatistics.totalStudents}</p>
                <p>Average Attendance: {schoolStatistics.averageAttendance?.toFixed(2) || 0}</p>
                <p>Average Marks: {schoolStatistics.averageMarks?.toFixed(2) || 0}</p>
                <p>Top Student: {topPerformingStudent?.name || "-"}</p>
            </main>
        </div>
    )
}

export default SchoolView