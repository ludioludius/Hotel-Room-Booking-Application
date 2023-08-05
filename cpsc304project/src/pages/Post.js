import Navbar from '../components/Navbar/Navbar';
import './Post.css'
import React, { useState }  from 'react'



export default function Post(){

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (event) => {
      const button = event.target.textContent;
      setSelectedButton(button);
    };

    const [ID, setPosterID] = useState('')
    function handleSubmit(event) {
        event.preventDefault();
    }

    return <>
        <div className='navbar'><Navbar/></div>

        <div className="poster-auth">
            <h1>Select your account type.</h1>
            <div className='poster-options'>
                <button className={selectedButton === 'Private Lister' ? 'button-special' : 'button-o'}
                onClick={handleButtonClick}>
                    Private Lister
                </button>
                <button className={selectedButton === 'Hotel Affiliate' ? 'button-special' : 'button-o'}
                onClick={handleButtonClick}>
                    Hotel Affiliate
                </button>
            </div>
            <h1>Enter your ID.</h1>
            <form onSubmit={handleSubmit}>
                <div className='id-input'>
                    <input type="id" placeholder='ID' className='form-control'
                    onChange={e => setPosterID(e.target.value)}/>
                </div>
            </form>
            <button className='create-post'>CREATE A LISTING</button>
        </div>
    </>
}