// /*
//  * File: /home/geoff/KTDA/ui/src/LMEList.tsx
//  * Project: /home/geoff/KTDA/ui
//  * Created Date: Sunday, May 15th 2022, 2:16:28 pm
//  * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
//  * -----
//  * Last Modified: Sunday May 15th 2022 2:16:28 pm
//  * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
//  * -----
//  * This file should not be copied and/or distributed without the express
//  * permission of Swift Lab Limited.
//  * -----
//  * Copyright (c) 2022 Swift Lab Limited.
//  */

import React, { useEffect, useState } from "react";
import { ILME } from "../../typings/LMETypes";

import { useTable, useFilters } from "react-table";

function LMEList() {
  const [lme, setLme] = useState<null | ILME[]>(null);
  const [LMENameInput, setLMENameInput] = useState("");
  const [factoryInput, setFactoryInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [contactPersonInput, setContactPersonInput] = useState("");

  async function fetchLMEs() {
    await fetch("/api/v1/environment/lme/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Factory",
        accessor: "factory",
      },
      {
        Header: "Contact Person",
        accessor: "contact_person",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "Total Sales",
        accessor: "all_sales.stove_price__sum",
        Cell: (props) => {
          // JSON.stringify(props.value) !== null ? (
          //   <span className="text-green-500">KES </span>
          // ) : (
          //   <span className="text-red-500">0</span>
          // );
          return props.value ? (
            <span className="text-green-500">KES {props.value} </span>
          ) : (
            <span className="text-red-500">0</span>
          );
        },
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: (props) => (
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md ">
            View
          </button>
        ),
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
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setLMENameInput(value);
  };

  const handleFactoryFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("factory", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFactoryInput(value);
  };

  const handlePhoneNumberChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("phone_number", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setPhoneNumberInput(value);
  };
  const handleContactPersonChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("contact_person", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setContactPersonInput(value);
  };

  return (
    <div className="w-full overflow-clip ">
      {/* <!-- header --> */}

      <div className="flex flex-row items-center w-full py-2 mb-4 ml-2 mr-2 rounded-lg shadow justify-evenly ">
        <div className="flex flex-row justify-center w-3/12 ">
          <a
            href="/environment/lme/create/"
            className="px-4 py-2 bg-gray-300 border-2 rounded-lg outline-blue-500"
          >
            Add new LME
          </a>
        </div>
        <div className="flex flex-row justify-center w-6/12 ">
          <button className="px-4 py-2 text-red-500 rounded-lg bg-gray-50 outline-blue-500">
            <h1 className="text-center h6">LME List</h1>
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
                  <p>Contact Person</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="Search Person"
                    value={contactPersonInput}
                    onChange={handleContactPersonChange}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <p>Phone Number</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="07XXXXXXXX"
                    value={phoneNumberInput}
                    onChange={handlePhoneNumberChange}
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
                        // style={{
                        //   borderBottom: "solid 3px red",
                        //   background: "aliceblue",
                        //   color: "black",
                        //   fontWeight: "bold",
                        // }}
                        className="px-4 py-2 border-r"
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
                            className="px-4 py-2 border border-l-0"
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
          <div className="flex flex-col items-center justify-center h-40 bg-pink-200">
            <h1 className="text-2xl tracking-wider text-gray-700">
              No LME found!
            </h1>
            <hr />
            <p className="tracking-wider text-gray-700 text-md">
              Refine your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LMEList;
