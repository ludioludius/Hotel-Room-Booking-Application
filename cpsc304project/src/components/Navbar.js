
export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="site-title">NOTBNB</a>
        <ul>
            <li className="active">
                <a href="/services">SERVICES</a>
            </li>
            <li>
                <a href="/login">LOGIN / SIGN UP</a>
            </li>
        </ul>
    </nav>
}