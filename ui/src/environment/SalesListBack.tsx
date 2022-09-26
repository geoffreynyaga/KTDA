/*
 * File: /home/geoff/KTDA/ui/src/environment/SalesList.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Wednesday, May 18th 2022, 3:29:58 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Wednesday May 18th 2022 3:29:58 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import React, { useEffect, useState } from 'react';
import { useFilters, useTable } from 'react-table';

import { IMonthlySales } from '../../typings/LMETypes';

function LMESalesList() {
  const [lme, setLme] = useState<null | IMonthlySales[]>(null);
  const [LMENameInput, setLMENameInput] = useState('');
  const [factoryInput, setFactoryInput] = useState('');
  const [monthInput, setMonthInput] = useState('');
  const [yearInput, setYearInput] = useState('');

  async function fetchLMEs() {
    await fetch('/api/v1/environment/lme/sales/list/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data');
        setLme(data);
      });
  }

  useEffect(() => {
    fetchLMEs();
  }, []);

  const data = React.useMemo(() => (lme ? lme : []), [lme]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'LME',
        accessor: 'lme' // accessor is the "key" in the data
      },
      {
        Header: 'Factory',
        accessor: 'factory'
      },
      {
        Header: 'Month',
        accessor: 'month_string'
      },
      {
        Header: 'Year',
        accessor: 'year_number'
      },
      {
        Header: 'Jiko Kisasa',
        accessor: 'jiko_kisasa'
      },
      {
        Header: 'KCJ',
        accessor: 'kcj'
      },
      {
        Header: 'Multipurpose',
        accessor: 'multipurpose'
      },
      {
        Header: 'Liners',
        accessor: 'liners'
      },
      {
        Header: 'Rocket',
        accessor: 'rocket'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable({ columns, data }, useFilters);

  // Update the state when input changes

  const handleNameFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter('lme', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setLMENameInput(value);
  };

  const handleFactoryFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter('factory', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFactoryInput(value);
  };

  const handleMonthChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter('month_string', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setMonthInput(value);
  };
  const handleYearChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter('year_number', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setYearInput(value);
  };

  function getHeader(column: any): any {
    console.log(column, 'column');
    if (column.totalHeaderCount === 1) {
      return [
        {
          value: column.Header,
          type: 'string'
        }
      ];
    } else {
      const span = [...Array(column.totalHeaderCount - 1)].map((x) => ({
        value: '',
        type: 'string'
      }));
      return [
        {
          value: column.Header,
          type: 'string'
        },
        ...span
      ];
    }
  }

  function getExcel() {
    const config: any = {
      filename: 'general-ledger-Q1',
      sheet: {
        data: []
      }
    };

    const dataSet = config.sheet.data;

    // review with one level nested config
    // HEADERS
    headerGroups.forEach((headerGroup: any) => {
      const headerRow: any = [];
      if (headerGroup.headers) {
        headerGroup.headers.forEach((column) => {
          console.log('321');

          console.log(getHeader(column), 'ok now');
          headerRow.push(getHeader(column));
        });
      }

      dataSet.push(headerRow);
    });

    // FILTERED ROWS
    if (rows.length > 0) {
      rows.forEach((row: any) => {
        const dataRow: any = [];

        Object.values(row.values).forEach((value: any) =>
          dataRow.push({
            value,
            type: typeof value === 'number' ? 'number' : 'string'
          })
        );

        dataSet.push(dataRow);
      });
    } else {
      dataSet.push([
        {
          value: 'No data',
          type: 'string'
        }
      ]);
    }

    return generateExcel(config);
  }

  return (
    <div className='flex flex-col items-center w-full pt-0 overflow-scroll'>
      {/* <!-- header --> */}
      <button onClick={getExcel}>Get Excel</button>

      <div className='flex flex-row items-center w-11/12 py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow justify-evenly '>
        <div className='flex flex-row justify-center w-4/12 '>
          {/* <a
            href="/ui/lme/sales/create/"
            className="flex flex-row items-center justify-around px-4 py-2 text-gray-700 bg-gray-300 border-2 rounded-lg"
          >
            <i className="text-blue-500 fad fa-plus"></i>
            <p className="ml-2 tracking-tighter sm:text-xs">New Sale</p>
          </a> */}
          <a
            href='/ui/lme/sales/create/'
            className='inline-flex overflow-hidden text-white bg-gray-900 rounded group'
          >
            <span className='px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </span>
            <span className='pl-4 pr-5 py-2.5'>New Sale</span>
          </a>
        </div>
        <div className='flex flex-row justify-center w-5/12 mx-2 '>
          <button className='px-4 py-2 rounded-lg bg-gray-50 '>
            <p className='text-center text-red-500 text-md sm:text-sm'>
              LME Monthly Sales List
            </p>
          </button>
        </div>
        <div className='flex flex-row justify-center w-3/12 '>
          {/* <button className="px-4 py-2 bg-gray-300 border-2 rounded-lg ">
            <a href="/ui/lme/report/" className=" md:px-4 md:py-2">
              <p className="tracking-tighter text-blue-400 sm:text-xs">
                Sales Report
              </p>
            </a>
          </button> */}
          <a
            href='/ui/lme/report/'
            className='relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group'
          >
            <span className='absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4'>
              <span className='absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white'></span>
            </span>
            <span className='absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0'></span>
            <span className='relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white'>
              Sales Report
            </span>
          </a>
        </div>
      </div>
      {/* <!-- end header --> */}

      <div className='w-full mb-6 '>
        {lme !== null && lme.length > 0 ? (
          <div className='w-full'>
            <div className='flex flex-row flex-wrap w-full py-2 mb-4 md:flex-1 justify-evenly'>
              <div className='flex flex-col justify-around sm:w-1/2 md:w-1/4 md:px-6'>
                <div>
                  <p>LME</p>
                </div>
                <div className='mt-2'>
                  <input
                    type='text'
                    className='w-full p-2 text-sm border-2 rounded-lg'
                    placeholder='Search LME'
                    value={LMENameInput}
                    onChange={handleNameFilterChange}
                  />
                </div>
              </div>
              <div className='flex flex-col justify-around sm:w-1/2 md:w-1/4 md:px-6'>
                <div>
                  <p>Factory</p>
                </div>
                <div className='mt-2'>
                  <input
                    type='text'
                    className='w-full p-2 text-sm border-2 rounded-lg'
                    placeholder='Search Factory'
                    value={factoryInput}
                    onChange={handleFactoryFilterChange}
                  />
                </div>
              </div>
              <div className='flex flex-col justify-around sm:w-1/2 md:w-1/4 md:px-6'>
                <div>
                  <p>Year</p>
                </div>
                <div className='mt-2'>
                  <input
                    type='text'
                    className='w-full p-2 text-sm border-2 rounded-lg'
                    placeholder='e.g 2022'
                    value={yearInput}
                    onChange={handleYearChange}
                  />
                </div>
              </div>
              <div className='flex flex-col justify-around sm:w-1/2 md:w-1/4 md:px-6'>
                <div>
                  <p>Month</p>
                </div>
                <div className='mt-2'>
                  <input
                    type='text'
                    className='w-full p-2 text-sm border-2 rounded-lg'
                    placeholder='e.g March'
                    value={monthInput}
                    onChange={handleMonthChange}
                  />
                </div>
              </div>
            </div>
            <hr />

            <table {...getTableProps()} className='w-full text-left table-auto'>
              {/* // Input element */}

              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          // borderBottom: "solid 3px red",
                          background: 'aliceblue'
                          // color: "black",
                          // fontWeight: "bold",
                        }}
                        className='py-2 text-xs text-center text-red-500 border-b-4 border-r border-b-black'
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className='px-1 py-2 text-xs text-center border border-l-0 '
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center bg-pink-200 hue-rotate-15 h-72'>
            <h1 className='text-2xl tracking-wider text-gray-700'>
              No Sales Recorded yet!
            </h1>
            <hr />
            <p className='mt-6 tracking-wider text-gray-700 text-md'>
              Add at least one LME Sale to unlock this page
            </p>
            <a href='/ui/lme/sales/create/' className='mt-6'>
              <button className='px-6 py-2 bg-indigo-300 rounded-lg shadow-lg '>
                Add new Sale
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default LMESalesList;
