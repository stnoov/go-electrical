import React from 'react';
import Axios from 'axios'
import './App.css';
import Map from './components/main_map'
import Authentication from './components/authentication'
import Sidebar from "./components/sidebar";

function App() {

    const[loggedIn, setLoggedIn] = React.useState(false)

    const [regFirstName, setRegFirstName] = React.useState("")
    const [regLastName, setRegLastName] = React.useState("")
    const [regEmail, setRegEmail] = React.useState("")
    const [regPassword, setRegPassword] = React.useState("")


    const [selectedStation, setSelectedStation] = React.useState(null)

    const [usedStation, setUsedStation] = React.useState(null)


    const register = () => {
        Axios.post("http://localhost:3001/register", {
            first_name: regFirstName,
            last_name: regLastName,
            email: regEmail,
            password: regPassword,
            created_at: Date.now()
        }).then((response) => {
            console.log(response)
        })
    }

  return (
    <div>
        {loggedIn
        ? <Sidebar
                selectedStation={selectedStation}
                usedStation={usedStation}
                setUsedStation={setUsedStation}
                logout={() => setLoggedIn(false)}
            />
        : <Authentication
                login={() => setLoggedIn(true)}
                setRegFirstName={setRegFirstName}
                setRegLastName={setRegLastName}
                setRegEmail={setRegEmail}
                setRegPassword={setRegPassword}
                register={register}
            />}

        <Map
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
        />
    </div>
  );
}

export default App;
