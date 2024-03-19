import { useEffect,useState } from "react"; 
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Private=()=>{
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get('/api/v1/auth/user-auth',{
                headers:{
                    'Authorization':auth?.token
                }
            })
            if(res.data.ok)
            setOk(true);
            else
            setOk(false);
        }
        if(auth?.token)authCheck();
    },[auth?.token])
    return ok?<Outlet></Outlet>:<>spinner</>
}
export default Private;