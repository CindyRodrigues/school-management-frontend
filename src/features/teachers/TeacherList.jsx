import { Link } from "react-router-dom"

const TeacherList = ({ teachers }) => {
    return (
        <ul>
            {teachers.map((teacher) => (
                <li key={teacher._id}>
                    <Link to={`/teachers/${teacher._id}`}>{teacher.name}</Link>
                </li>
            ))}
        </ul>
    )
}

export default TeacherList