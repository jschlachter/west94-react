import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

class Sidebar extends Component {
  render () {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <NavLink to="/" exact={true}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/CustomDropdown">Custom Dropdown</NavLink>
          </li>
          <li>
            <NavLink to="/User">User</NavLink>
          </li>
          <li>
            <NavLink to="/Grid">Grid</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Sidebar;
