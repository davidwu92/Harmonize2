//For Location bar
import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const SearchPlace = () => {

  const [addressState, setAddressState] = useState("")

  const handleSelect = async value => {
   setAddressState(value)
  }
  

  return(
    <div>
      <PlacesAutocomplete 
        value={addressState}
        onChange={setAddressState}
        onSelect={handleSelect}
        >
          {
            ({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
              <div>
                {/* Place Search Bar */}
                <input {...getInputProps({placeholder: "City, State"})}/>
                {/* Suggestions */}
                <div>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion)=> {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    }
                  return (
                     <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                  )
                  })}
                </div>
              </div>
            )
          }
      </PlacesAutocomplete>
    </div>
  )
}

export default SearchPlace