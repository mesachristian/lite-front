import { useNavigate } from "react-router-dom";
import liteLogo from '../assets/Logo_Lite_Thinking_Sin_Fondo_1.png';
import { useDispatch } from "react-redux";
import { setAuthData } from "../redux/reducers/auth.reducer";

interface ScaffoldProps {
    sidebarItems: any[];
    children: React.JSX.Element | React.JSX.Element[];
}

const Scaffold = ({ sidebarItems, children }: ScaffoldProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleListItemClick = (p: string) => {
        navigate(p);
    }

    const handleLogout = () => {
        dispatch(setAuthData({ email: '', accessToken: '', role: '' }));
        navigate("/login");
    }

    return (
        <div className="position-relative">
            <div style={{
                position: 'fixed',
                height: '100vh',
                width: 240,
                top: 0,
                left: 0,
                borderRight: '1px solid #ccc',
                backgroundColor: '#263238',
            }}>
                <div style={{ borderBottom: '1px solid #ccc', width: '80%', margin: 'auto', paddingBottom: 20, paddingTop: 20 }}>
                    <img alt="lite-logo" src={liteLogo} style={{ objectFit: 'cover', width: '100%' }}/>
                </div>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {
                        sidebarItems.map((el) => {
                            return (
                                <li key={el.id} className="sca-li">
                                    <button className="sidebar-item" onClick={ () => {handleListItemClick(el.path)} }>
                                        {el.icon}
                                        <span>
                                            {el.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className="sca-header">
                <button type="button" className="btn btn-light" onClick={handleLogout}>Cerrar Sesion</button>
            </div>

            <div className="sca-body">
                {children}
            </div>
        </div>
    );
}

export default Scaffold;