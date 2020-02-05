//For Location bar
import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const SearchPlace = () => {

  const [addressState, setAddressState] = useState("")

  const handleSelect = async value => {}

  return(
    <div>
      <PlacesAutocomplete 
        value={addressState}
        onChange={setAddressState}
        onSelect={handleSelect}>
          {
            ({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
              <div>
                {/* Place Search Bar */}
                <input {...getInputProps({placeholder: "City, State"})}/>
                {/* Suggestions */}
                <div>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion)=>{
                    return <div>{suggestion.description}</div>
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