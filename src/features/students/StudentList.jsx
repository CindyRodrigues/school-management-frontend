import { Link } from "react-router-dom"

const StudentList = ({ students }) => {
    return (
        <ul>
            {students.map((student) => (<li key={student._id}>
                <Link to={`/students/${student._id}`}>{student.name} (Age: {student.age})</Link>
            </li>))}
        </ul>
    )
}

export default StudentList