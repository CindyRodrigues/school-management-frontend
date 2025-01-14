import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TeacherList from "./TeacherList"
import { useEffect } from "react"
import { fetchTeachers } from "./teachersSlice"

const TeacherView = () => {
    const dispatch = useDispatch()
    const { teachers, status, error } = useSelector((state) => state.teachers)

    useEffect(() => {
        dispatch(fetchTeachers())
    }, [dispatch])

    return (
        <div>
            <main className="container py-3">
                <h1 className="mb-3">Teacher View</h1>
                <button className="btn btn-warning mb-3">
                    <Link to="/teachers/add">Add Teacher</Link>
                </button>
                <h2>Teacher List</h2>
                {status === "loading" && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {status === "success" && teachers && <TeacherList teachers={teachers} />}
            </main>
        </div>
    )
}

export default TeacherView