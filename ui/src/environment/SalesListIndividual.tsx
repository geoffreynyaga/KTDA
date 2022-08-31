/*
 * File: /home/geoff/KTDA/ui/src/environment/SalesList.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Wednesday, May 18th 2022, 3:29:58 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Monday May 30th 2022 11:23:16 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import React, { useEffect, useState } from "react";
import { useFilters, useTable } from "react-table";

import { IMonthlySales } from "../../typings/LMETypes";

function SalesListIndividual() {
  const [lme, setLme] = useState<null | IMonthlySales[]>(null);
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  async function fetchLMEs() {
    await fetch("/api/v1/environment/lme/sales/list/individual/")
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
    <div className="flex flex-col items-center w-full pt-0 overflow-scroll">
      {/* <!-- header --> */}

      <div className="flex flex-row items-center w-11/12 py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow justify-evenly ">
        <div className="flex flex-row justify-center w-4/12 ">
          <a
            href="/environment/lme/sales/individual/create/"
            className="flex flex-row items-center justify-around px-4 py-2 text-gray-700 bg-gray-300 border-2 rounded-lg"
          >
            <i className="text-blue-500 fad fa-plus"></i>
            <p className="ml-2 tracking-tighter sm:text-xs">New Sale</p>
          </a>
        </div>
        <div className="flex flex-row justify-center w-5/12 mx-2 ">
          <button className="px-4 py-2 rounded-lg bg-gray-50 ">
            <p className="text-center text-red-500 text-md sm:text-sm">
              LME Monthly Sales List
            </p>
          </button>
        </div>
        <div className="flex flex-row justify-center w-3/12 ">
          <button className="px-4 py-2 bg-gray-300 border-2 rounded-lg ">
            <a href="/ui/lme/report/" className=" md:px-4 md:py-2">
              <p className="tracking-tighter text-blue-400 sm:text-xs">
                Sales Report
              </p>
            </a>
          </button>
        </div>
      </div>
      {/* <!-- end header --> */}

      <div className="w-full mb-6 ">
        {lme !== null && lme.length > 0 ? (
          <div className="w-full">
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
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-pink-200 hue-rotate-15 h-72">
            <h1 className="text-2xl tracking-wider text-gray-700">
              No Sales Recorded yet!
            </h1>
            <hr />
            <p className="mt-6 tracking-wider text-gray-700 text-md">
              Add at least one LME Sale to unlock this page
            </p>
            <a href="/ui/lme/sales/create/" className="mt-6">
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

export default SalesListIndividual;
