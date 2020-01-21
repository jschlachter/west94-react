import React, { useState } from 'react';
import styles from './EditableLabel.module.scss';

const EditableLabel = (props) => {
  const [value, changeValue] = useState(props.value);
  const [previous, changePrevious] = useState(props.value);
  const [editing, setEditing] = useState(props.editing || false);
  const textInput = React.createRef();

  const handleKeyUp = (event) => {
    if (event.key === 'Escape') {
      changeValue(previous);

      setEditing(false);
    }

    else if (event.key === 'Enter') {
      changeValue(event.target.value);
      changePrevious(event.target.value);

      setEditing(false);

      //
      // TODO: Save ...
      props.onSave(event.target.value);
    }
  }

  const renderInput = () => (
    <input type="text"
      className={styles.Input}
      value={value}
      ref={textInput}
      onChange={({target: {value}}) => changeValue(value)}
      onBlur={({target: {value}}) => {
        setEditing(false);
        changePrevious(value);

        //
        // TODO: Save ...
        props.onSave(value);
      }}
      onKeyUp={handleKeyUp}
    />
  );

  const renderLabel = () => (
    <span className={styles.Label} onClick={() => setEditing(true)}>
      {value}
    </span>
  );

  return (
    <div className={styles.EditableLabel}>
      {editing ? renderInput():renderLabel()}
    </div>
  );
};

export default EditableLabel;
