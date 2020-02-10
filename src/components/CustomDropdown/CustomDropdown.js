import React, { useState, useEffect, useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import matchSorter from  'match-sorter';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#home"
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}&nbsp;
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, onFilter, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
      onFilter({filterValue})
    }, [onFilter, filterValue])

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => setFilterValue(e.target.value)}
          value={filterValue}
        />
        <ul className="list-unstyled">
          {
            children
          /* {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )} */
          }
        </ul>
      </div>
    ); 
  },
);

const lens = (obj, path) => path.split(".").reduce((o, key) => o && o[key] ? o[key] : null, obj)

const CustomDropdown = ({
  afterRender,
  onSelect = option => {},
  options  = [],
  optionsCaption,
  optionsText,
  optionsValue,
  value
}) => {
  const [filtered, setFiltered] = useState([]);
  const [selectedItem, setSelectedItem] = useState(value);

  const handleFilter = useCallback(({filterValue}) => {
    setFiltered(matchSorter(options, filterValue, { keys:[optionsText] }));
  }, []);

  const handleSelect = (eventKey, event) => {
    let option = options.find(option => lens(option, optionsValue) == eventKey);
    setSelectedItem(option);

    if ( onSelect ) {
      onSelect( option );
    }
  }

  const isActive = option => {
    return selectedItem === option;
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        { optionsCaption }
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} onFilter={handleFilter}>
        {
          filtered.map(option => (
            <Dropdown.Item
              active={isActive(option)}
              key={lens(option, "id")}
              eventKey={lens(option, optionsValue)}
            >
              {lens(option, optionsText)}
            </Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  )
};

export default CustomDropdown;
