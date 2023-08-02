import Navbar from '../components/Navbar/Navbar';
import './Login.css'


export default function Login(){
    return <>
            <div className='navbar'><Navbar/></div>

            <div className="login-container">
                <form action="">
                    <div className='input-fields'>
                        <div className='input-login'>
                            <input type="username" placeholder='Username' className='form-control'>
                            </input>
                        </div>
                        <div className="input-login">
                            <input type="password" placeholder='Password' className='form-control'>
                            </input>
                        </div>
                    </div>
                    <button className='button-login'>LOG IN</button>
                </form>
            </div>
            
            <div className='register-texts'>
                <h1>Don't have an account?</h1>
                <a href="signup">Register Now.</a>
            </div>
        </>
}