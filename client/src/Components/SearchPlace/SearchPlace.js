//For Location bar
import React, {useState , useContext} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import UserContext from '../../utils/UserContext'

const SearchPlace = () => {
  const { cityState,  setCityState } = useContext(UserContext)

  const [addressState, setAddressState] = useState("")

  const handleSelect = async value => {
    let cityStateValue = value.split(", ")[value.split(", ").length-3] + ", " + value.split(", ")[value.split(", ").length-2]
    setAddressState(cityStateValue)
    setCityState(cityStateValue)
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
                <input {...getInputProps({placeholder: "City, State"})} className="white-text" />
                {/* Suggestions */}
                <div>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion)=> {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    }
                    console.log(suggestion)
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                        {
                          suggestion.description.split(", ")[suggestion.description.split(", ").length-3]
                          +
                          ", "
                          +
                          suggestion.description.split(", ")[suggestion.description.split(", ").length-2]
                        }
                    </div>
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