import { useForm } from "react-hook-form"
import type { User } from "../../../models/user.Model"
import { createUser } from "../../../services/user.api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddEditUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>({ mode: "onTouched",})
    const navigate = useNavigate()

    async function addUser(data:User) {
        try {
              await createUser(data)
              toast.success('User created successfully')  
              setTimeout(()=>{
                    navigate('/')
              },1000)
        } catch(err:any) {
                toast.error(err?.message || 'something went wrong')
        }
    }

    const addOrEditUser = (data: User) => {
        addUser(data)
    }
    return (
        <div className="col-md-6 mx-auto mt-4">
            <h2>Add Edit User</h2>
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
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    )
}

export default AddEditUser