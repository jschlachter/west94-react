import React, { useEffect, useContext } from 'react';
import { PeopleContext } from '../../containers/People/PeopleContext';

const PeopleList = (props) => {
  const provider = useContext(PeopleContext);

  useEffect(() => {
    if ( !provider.people ) provider.refresh();
  }, [provider])

  const renderPeople = (provider) => {
    if (!provider.people) return (
      <li>Loading...</li>
    )

    return provider.people.map((person, index) => (
      <li key={index}>
        {person.lastName}, {person.firstName}
      </li>
    ))
  }

  return (
    <ul className={"list-unstyled"}>
      <PeopleContext.Consumer>
      {provider => renderPeople(provider)}
      </PeopleContext.Consumer>
    </ul>
  )
}

export default PeopleList;
