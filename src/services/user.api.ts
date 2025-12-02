import axios from "axios"
import API_Constant from "../constants/apiConstant"
import type { User } from "../models/user.Model"

export const createUser = (payload:User) => {
    return axios.post(API_Constant.userAPI,payload)
}

export const getUserAPI = () => {
    return axios.get(API_Constant.userAPI)
}

export const deleteUser = (id:string | undefined) => {
    return axios.delete(`${API_Constant.userAPI}/${id}`)
}

export const getUserById = (id:string | undefined) => {
    return axios.get(`${API_Constant.userAPI}/${id}`)
}

export const updateUserById = (id:string | undefined,payload:User) => {
    return axios.put(`${API_Constant.userAPI}/${id}`,payload)
}