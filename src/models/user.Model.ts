export interface User{
    id?:string,
    name : string,
    email : string,
    phoneNo : number,
    address : string
}

export interface PaginationPayload{
    page : number,
    setPage: React.Dispatch<React.SetStateAction<number>>;
}