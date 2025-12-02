import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteUser, getUserAPI } from "../../../services/user.api"
import type { User } from "../../../models/user.Model"
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

import "./user-grid.scss"
import { toast } from "react-toastify";
import Pagination from "../../../pages/pagination/Pagination";

const UserGrid = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState(null)
    const [allData, setAllData] = useState([])
    const [sort, setSort] = useState(true)
    const [inputVal, setInputVal] = useState('')
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [limit] = useState(5)
    const [totalCount, setTotalCount] = useState(0)

    async function getUsers() {
        setLoading(true)
        try {
            let response = await getUserAPI(page,limit)
            setData(response?.data.sort((a: User, b: User) => a.name.localeCompare(b.name)))
            setAllData(response?.data)
            setLoading(false)
            SetError(null)
        } catch (error: any) {
            setData([])
            SetError(error?.message || 'something went wrong')
            toast.error(error?.message || 'something went wrong');
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [page])

    const removeUser = async (id: string | undefined) => {
        try {
            await deleteUser(id)
            toast.success("User deleted succesfully")
            getUsers()
        } catch (error: any) {
            toast.error(error?.message || 'something went wrong')
        }
    }

    const sortByName = () => {
        let sortedData
        if (!sort) {
            sortedData = data.sort((a: User, b: User) => a.name.localeCompare(b.name))
            setData(sortedData)
            setSort(!sort)
        } else {
            sortedData = data.sort((a: User, b: User) => b.name.localeCompare(a.name))
            setData(sortedData)
            setSort(!sort)
        }
    }
    const filterByName = (val: string) => {
        setInputVal(val)
        if(val?.trim() !== ''){
           let filterData = allData.filter((user:User) => user?.name?.toLowerCase().includes(val?.toLowerCase()))
           setData(filterData)
        } else {
            setData(allData)
        }
    }
    const editUser =(id:string | undefined) =>{
            navigate('/edit-user/'+id)
    }
    return (
        <div className="col-md-10 mt-4 mx-auto">
            <div className="col-md-6 mx-auto mb-2">
                <input type="text" className="form-control" placeholder="search by name" value={inputVal} onInput={(e: React.ChangeEvent<HTMLInputElement>) => filterByName(e.target.value)} />
            </div>
            <div className="d-flex justify-content-between align-item-center">
                <h2>User Grid</h2>
                <div>
                    <Link className="btn btn-primary" to="/add-user">Add User</Link>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name {sort ? <span onClick={sortByName}><FaArrowUp /></span> : <span onClick={sortByName}><FaArrowDown /></span>} </th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {loading && <td>Loading...</td>}
                    </tr>
                    <tr>
                        {error && <td>{error}</td>}
                    </tr>
                    <tr>
                        {!data?.length && <td><h3>No records found</h3></td>}
                    </tr>
                    {
                        data?.map((user: User) => (
                            <tr key={user?.id}>
                                <th scope="row">{user?.name}</th>
                                <td>{user?.email}</td>
                                <td>{user?.address}</td>
                                <td className="d-flex gap-4">
                                    <span className="cursor-pointer" onClick={() => editUser(user?.id)}><TiPencil /></span>
                                    <span className="cursor-pointer" onClick={() => removeUser(user?.id)}><FaRegTrashAlt /></span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                {
                    data?.length ? <Pagination page={page} setPage={setPage} /> : ''
                }
            </div>
        </div>
    )
}

export default UserGrid