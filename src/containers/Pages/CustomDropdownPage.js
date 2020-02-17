import React, { Component } from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';

import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';

// const options = [
//   { id: 1, firstName: "Philip", middleName: "J.", lastName: "Fry", },
//   { id: 2, firstName: "Turanga", lastName: "Leela" },
//   { id: 3, firstName: "Bender",middleName: "Bending", lastName: "Rodríguez" },
//   { id: 4, firstName: "Amy", lastName: "Wong" },
//   { id: 5, firstName: "Hubert", middleName: "J.", lastName: "Farnsworth" },
//   { id: 6, firstName: "John", middleName: "A.", lastName: "Zoidberg" },
//   { id: 7, firstName: "Hermes",  lastName: "Conrad" }
// ]

const employees = [
  { value: 1, label: "Philip J. Fry", },
  { value: 2, label: "Turanga Leela" },
  { value: 3, label: "Bender Bending Rodríguez" },
  { value: 4, label: "Amy Wong" },
  { value: 5, label: "Hubert J. Farnsworth" },
  { value: 6, label: "John A. Zoidberg" },
  { value: 7, label: "Hermes Conrad" }
]

const positions = [
  { label: 'Delivery Boy', value: 1 },
  { label: 'Pilot', value: 2 },
  { label: 'Accountant', value: 3 },
  { label: 'Physician', value: 4 }
]

const List = ({onChange, label, placeholder, options, value}) => (
  <Form.Group as={Row}>
    <Form.Label column sm={2}>{label}</Form.Label>
    <Col sm={10}>
      <CustomDropdown
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        value={value}
      />
    </Col>
  </Form.Group>
);

class CustomDropdownPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {},
      position: {}
    }
  }

  setEmployee = value => {
    const id = parseInt(value);
    const option = employees.find(option => {
      return (typeof option.value !== 'undefined' && option.value === id)
    });

    if ( option ) {
      this.setState({
        employee: option
      });
    }
    else {
      this.setState({
        employee: {}
      })
    }
  }

  onChange = (key, option) => {
    this.setState({
      [key]: option
    })
  }

  render () {
    const {
      employee: {label: employee, value: employeeId},
      position: {label: position, value: positionId}
    } = this.state;

    return (
      <>
        <label>Selected Employee: {`${employee}${employeeId && " ID:" + employeeId}`}</label>
        <input type="text"
          onChange={({target:{value}}) => this.setEmployee(value)} />

        <label>Selected Position: {position}</label>

        <Form>
          <List
            onChange={option => this.onChange('employee', option)}
            options={employees}
            placeholder={"Select Employee..."}
            label={"Employee"}
            value={employeeId} />

          <List
            onChange={option => this.onChange('position', option)}
            options={positions}
            placeholder={"Select Position..."}
            label={"Position"}
            value={positionId} />
        </Form>
      </>
    );
  }
}

export default CustomDropdownPage;
