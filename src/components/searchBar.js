import React from "react";
import Autosuggest from 'react-autosuggest'
import './searchBar.css'
import Axios from "axios";

export default function SearchBar(props) {

    const [station, setStation] = React.useState('')
    const [suggestion, setSuggestions] = React.useState([])

    return (
        <div className='headerSearch'>
                <Autosuggest inputProps={{
                    placeholder: "Search for specific station",
                    autoComplete: "abcd",
                    name: "stations",
                    id: "searchStations",
                    value: station,
                    onChange: (_event, {newValue}) => {
                        setStation(newValue)
                    }
                }}
                             suggestions={suggestion}
                             onSuggestionsFetchRequested={async ({value}) => {
                                 if (!value) {
                                     setSuggestions([])
                                 }
                                 try {
                                    const response = await Axios.get(
                                        'http://localhost:3001/stations_data'
                                    )
                                    const result = response.data.filter((row) => {
                                        return row.station_name.includes(value)
                                    })
                                     setSuggestions(
                                         result.map((row) => ({
                                             name: row.station_name,
                                             address: row.station_address,
                                             lat: row.lat,
                                             lng: row.lng
                                         }))
                                     )

                                 } catch (e) {
                                     setSuggestions([])
                                 }
                             }}
                             onSuggestionsClearRequested={() => {
                                 setSuggestions([])
                             }}
                             onSuggestionSelected={(event, {suggestion, method}) => {
                                    props.setCenter({
                                        lat: suggestion.lat,
                                        lng: suggestion.lng
                                    })
                                    props.setZoom(17)

                             }}
                             getSuggestionValue={(suggestion) => suggestion.name}
                             renderSuggestion={suggestion => <div>{suggestion.name}</div>}
                />
        </div>
    )
}