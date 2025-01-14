import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteStudentAsync } from "./studentsSlice"

const StudentDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { studentId } = useParams()
    const { students } = useSelector((state) => state.students)
    const student = students.find((student) => student._id === studentId)

    const handleDelete = () => {
        dispatch(deleteStudentAsync(studentId))
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    return (
        <div>
            <main className="container py-3">
                <h1 className="mb-3">Student Detail</h1>
                {student && (
                    <>
                        <p>Name: {student.name}</p>
                        <p>Age: {student.age}</p>
                        <p>Grade: {student.grade}</p>
                        <p>Gender: {student.gender}</p>
                        <p>Attendance: {student.attendance || "Unknown"}</p>
                        <p>Marks: {student.marks || "Unknown"}</p>
                        <button className="btn btn-warning me-2">
                            <Link to="/students/add" state={student}>Edit Details</Link>
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </main>
        </div>
    )
}

export default StudentDetail