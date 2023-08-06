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

      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    const [ID, setPosterID] = useState('')
    

    const handleIDChange = (event) => {
        setPosterID(event.target.value);
        if (setShowDropdown) {
            setShowDropdown(false);
        }
      };

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

    const [RentUnitID, SetRentUnitID] = useState(null)
    const [Desc, setDesc] = useState(null)
    const [Cost, setCost] = useState(null)

    const handleRentUnitIDChange = (e) => {
        SetRentUnitID(e.target.value);
        SetInvalidRentID(false)
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleCostChange = (e) => {
        setCost(e.target.value);
    }

    const [InvalidRentID, SetInvalidRentID] = useState(false)
    const [MissingFields, SetMissingFields] = useState(false)

    const handlePostListing = (e) => {
        e.preventDefault()
        if (!RentUnitID || !Desc || !Cost) {
            SetMissingFields(true)
        }
        if (RentUnitID && Desc && Cost) {
            SetMissingFields(false)
        }

        if (!MissingFields) {
            axios.post(`http://localhost:3001/post-private-listing`, {
                RentUnitID: RentUnitID,
                Desc: Desc,
                Cost: Cost,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error checking ID:', error);
                if (error.response && error.response.status === 404) {
                    console.error('Error checking ID:', error);
                    SetInvalidRentID(true);
                }
            });
        }
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
                    onChange={handleIDChange}/>
                </div>
                <button type="submit" className='create-post'>AUTHENTICATE</button>
            </form>
        </div>
        <div className="dropdown-main">
            {!showDropdown && (
                <h1>Please submit a valid ID.</h1>

            )}
            {showDropdown && selectedButton === "PrivateLister" && (
                <div className="dropdown-section">
                    <form onSubmit={handlePostListing}>
                        <div>
                            <h1>Enter the details of your listing.</h1>
                            <div className="listing-details">
                                
                                <input type="tel" placeholder='Rentable unit ID' onChange={handleRentUnitIDChange} className={InvalidRentID ? 'invalid-input' : ''}/>
                                {InvalidRentID && <div className="warning-message">Rentable Unit ID does not exist.</div>}
                                <input type="tel" placeholder='Description' className='description-input' onChange={handleDescChange}/>
                                <input type="tel" placeholder='Cost / night' onChange={handleCostChange} />
                                
                            </div>
                            <button type="submit" className="post-listing">POST LISTING</button>            
                            {MissingFields && <div className="warning-message">Missing fields.</div>}
                        </div>
{/*                   
                        <div className='file-upload'> file upload</div> */}
                    </form>
                </div>
            )}
            {showDropdown && selectedButton === "HotelAffiliate" && (
                <div className="dropdown-section">
                    {/* <h1>query executed for hotel property lister</h1> */}
                    <form>
                        
                    </form>
                </div>
            )}
        </div>
           
    </>
}