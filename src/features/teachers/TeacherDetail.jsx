import { Link, useParams } from "react-router-dom"
import Header from "../../components/Header"
import { useSelector } from "react-redux"

const TeacherDetail = () => {
    const { teacherId } = useParams()
    const { teachers } = useSelector((state) => state.teachers)
    const teacher = teachers.find((teacher) => teacher._id === teacherId)

    const handleDelete = () => {}

    return (
        <div>
            <Header />
            <main className="container py-3">
                <h1 className="mb-3">Teacher Detail</h1>
                {teacher && (
                    <>
                        <p>Name: {teacher.name}</p>
                        <p>Email ID: {teacher.email}</p>
                        <p>Phone Number: {teacher.phoneNumber}</p>
                        <p>Gender: {teacher.gender}</p>
                        <p>Department: {teacher.department || "Unknown"}</p>
                        <p>Qualifications: {teacher.qualifications || "Unknown"}</p>
                        <button className="btn btn-warning me-2">
                            <Link to="/teachers/add" state={teacher}>Edit Details</Link>
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </main>
        </div>
    )
}

export default TeacherDetail