import React from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Grid.module.scss';
import { Container, Form, Row, Col, FormLabel } from 'react-bootstrap';
import matchSorter from 'match-sorter';

const PERSON_KEYS = [
  'firstName',
  'lastName',
  'streetAddress',
  'city',
  'state',
  'phone',
  'userName',
  'dob',
  'email'
]

class PeopleGrid extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      filterValue: '',
      pageSize: props.pageSize,
      selectedPeople: props.data.slice(0, props.pageSize)
    }
  }

  onPageSizeChange = (newPageSize) => {
    const pageSize = parseInt(newPageSize, 10);
    this.setState({
      ...this.state,
      pageSize,
      selectedPeople: this.props.data.slice(0, pageSize)
    })
  }

  filter = (filterValue) => {
    const { pageSize } = this.state;

    const people = matchSorter(this.props.data, filterValue, {
      keys: PERSON_KEYS
    });

    this.setState({
      ...this.state,
      filterValue,
      selectedPeople: people.slice(0, pageSize)
    })
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
        <td>{person.userName}</td>
        <td>{person.dob}</td>
        <td>{person.email}</td>
      </tr>
    )
  }

  render () {
    const { selectedPeople, pageSize } = this.state;
    return (
      <>
      <div className={"container-fluid d-flex justify-content-start flex-row position-sticky align-items-baseline mb-2"}>
        <div className={"d-flex align-items-baseline"}>
          <Form.Label className={"flex-shrink-0"}>Page Size:</Form.Label>
          <Form.Control as={"select"} value={pageSize} onChange={ ({target: {value}}) => this.onPageSizeChange(value)}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Form.Control>
        </div>
        <div className={"d-flex align-items-baseline ml-md-auto"}>
          <Form.Label className={"flex-shrink-0 mr-2"}>Search:</Form.Label>
          <Form.Control onChange={
              ({target: {value}}) => this.filter(value)
            }
            value={this.state.filterValue} />
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
