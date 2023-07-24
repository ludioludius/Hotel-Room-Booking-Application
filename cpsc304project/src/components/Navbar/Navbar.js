import './Navbar.css'

export default function Navbar(){
    return <nav className="nav">
        <ul>
            <a href="/" className="site-title">NOTBNB</a>
        </ul>
        <ul className="nav-options">
            <li>
                <a href="/services">SERVICES</a>
            </li>
            <li>
                <a href="/login">LOGIN / SIGN UP</a>
            </li>
        </ul>
    </nav>
}