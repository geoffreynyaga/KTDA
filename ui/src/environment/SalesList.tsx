/*
 * File: /home/geoff/KTDA/ui/src/environment/SalesList.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Wednesday, May 18th 2022, 3:29:58 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Thursday May 19th 2022 8:37:27 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import React, { useEffect, useState } from "react";
import { IMonthlySales } from "../../typings/LMETypes";

import { useTable, useFilters } from "react-table";

function LMESalesList() {
  const [lme, setLme] = useState<null | IMonthlySales[]>(null);
  const [LMENameInput, setLMENameInput] = useState("");
  const [factoryInput, setFactoryInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  async function fetchLMEs() {
    await fetch("/api/v1/environment/lme/sales/list/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
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
        Header: "LME",
        accessor: "lme", // accessor is the "key" in the data
      },
      {
        Header: "Factory",
        accessor: "factory",
      },
      {
        Header: "Month",
        accessor: "month_string",
      },
      {
        Header: "Year",
        accessor: "year_number",
      },
      {
        Header: "Jiko Kisasa",
        accessor: "jiko_kisasa",
      },
      {
        Header: "KCJ",
        accessor: "kcj",
      },
      {
        Header: "Multipurpose",
        accessor: "multipurpose",
      },
      {
        Header: "Liners",
        accessor: "liners",
      },
      {
        Header: "Rocket",
        accessor: "rocket",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters);

  // Update the state when input changes

  const handleNameFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("lme", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setLMENameInput(value);
  };

  const handleFactoryFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("factory", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFactoryInput(value);
  };

  const handleMonthChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("month_string", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setMonthInput(value);
  };
  const handleYearChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("year_number", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setYearInput(value);
  };

  return (
    <div className="flex flex-col items-center flex-1 pt-0 mx-auto bg-gray-100 ">
      {/* <!-- header --> */}

      <div className="flex flex-row items-center w-11/12 py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow justify-evenly ">
        <div className="flex flex-row justify-center w-3/12 ">
          <a
            href="/environment/lme/sales/create/"
            className="px-4 py-2 bg-gray-300 border-2 rounded-lg outline-blue-500"
          >
            Add new Sale
          </a>
        </div>
        <div className="flex flex-row justify-center w-6/12 ">
          <button className="px-4 py-2 text-red-500 rounded-lg bg-gray-50 outline-blue-500">
            <h1 className="text-center h6">LME Monthly Sales List</h1>
          </button>
        </div>
        <div className="flex flex-row justify-center w-3/12 ">
          <button className="px-4 py-2 bg-gray-300 border-2 rounded-lg outline-blue-500">
            Report
          </button>
        </div>
      </div>
      {/* <!-- end header --> */}

      <div className="w-full mx-2 mb-6">
        {lme !== null ? (
          <>
            <div className="grid grid-cols-4 gap-4 px-4 py-2 mx-2 mb-4 sm:grid-cols-2">
              <div className="flex flex-col justify-around">
                <div>
                  <p>LME</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="Search LME"
                    value={LMENameInput}
                    onChange={handleNameFilterChange}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <p>Factory</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="Search Factory"
                    value={factoryInput}
                    onChange={handleFactoryFilterChange}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <p>Year</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="e.g 2022"
                    value={yearInput}
                    onChange={handleYearChange}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <p>Month</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="e.g March"
                    value={monthInput}
                    onChange={handleMonthChange}
                  />
                </div>
              </div>
            </div>
            <hr />

            <table {...getTableProps()} className="w-full text-left table-auto">
              {/* // Input element */}

              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          // borderBottom: "solid 3px red",
                          background: "aliceblue",
                          // color: "black",
                          // fontWeight: "bold",
                        }}
                        className="py-2 text-xs text-center text-red-500 border-b-4 border-r border-b-black"
                      >
                        {column.render("Header")}
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
                            className="px-1 py-2 text-xs text-center border border-l-0 "
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center bg-pink-200 hue-rotate-15 h-72">
            <h1 className="text-2xl tracking-wider text-gray-700">
              No Sales Recorded yet!
            </h1>
            <hr />
            <p className="mt-6 tracking-wider text-gray-700 text-md">
              Add at least one LME Sale to unlock this page
            </p>
            <a href="/environment/lme/sales/create/" className="mt-6">
              <button className="px-6 py-2 bg-indigo-300 rounded-lg shadow-lg ">
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
