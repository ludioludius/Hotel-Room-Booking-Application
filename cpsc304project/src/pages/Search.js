import { useState, useEffect } from 'react'
import axios from 'axios';
import { set } from 'react-hook-form';

//server port hard coded to 3001



const Search = () => {
    const [toggleView, settoggleView] = useState(true)
    const label = toggleView? 'View Hotels': 'View Private Listings'

    const onClickHandler = () => {
        console.log("Handler called")
        if (toggleView) {
            settoggleView(false)
        } else {
            settoggleView(true)
        }
    }

    if (toggleView) {
        return (
            <>
            <button onClick={onClickHandler}>{label}</button>
            <form>
      
            </form>
            <PrivateListings render={toggleView}/>
            </>
        )
    } else {
        return (
            <>
            <button onClick={onClickHandler}>{label}</button>
            <HotelListings/>
            </>
        )

    }
}

export default Search


const HotelListings = (props) => {

    const [HotelListings, setHotelListings] = useState([])
    const [MaxCost, setMaxCost] = useState(100000)
    const [MinPeople, setMinPeople] = useState(0)

    const hook = () => {
        console.log("effect hook run", MaxCost, MinPeople)
        axios
        .get(`http://localhost:3001/api/HotelListing/${MaxCost}/${MinPeople}`)
        .then(response => {
            setHotelListings(response.data)

        })        
      }


    const handleCostChange = (event) => {
        if (event.target.value) {
            setMaxCost(event.target.value)
        } else {
            setMaxCost(10000)
        }
    }


    const handlePeopleChange = (event) => {
        if (event.target.value) {
            setMinPeople(event.target.value)
        } else {
            setMinPeople(0)
        }
    }

      
    useEffect(hook,[MaxCost, MinPeople])
    console.log(HotelListings)

    return(
        <>
        <label htmlFor="MaxCost">Enter MaxCost: </label>
        <input type="number" name="MaxCost" onChange={handleCostChange}/>
        <label htmlFor="MinPeople">Enter number of peoplet: </label>
        <input type="number" name="MinPeople" onChange={handlePeopleChange}/>   
        <ul> {HotelListings.map(listing => 
            <li key={listing.HotelListing_ID}> Cost: {listing.Cost} Description: {listing.Description} Hotel Name: {listing.Name} Numpeople: {listing.NumPeople} NumBeds: {listing.NumBeds} 
                <button>Book Listing</button>
            </li>
        )} 
        </ul>
        </>
    )
}


const PrivateListings = ({render}) => {
    const [listings, setListings] = useState([])



    const hook = () => {
        console.log("effect hook running when state size = ", listings.length)
        axios
        .get('http://localhost:3001/api/PrivateListing')
        .then(response => {
            setListings(response.data)

        })        
      }

    
    
      useEffect(hook,[])
 

      console.log(listings)



    return(
        <>
        <ul> {listings.map(listing => 
            <li key={listing.PrivateListing_ID}> Cost: {listing.Cost} Description: {listing.Description} Hotel Name: {listing.Name} Numpeople: {listing.NumPeople} NumBeds: {listing.NumBeds} 
                <button>Book Listing</button>
            </li>
        )} 
        </ul>
        </>
    )
}
