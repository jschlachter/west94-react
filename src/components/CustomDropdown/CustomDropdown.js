import React, { Component, useEffect, useState } from 'react';
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

    // useEffect(() => {
    //   onFilter({filterValue})
    // }, [onFilter, filterValue])

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

const DEFAULT_PLACEHOLDER_STRING = 'Select...'


const parseValue = (value, options) => {
  let option

    for (var i = 0, num = options.length; i < num; i++) {
      if (options[i].type === 'group') {
        const match = options[i].items.filter(item => item.value === value)
        if (match.length) {
          option = match[0]
        }
      } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
        option = options[i]
      }
    }

  return option || value
}

class CustomDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      }
    }
  }

  //
  // Invoked immediately after updating occurs. This method
  // is not called for the initial render.
  componentDidUpdate(prevProps, prevState) {
    const { value, options, placeholder } = this.props;

    if ( prevProps.value !== value ) {
      if( value ) {
        var selected = parseValue(value, options);
        this.setState({selected});
      }
      else {
        this.setState({
          selected: {
          label: typeof placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : placeholder,
          value: ''
        }});
      }
    }
  }

  onClick = (label, value) => {
    const newState = {
      selected: {
        value,
        label
      }
    };

    this.setState(newState);;
    this.fireChangeEvent(newState);

  }

  fireChangeEvent = (newState) => {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption = option => {
    let value = option.value;

    if (typeof value === 'undefined') {
      value = option.label || option;
    }
    let label = option.label || option.value || option;
    let isSelected = value === this.state.selected.value || value === this.state.selected;

    return (
      <Dropdown.Item
        active={isSelected}
        onClick={() => this.onClick(label, value)}
        key={`opt_${value}`}
        eventKey={value}>
        {label}
      </Dropdown.Item>
    )
  }

  buildMenu ({options}) {
    return (
      <Dropdown.Menu as={CustomMenu}>
        {options.map(this.renderOption)}
      </Dropdown.Menu>
    )
  }

  render () {
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    const value = (<span>
      {placeHolderValue}
    </span>)

    const menu = this.buildMenu(this.props);
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {value}
        </Dropdown.Toggle>
        {menu}
      </Dropdown>
    )
  }
}

export default CustomDropdown;
