import axios from "axios";
import React, { useEffect } from "react";
import "./all_student.styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
    const navigate = useNavigate();
    const [allStudents, setAllStudents] = useState([]);

    useEffect(() => {
        const getAllStudents = async () => {
            const res = await axios.get('http://localhost:3000/student/all');
            setAllStudents(res.data.data);
        }
        getAllStudents();
    }, []);

    const handleDeleteStudent = async (id) => {
        await axios.post(`http://localhost:3000/faculty/delete/student/${id}`);
        navigate('/students/all');
        window.location.reload(false);
    }

    return (
        // <div className="all-students">
        //     {
        //         allStudents.length === 0 ?
        //             <h1>No Student Data</h1>
        //             :

        //             <div className="all-students-outer">

        //                 <div className="all-student-title">
        //                     <p className="all-student-title">ALL STUDENTS</p>
        //                 </div>

        //                 <div className="all-students-inner">
        //                     {
        //                         allStudents.map(student => (
        //                             <div>
        //                                 <Link to={`/student/${student.student_id}`}>
        //                                     <div className="particular--student">
        //                                         <p>{student.first_name}</p>
        //                                         <p>{student.middle_name}</p>
        //                                         <p>{student.last_name}</p>
        //                                     </div>
        //                                 </Link>
        //                                 <Button onClickHandler={() => { handleDeleteStudent(student.student_id) }}>Delete</Button>
        //                             </div>
        //                         ))
        //                     }
        //                 </div>
        //             </div>
        //     }
        // </div>
        <div className="all-students">
            {
                allStudents.length === 0
                    ?
                    <h1>NO STUDENT DATA</h1>
                    :
                    <div className="all-student-outer-wrap">
                        <div className="all-student-title">
                            <p>ALL STUDENTS LIST</p>
                        </div>
                        <div className="all-student-inner-wrap">
                            {
                                allStudents.map(student => (
                                    <div className="indi-student">
                                        <div className="indi-info">
                                            <Link to={`/student/${student.student_id}`} className="link">
                                                <p>{student.first_name} {student.middle_name} {student.last_name}</p>
                                            </Link>
                                        </div>
                                        <div className="indi-btn">
                                            <Button onClickHandler={() => { handleDeleteStudent(student.student_id) }}>Delete</Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
export default AllStudents;