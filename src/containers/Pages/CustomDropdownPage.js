import React, { Component } from 'react';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdownV2';

// const options = [
//   { id: 1, firstName: "Philip", middleName: "J.", lastName: "Fry", },
//   { id: 2, firstName: "Turanga", lastName: "Leela" },
//   { id: 3, firstName: "Bender",middleName: "Bending", lastName: "Rodríguez" },
//   { id: 4, firstName: "Amy", lastName: "Wong" },
//   { id: 5, firstName: "Hubert", middleName: "J.", lastName: "Farnsworth" },
//   { id: 6, firstName: "John", middleName: "A.", lastName: "Zoidberg" },
//   { id: 7, firstName: "Hermes",  lastName: "Conrad" }
// ]

const options = [
  { value: 1, label: "Philip J. Fry", },
  { value: 2, label: "Turanga Leela" },
  { value: 3, label: "Bender Bending Rodríguez" },
  { value: 4, label: "Amy Wong" },
  { value: 5, label: "Hubert J. Farnsworth" },
  { value: 6, label: "John A. Zoidberg" },
  { value: 7, label: "Hermes Conrad" }
]
class CustomDropdownPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  onChange = ({ target: {value} }) => {
    if ( typeof value === 'string' ) {
      if (value) {
        this.setState({
          value: parseInt(value)
        });
      }
      else {
        this.setState({value: null})
      }
    }
    else {
      this.setState({
        value: value
      });
    }

    console.log(value);
  }

  onSelect = (option) => {
    console.log(option);
    this.setState({
      value: option.value || option.label || option
    })
  }

  render () {
    return (
      <>
        <input type="text" onChange={(event) => this.onChange(event)} />
        <CustomDropdown
          onChange={option => this.onSelect(option)}
          options={options}
          placeholder={"Select Employee..."}
          value={this.state.value}
        />
      </>
    );
  }
}

export default CustomDropdownPage;
