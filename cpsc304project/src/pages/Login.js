import Navbar from '../components/Navbar/Navbar';
import './Login.css'


export default function Login(){
    return <>
            <div className='navbar'><Navbar/></div>
            
            <div className="login-container">
                <h1 className='heading'>LOG IN</h1>
            </div>
        </>
}