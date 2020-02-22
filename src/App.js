import React, { useState } from 'react';
import EditableLabel from './components/EditableLabel/EditableLabel';
import { Route, Switch } from 'react-router-dom';
import SiteLayout from './containers/Layouts/SiteLayout';
import CustomDropdownPage from './containers/Pages/CustomDropdownPage';
import GridPage from './containers/Pages/GridPage';
import UserPage from './containers/Pages/UserPage';

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2>Home</h2>
  },
  {
    path: "/CustomDropdown",
    main: () => (
      <>
        <h2>Custom Dropdown</h2>
        <CustomDropdownPage />
      </>
    )
  },
  {
    path: "/Grid",
    main: () => (
      <>
        <h2>Grid</h2>
        <GridPage />
      </>
    )
  },
  {
    path: "/User",
    main: () => (
      <>
        <h2>User</h2>
        <UserPage />
      </>
    )
  }
]

function App() {
  const [label, changeLabel] = useState('');

  return (
    <SiteLayout>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />} />
          ))}
        </Switch>
        {/* <ul>
          <li>
            <EditableLabel value={"Buy Milk"} onSave={(value) => changeLabel(value)} />
          </li>
          <li>
            <EditableLabel value={"Walk the Dog"} onSave={(value) => changeLabel(value)} />
          </li>
          <li>
            <EditableLabel value={"Feed the Cat"} onSave={(value) => changeLabel(value)} />
          </li>
        </ul> */}
    </SiteLayout>
  );
}

export default App;
