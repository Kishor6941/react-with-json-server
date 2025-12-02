import { useForm } from "react-hook-form"
import type { User } from "../../../models/user.Model"
import { createUser, getUserById, updateUserById } from "../../../services/user.api"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const AddEditUser = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<User>({ mode: "onTouched", })
    const navigate = useNavigate()
    const { id } = useParams()

    /**
     * 
     * @param data Add User
     */

    async function addUser(data: User) {
        try {
            await createUser(data)
            toast.success('User created successfully')
            setTimeout(() => {
                navigate('/')
            }, 500)
        } catch (err: any) {
            toast.error(err?.message || 'something went wrong')
        }
    }

    /**
     * 
     * @param data Update User
     */

    async function updateUser(data: User) {
        try {
            await updateUserById(id, data)
            toast.success('User updated successfully')
            setTimeout(() => {
                navigate('/')
            }, 500)
        } catch (err: any) {
            toast.error(err?.message || 'something went wrong')
        }
    }

    /**
     * 
     * @param data add or update user
     */

    const addOrEditUser = (data: User) => {
        if (id) {
            updateUser(data)
        } else {
            addUser(data)
        }
    }

    /**
     *  get user by id and set the form values
     */

    const getUser = async () => {
        try {
            let response = await getUserById(id)
            console.log(response?.data)
            setValue('name', response?.data?.name)
            setValue('email', response?.data?.email)
            setValue('address', response?.data?.address)

        } catch (error) {

        }
    }

    /**
     *  useEffect to get user by Id
     */

    useEffect(() => {
        getUser()
    }, [id])

    return (
        <div className="col-md-6 mx-auto mt-4">
            <h2>{!id ? 'Add' : 'Update'} User</h2>
            <form onSubmit={handleSubmit(addOrEditUser)}>
                <div className="form-group mb-2">
                    <label >Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" {...register("name", {
                        required: 'name is required',
                    })} />
                    {
                        errors?.name &&
                        (
                            <small className="form-text text-danger">{errors?.name?.message}</small>
                        )
                    }
                </div>
                <div className="form-group mb-2">
                    <label >Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" {...register("email", {
                        required: 'email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    })} />
                    {
                        errors?.email &&
                        <small className="form-text text-danger">{errors?.email?.message}</small>
                    }
                </div>
                <div className="form-group mb-2">
                    <label >Address</label>
                    <input type="text" className="form-control" placeholder="Enter address" {...register("address", {
                        required: 'address is required'
                    })} />
                    {
                        errors?.address &&
                        <small className="form-text text-danger">{errors?.address?.message}</small>
                    }
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'} User</button>
            </form>
        </div>
    )
}

export default AddEditUser