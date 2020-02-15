import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './SiteLayout.module.scss';

class SiteLayout extends Component {

  render () {

    return (
      <main style={{display: "flex"}}>

          <BrowserRouter>
            <Sidebar />
            <div className={styles.body}>
              {this.props.children}
            </div>
          </BrowserRouter>
      </main>
    )
  }
}

export default SiteLayout;
