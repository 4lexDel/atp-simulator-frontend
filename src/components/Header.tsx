import logo from '../assets/logo.png';
import './header.css';

export default function Header() {
    return (
        <header>
            <img src={logo} alt="Logo" />
        </header>
    );
}