import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import Scaffold from "../components/scaffold.component";

interface AuthGuardProps{
    sidebarItems: any[];
}

const AuthGuard = ({ sidebarItems } : AuthGuardProps ) => {
    const token = useSelector((state: RootState) => state.auth.authData?.accessToken);

    if( token == undefined ){
        return <Navigate replace to={'/login'} />
    }

    if( token == ''){
        return <Navigate replace to={'/login'} />
    }

    return(
        <Scaffold sidebarItems={sidebarItems}>
            <Outlet />
        </Scaffold>
    );
}

export default AuthGuard;