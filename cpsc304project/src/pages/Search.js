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

    return(
        <>
        <button onClick={onClickHandler}>{label}</button>
        <HotelListings render={toggleView}/>
        <PrivateListings render={toggleView}/>
        </>
    )
}

export default Search


const HotelListings = ({render}) => {

    const [listings, setListings] = useState([])

    const hook = () => {
        axios
        .get('http://localhost:3001/api/HotelListing')
        .then(response => {
            setListings(listings.concat(response.data))

        })        
      }

    
    
      useEffect(hook,[])
 

      console.log(listings)

      if (render) {
        return null
    }

    return(
        <ul> {listings.map(listing => 
            <li> Cost: {listing.Cost} Description: {listing.Description} Hotel Name: {listing.Name} Numpeople: {listing.NumPeople} NumBeds: {listing.NumBeds} 
                <button>Book Listing</button>
            </li>
        )} 
        </ul>
    )
}


const PrivateListings = ({render}) => {
    const [listings, setListings] = useState([])


    const hook = () => {
        axios
        .get('http://localhost:3001/api/PrivateListing')
        .then(response => {
            setListings(listings.concat(response.data))

        })        
      }

    
    
      useEffect(hook,[])
 

      console.log(listings)

      if (!render) {
        return null
    }


    return(
        <ul> {listings.map(listing => 
            <li> Cost: {listing.Cost} Description: {listing.Description} Hotel Name: {listing.Name} Numpeople: {listing.NumPeople} NumBeds: {listing.NumBeds} 
                <button>Book Listing</button>
            </li>
        )} 
        </ul>
    )
}
