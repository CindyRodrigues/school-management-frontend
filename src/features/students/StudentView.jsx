import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents } from "./studentsSlice"
import Header from "../../components/Header"
import { Link } from "react-router-dom"
import StudentList from "./StudentList"

const StudentView = () => {
    const dispatch = useDispatch()
    const { students, status, error } = useSelector((state) => state.students)

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    return (
        <div>
            <Header />
            <main className="container py-3">
                <h1 className="mb-3">Student View</h1>
                <button className="btn btn-warning mb-3">
                    <Link to="/">Add Student</Link>
                </button>
                <h2>Student List</h2>
                {status === "loading" && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <StudentList students={students} />
            </main>
        </div>
    )
}

export default StudentView