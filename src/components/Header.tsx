import { RxExit } from "react-icons/rx";
import logo from '../assets/logo.png';
import './header.css';
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    return (
        <header>
            <img src={logo} alt="Logo" />
            {user && 
                <RxExit className="exit-icon" onClick={logout} />
            }
        </header>
    );
}