import React, { useMemo, useState } from 'react';
import { useTable , useFilters, useGlobalFilter, useExpanded } from 'react-table';
import matchSorter from 'match-sorter';
import makeData from './makeData';
import styles from './Grid.module.scss';
import { classNames } from '../../utilities/css';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const Table = ({columns, data}) => {

  const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
  }

  fuzzyTextFilterFn.autoRemove = val => !val;

  const filterTypes = useMemo(() => ({
    fuzzyText: fuzzyTextFilterFn
    // text : (rows, id, filter values) => { }
  }), []);

  const defaultColumn = useMemo(() => ({
    Filter: DefaultColumnFilter
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    flatColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useExpanded
  );

  const renderCell = (cell) => (
    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
  )

  const renderHeader = (cell) => (
    <th {...cell.getCellProps()} scope="row">{cell.render('Cell')}</th>
  )
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table className={classNames(styles.table, "mono")} {...getTableProps()}  style={{width: "100%"}}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th scope="col" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => cell.column.header ? renderHeader(cell):renderCell(cell))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}

const Grid = (props) => {
  const columns = useMemo(() => [
    { id: "expander", Header: "", },
    { id: "row", Header: "#", Cell: ({row}) => (<div> {row.index+1} </div>), maxWidth: 50, header: true},
    { id: 1, Header: 'First Name', accessor: 'firstName' },
    { id: 2, Header: 'Last Name', accessor: 'lastName' },
    { id: 3, Header: 'Street Address', accessor: 'streetAddress' },
    { id: 4, Header: 'City',  accessor: 'city', },
    { id: 5, Header: 'State', accessor: 'state' },
    { id: 6, Header: 'Phone', accessor: 'phone' },
    { id: 7, Header: 'User Name', accessor: 'userName' },
    { id: 8, Header: 'Email', accessor: 'email' },
    { id: 9, Header: 'Dob', accessor: 'dob' }
  ], []);

  const data = useMemo(() => makeData(25), []);

  return (
    <Table columns={columns} data={data} />
  );
}

export default Grid;
