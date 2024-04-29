import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {URL} from "../Url"

export const UserContext = createContext({})

export function UserContextProvider({children}){
const [user, setuser] = useState(null)

useEffect(()=>{
    getUser()
},[])

const getUser = async()=>{
    try{
const res = await axios.get(URL+"/api/auth/refetch", {withCredentials:true})
// console.log(res.data)
setuser(res.data)


    }catch(err){    
        console.log(err)
    }
}






    return (<UserContext.Provider value={{user, setuser}}>
    
    {children}
    </UserContext.Provider>)
}

