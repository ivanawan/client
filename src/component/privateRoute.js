import { Navigate} from 'react-router-dom';
import { userlogout } from '../app/slice/User';
import { useSelector,useDispatch} from "react-redux";

export const Islogin = ({children}) => {    
    const user = useSelector((state)=>state.user);

    if(user.login === false){
        console.log("if1" ,user);
        return  <Navigate to="/" />
    }
    return  children ;    
};


export const Isadmin = ({children}) => {    
    const user = useSelector((state)=>state.user);
    if(user.status !== "ADMIN"){
      console.log("if2",user);
     return  <Navigate to="/" />
    }
    return  children ;    
};

export const Admin = ({children}) => {    
    const user = useSelector((state)=>state.user);
    if(user.status === "ADMIN"){
      console.log("if3",user);
     return  <Navigate to="/list-trasaction" />
    }
    return  children ;    
};



export const Logout = () => {    
    const dispatch=useDispatch();
    dispatch(userlogout());
    return  <Navigate to="/" />
};
