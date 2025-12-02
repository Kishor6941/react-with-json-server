import axios from "axios"
import API_Constant from "../constants/apiConstant"
import type { User } from "../models/user.Model"

export const createUser = (payload:User) => {
    return axios.post(API_Constant.userAPI,payload)
}

export const getUserAPI = (current:number,limit:number) => {
    return axios.get(`${API_Constant.userAPI}?_page=${current}&_limit=${limit}`)
}

export const deleteUser = (id:string | undefined) => {
    if(id) {
        return axios.delete(`${API_Constant.userAPI}/${id}`)
    }
}

export const getUserById = (id:string | undefined) => {
    if(id){
        return axios.get(`${API_Constant.userAPI}/${id}`)
    }
}

export const updateUserById = (id:string | undefined,payload:User) => {
    if(id){
        return axios.put(`${API_Constant.userAPI}/${id}`,payload)
    }
}