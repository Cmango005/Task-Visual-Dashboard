
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users])
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    toast(`${user.name} is Admin now`)
                }
            })
    }
    return (
        <div className="">
          
            <div className="overflow-x-auto p-5">
                <table className="table w-3/4">
                    {/* head */}
                    <thead>
                        <tr className="text-black">
                            <th>NO.</th>
                            <th>Name</th>
                            <th>Email</th>
                            
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map((user, index) => <tr key={user._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                               
                                <td><div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="btn m-1">Role</div>
                                    <ul className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
                                        {user.role === 'Admin' ? (
                                            <p>Admin</p>
                                        ) : (
                                            <>
                                                
                                                <button onClick={() => handleMakeAdmin(user)}>
                                                    <li><a>Make Admin</a></li>
                                                </button>
                                            </>
                                        )}

                                        <ToastContainer></ToastContainer>

                                    </ul>
                                </div></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;