import React, { useState } from 'react';
import CustomDropdown from './components/CustomDropdown/CustomDropdown';
import EditableLabel from './components/EditableLabel/EditableLabel';
import Grid from './components/Grid/Grid';


const options = [
  { id: 1, firstName: "Philip", middleName: "J.", lastName: "Fry", },
  { id: 2, firstName: "Turanga", lastName: "Leela" },
  { id: 3, firstName: "Bender",middleName: "Bending", lastName: "Rodríguez" },
  { id: 4, firstName: "Amy", lastName: "Wong" },
  { id: 5, firstName: "Hubert", middleName: "J.", lastName: "Farnsworth" },
  { id: 6, firstName: "John", middleName: "A.", lastName: "Zoidberg" },
  { id: 7, firstName: "Hermes",  lastName: "Conrad" }
]

function App() {
  const [label, changeLabel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSelect = option => {
    //
    // TODO: implement select handler ..
  };

  return (
    <div>
        <CustomDropdown
          options={options}
          optionsCaption={"Custom toggle"}
          optionsValue={"id"}
          optionsText={"firstName"}
          onSelect={handleSelect}
          value={options[1]}
        />

        <CustomDropdown
          options={options}
          optionsCaption={"Custom toggle"}
          optionsValue={"id"}
          optionsText={"lastName"}
          onSelect={handleSelect}
          value={options[2]}
        />

        <h4>
          New label {label}
        </h4>
        <ul>
          <li>
            <EditableLabel value={"Buy Milk"} onSave={(value) => changeLabel(value)} />
          </li>
          <li>
            <EditableLabel value={"Walk the Dog"} onSave={(value) => changeLabel(value)} />
          </li>
          <li>
            <EditableLabel value={"Feed the Cat"} onSave={(value) => changeLabel(value)} />
          </li>
        </ul>


        <Grid />
    </div>
  );
}

export default App;
