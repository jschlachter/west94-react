import React from 'react';
import API from '../../utilities/API';
import User from '../../components/User/User';

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      name: null,
      avatar: null,
      email: null
    };
  }

  async componentDidMount () {
    //
    // Load async data ...
    let users = await API.get('/', {
      params: {
        results: 1,
        inc: 'name,email,picture'
      }
    });

    const user = users.data.results[0];

    // Update state with new data and re-render our component.
    const name = `${user.name.first} ${user.name.last}`;
    const avatar = user.picture.large;
    const email = user.email;

    this.setState({
      ...this.state, ...{
        isLoading: false,
        name,
        avatar,
        email
      }
    });
  }

  render () {
    const { isLoading, name, avatar, email } = this.state;

    return (
      <User isLoading={isLoading} name={name} avatar={avatar} email={email} />
    );
  }
}

export default UserPage;
