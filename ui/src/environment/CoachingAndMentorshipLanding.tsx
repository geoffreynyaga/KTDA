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
import { useFilters, useTable } from "react-table";

import { IMonthlySales } from "../../typings/LMETypes";

function CapacityBuildingLanding() {
  const [lme, setLme] = useState<null | IMonthlySales[]>(null);
  const [lmeInput, setLMEInput] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [remarksInput, setRemarksInput] = useState("");

  async function fetchLMEs() {
    await fetch("/api/v1/environment/cnm/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (data.length > 0) {
          setLme(data);
        }
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
        Header: "Topic Covered",
        accessor: "topic_covered",
      },

      {
        Header: "Remarks by Mentor",
        accessor: "remarks_by_mentor",
      },
      {
        Header: " Date",
        accessor: "date",
      },
      {
        Header: "Action Points",
        accessor: "action_points",
      },
      {
        Header: "Next Meeting Date",
        accessor: "next_meeting_date",
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

  const handleLMEChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("lme", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setLMEInput(value);
  };

  const handleTopicChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("topic_covered", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setTopicInput(value);
  };

  const handleRemarksChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilter("remarks_by_mentor", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setRemarksInput(value);
  };

  return (
    <div className="flex flex-col items-center flex-1 pt-0 mx-auto bg-gray-100 ">
      {/* <!-- header --> */}

      <div className="flex flex-row items-center w-11/12 py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow justify-evenly ">
        <div className="flex flex-row justify-center w-3/12 ">
          {/* <a
            href="/environment/cnm/create/"
            className="px-4 py-2 bg-gray-300 border-2 rounded-lg "
          >
            Add new Activity
          </a> */}
          <a
            href="/environment/cnm/create/"
            className="inline-flex overflow-hidden text-white bg-gray-900 rounded group"
          >
            <span className="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            <span className="pl-4 pr-5 py-2.5">New Activity</span>
          </a>
        </div>
        <div className="flex flex-row justify-center w-6/12 ">
          <button className="px-4 py-2 text-red-500 rounded-lg bg-gray-50 ">
            <h1 className="text-center h6">Coaching and Mentorship List</h1>
          </button>
        </div>
        <div className="flex flex-row justify-center w-3/12 ">
          <button className="px-4 py-2 bg-gray-300 border-2 rounded-lg ">
            Report
          </button>
        </div>
      </div>
      {/* <!-- end header --> */}

      <div className="w-full mx-2 mb-6">
        {lme !== null ? (
          <>
            <div className="grid grid-cols-3 gap-4 px-4 py-2 mx-2 mb-4 sm:grid-cols-2">
              <div className="flex flex-col justify-around">
                <div>
                  <p>LME</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="Search LME"
                    value={lmeInput}
                    onChange={handleLMEChange}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <p>Topic Covered</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="Search Topic"
                    value={topicInput}
                    onChange={handleTopicChange}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-around">
                <div>
                  <p>Remarks by Mentor</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-2 text-sm border-2 rounded-lg"
                    placeholder="Search Remark"
                    value={remarksInput}
                    onChange={handleRemarksChange}
                  />
                </div>
              </div>
            </div>
            <hr />

            <table
              {...getTableProps()}
              className="w-full text-left table-fixed hover:table-auto"
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center bg-pink-200 hue-rotate-15 h-72">
            <h1 className="text-2xl tracking-wider text-gray-700">
              No Coaching and Mentorship Activity Recorded yet!
            </h1>
            <hr />
            <p className="mt-6 tracking-wider text-gray-700 text-md">
              Add at least one activity to unlock this page
            </p>
            <a href="/environment/cnm/create/" className="mt-6">
              <button className="px-6 py-2 bg-indigo-300 rounded-lg shadow-lg ">
                Add new Activity
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CapacityBuildingLanding;
