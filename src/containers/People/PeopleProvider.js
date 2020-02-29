import React from 'react';
import { PeopleContext } from './PeopleContext';
import faker from 'faker';

const newPerson = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
  dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();  // First month is "1"

  return {
    firstName: firstName,
    lastName: lastName,
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    phone: faker.phone.phoneNumberFormat(3),
    userName: faker.internet.userName(firstName, lastName),
    dob: dob,
    email: faker.internet.email(firstName, lastName),
  }
}

const makeData = length => {
  return Array.from({ length }, (_, index) => ({ id: index, ...newPerson() }));
}

class PeopleProvider extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = () => {
      if (this.state.isLoading) return;

      this.setState({isLoading: true});

      setTimeout(() => {
        this.setState(state => ({
          isLoading: false,
          people: makeData(25)
        }));
      }, 1000);
    };

    this.state = {
      isLoading: false,
      people: null
    };
  }

  render () {
    return (
      <PeopleContext.Provider value={{...this.state, refresh: this.refresh}}>
        {this.props.children}
      </PeopleContext.Provider>
    );
  }
}

export default PeopleProvider;
