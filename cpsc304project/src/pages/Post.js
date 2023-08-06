import Navbar from '../components/Navbar/Navbar';
import './Post.css'
import React, { useState }  from 'react'
import axios from 'axios';


export default function Post(){

    const [selectedButton, setSelectedButton] = useState("PrivateLister");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleButtonClick = (event) => {
      const button = event.target.textContent.split(" ").join("");
      setSelectedButton(button);
      console.log(button)
    };

    const [ID, setPosterID] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3001/check-poster-id`, {
            selectedButton: selectedButton,
            ID: ID,
          })
          .then((response) => {
            console.log(response);
            const isIDFound = response.data.found;
            setShowDropdown(isIDFound);
          })
          .catch((error) => {
            console.error('Error checking ID:', error);
          });
    }

    return <>
        <div className='navbar'><Navbar/></div>

        <div className="poster-auth">
            <h1>Select your account type.</h1>
            <div className='poster-options'>
                <button className={selectedButton === 'PrivateLister' ? 'button-special' : 'button-o'}
                onClick={handleButtonClick}>
                    Private Lister
                </button>
                <button className={selectedButton === 'HotelAffiliate' ? 'button-special' : 'button-o'}
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
                <button type="submit" className='create-post'>CREATE A LISTING</button>
            </form>
            {showDropdown && (
            <div className="dropdown-section">
                <h1>query executed</h1>
            </div>
            )}
           </div>
    </>
}