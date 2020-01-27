import React, { useState } from 'react';
import EditableLabel from './components/EditableLabel/EditableLabel';
import Grid from './components/Grid/Grid';

function App() {
  const [label, changeLabel] = useState('');

  return (
    <div>
        <h4>
          New label {label}
        </h4>
        <ul>
          <li>
            <EditableLabel value={"Buy Milk"} onSave={(value) => changeLabel(value)} />
          </li>
          <li>
            <EditableLabel value={"Walk the Dog"} onSave={(value) => changeLabel(value)} />
          </li>
          <li>
            <EditableLabel value={"Feed the Cat"} onSave={(value) => changeLabel(value)} />
          </li>
        </ul>

        <Grid />
    </div>
  );
}

export default App;
