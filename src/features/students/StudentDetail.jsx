import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const StudentDetail = () => {
    const studentId = useParams()

    const students = useSelector((state) => state.students)

    const student = students.find((student) => student._id === studentId)
}

export default StudentDetail