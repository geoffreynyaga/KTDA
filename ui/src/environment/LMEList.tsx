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
import { useFilters, useTable } from "react-table";

import { HashLoader } from "react-spinners";
import { ILME } from "../../typings/LMETypes";
import { useQuery } from "react-query";

function LMEList() {
  const [lme, setLme] = useState<null | ILME[]>(null);
  const [LMENameInput, setLMENameInput] = useState("");
  const [factoryInput, setFactoryInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [contactPersonInput, setContactPersonInput] = useState("");

  const {
    isLoading,
    error,
    data: queryData,
  } = useQuery("repoData", () =>
    fetch("/api/v1/environment/lme/").then((res) => res.json())
  );

  useEffect(() => {
    if (queryData) {
      // console.log(queryData, "uuuuuuy");
      setLme(queryData);
    } else {
      console.log(queryData, "no data");
    }
  }, [queryData]);

  const data = React.useMemo(() => (queryData ? queryData : []), [lme]);
  // const data2 = React.useMemo(() => (data !== undefined ? data : []), [data]);

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 w-full h-screen">
        <HashLoader
          color={"#f3558e"}
          loading={isLoading}
          // css={override}
          size={150}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
        <h1 className="text-2xl tracking-wider text-gray-700">
          Error Occurred getting LMEs from server
        </h1>
        <hr />
        <p className="mt-6 tracking-wider text-gray-700 text-md">
          Please Contact the Admin for more details or Refresh the page
        </p>

        <a href="/" className="mt-6">
          <button className="px-6 py-2 bg-indigo-300 rounded-lg shadow-lg ">
            Contact
          </button>
        </a>
      </div>
    );
  }

  if (lme !== null && lme.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
        <h1 className="text-2xl tracking-wider text-gray-700">
          No LME registered yet!
        </h1>
        <hr />
        <p className="mt-6 tracking-wider text-gray-700 text-md">
          Please Add one LME to unlock this page.
        </p>

        <a href="/environment/lme/create/" className="mt-6">
          <button className="px-6 py-2 bg-indigo-300 rounded-lg shadow-lg ">
            Add new LME
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full pt-0 overflow-scroll bg-gray-100 sm:mx-0 md:mx-auto">
      {/* <!-- header --> */}

      <div className="flex flex-row items-center w-full py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow md:w-11/12 md:justify-evenly sm:justify-between">
        <div className="flex flex-row justify-center w-4/12 ">
          <a
            href="/environment/lme/create/"
            className="flex items-center justify-around w-full px-4 py-2 text-blue-500 bg-gray-300 border-2 rounded-lg sm:flex-col md:flex-row "
          >
            <p className="text-indigo-400 sm:text-center sm:pr-0 md:pr-4 sm:text-xs">
              New LME
            </p>
            <i className="fad fa-plus"></i>
          </a>
        </div>
        <div className="flex flex-row justify-center w-5/12 ">
          <button className="px-4 py-2 text-red-500 rounded-lg bg-gray-50 ">
            <h1 className="text-center h6">LME List</h1>
          </button>
        </div>
        <div className="flex flex-row justify-center w-3/12 ">
          <button className="px-4 py-2 bg-gray-300 border-2 rounded-lg ">
            Report
          </button>
        </div>
      </div>
      {/* <!-- end header --> */}

      <div className="flex flex-col items-center w-full mx-2 mb-6">
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
        {lme !== null ? (
          <table
            {...getTableProps()}
            className="w-full overflow-scroll text-left sm:table-fixed md:table-auto md:w-11/12"
          >
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
        ) : (
          "No data"
        )}
      </div>
    </div>
  );
}

export default LMEList;
