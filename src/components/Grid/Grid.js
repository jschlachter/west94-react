import React from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Grid.module.scss';
import { Container, Form, Row, Col, FormLabel } from 'react-bootstrap';
import CustomDropdown from '../CustomDropdown/CustomDropdown';

const project = (item, accessor) => {
  if ( typeof accessor === 'string') {
    return item[accessor];
  }
  else if (typeof accessor === 'function'){
    return accessor(item);
  }

  return item;
}

const DropdownPicker = ({data, onChange, optionsLabel, optionsValue, placeholder, value}) => {
  const dataSource = data.map((item, index) => ({
    index,
    original: {...item},
    label: project(item, optionsLabel),
    value: project(item, optionsValue)
  }));

  return (
    <>
      <CustomDropdown
        options={dataSource}
        onChange={onChange}
        placeholder={placeholder}
        value={value} />
    </>
  );
}

class PeopleGrid extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      pageSize: props.pageSize,
      selectedPeople: this.props.data.slice(0, 25)
    }
  }

  handleChange = (newState, prevState) => {
    console.log(newState);
    const { selectedPeople } = this.state;

    const people = selectedPeople.filter(person => prevState.original.id !== person.id);
    this.setState({
      ...this.state,
      isLoading:false,
      selectedPeople: [...people, newState.original]
    });
  }

  buildRow (people,person,index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.streetAddress}</td>
        <td>{person.city}</td>
        <td>{person.state}</td>
        <td>{person.phone}</td>
        <td>
          <DropdownPicker
            data={people}
            onChange={this.handleChange}
            optionsLabel={"userName"}
            optionsValue={"id"}
            placeholder={"Select Person..."}
            value={person.id} />
        </td>
        <td>{person.dob}</td>
        <td>{person.email}</td>
      </tr>
    )
  }

  render () {
    const { pageSize } = this.props;
    const { selectedPeople } = this.state;
    return (
      <>
      <div className={"container-fluid d-flex justify-content-start flex-row position-sticky align-items-baseline mb-2"}>
        <div className={"d-flex align-items-baseline"}>
          <Form.Label className={"flex-shrink-0"}>Page Size:</Form.Label>
          <Form.Control as={"select"}>
            <option value={10}>10</option>
            <option value={20}>25</option>
            <option value={50}>50</option>
          </Form.Control>
        </div>
        <div className={"d-flex align-items-baseline ml-md-auto"}>
          <Form.Label className={"flex-shrink-0 mr-2"}>Search:</Form.Label>
          <Form.Control></Form.Control>
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col>
            <Table className={"mono"} striped hover size={"sm"}>
              <thead>
                <tr>
                  <th colSpan="10">People</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Street Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Phone</th>
                  <th>UserName</th>
                  <th>DOB</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {selectedPeople.map((person, index) => this.buildRow(selectedPeople, person,  index))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      </>
    )
  }
}

export default PeopleGrid;
