/*
 * File: /home/geoff/KTDA/ui/src/environment/report/CustomSalesReportPDF.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Sunday, May 22nd 2022, 9:35:10 am
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Sunday May 22nd 2022 9:35:10 am
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import React, { useEffect, useRef, useState } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useFilters, useTable } from "react-table";

import { IMonthlySales } from "../../../typings/LMETypes";
import { useParams } from "react-router-dom";

function CustomSalesReportPDF() {
  const [lme, setLme] = useState<null | IMonthlySales[]>(null);
  const [LMENameInput, setLMENameInput] = useState("");
  const [factoryInput, setFactoryInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  const [createdBy, setCreatedBy] = useState<string | null>(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  let { id } = useParams();

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });

  async function fetchLMEs(id: string) {
    const url = "/api/v1/environment/lme/sales/report/x/".replace("x", id);
    console.log(url, "url");

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data from server");
        setLme(data.data);
        setCreatedBy(data.created_by);
      });
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchLMEs(id);
    }
  }, [id]);

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

  return (
    <div className="flex flex-col items-center flex-1 pt-0 bg-gray-100 ">
      {lme !== null ? (
        <>
          {/*  Header*/}
          <div className="flex flex-row items-center w-full py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow md:w-11/12 justify-evenly">
            <div className="flex flex-row justify-center w-6/12 ">
              <a
                href="/ui/lme/sales/"
                className="flex flex-row items-center justify-around px-4 py-2 text-gray-700 bg-gray-300 border-2 rounded-lg"
              >
                <i className="text-blue-500 fad fa-arrow-left"></i>
                <p className="ml-2 tracking-tighter sm:text-xs">
                  Back to Sales
                </p>
              </a>
            </div>

            <div className="flex flex-row justify-center w-6/12 ">
              <button
                className="px-4 py-2 bg-blue-200 rounded-lg shadow-lg sm:text-xs "
                onClick={handlePrint}
              >
                Print this Report
              </button>
            </div>
          </div>

          {/* <!-- component --> */}
          <div
            className="flex w-full px-1 py-2 mx-0 bg-gray-200 md:w-11/12"
            ref={componentRef}
          >
            <div className="flex flex-col items-start w-full px-2 py-2 mx-0 bg-gray-100 rounded-lg justify-evenly raised">
              {/* Branding */}
              <div className="flex flex-row justify-between w-full px-1 py-2 mb-2 rounded-lg shadow-lg md:px-4 bg-green-50 raised">
                <div className="flex flex-col w-1/2 space-y-2 text-slate-700">
                  <img
                    className="object-contain w-12 h-12 md:h-12"
                    src="/static/cleo/img/logo.png"
                  />
                  <p className="text-xs font-extrabold tracking-tighter uppercase md:tracking-tight md:text-xl ">
                    KTDA Foundation M&E
                  </p>
                </div>
                <div className="flex flex-col items-end justify-center w-1/2 px-4 rounded-lg md:flex-row md:item-center raised">
                  <p className="text-xs text-blue-400 md:tracking-wide md:text-base">
                    Generated by:{" "}
                    <span className="ml-2 text-red-500">
                      {createdBy ? createdBy : ""}
                    </span>
                  </p>
                </div>
              </div>
              {/* Search Details */}
              <div className="flex flex-col items-center w-full my-4">
                <p className="my-2 text-sm font-normal text-center text-gray-900 md:text-md">
                  Search Details:
                </p>
                <div className="grid justify-between w-full grid-cols-3 mx-0 mt-2 md:grid-cols-3 md:gap-12">
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      LME:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Factory:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Month:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Year:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                  </div>
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      KCJ:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Multipurpose:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Jiko Sasa:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Liners:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Rocket:
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        xxxx
                      </span>
                    </p>
                  </div>

                  <div className="text-sm font-light text-slate-500">
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      Start Date:<span className="ml-2">xxxx</span>
                    </p>
                    <p className="text-xs font-semibold text-gray-700 md:text-sm">
                      End Date:<span className="ml-2">xxxx</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* table */}
              <table
                {...getTableProps()}
                className="w-full mt-6 mb-4 overflow-x-scroll text-left table-auto"
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
              {/* disclaimer */}
              <div className="mt-8 p-9">
                <div className="border-t pt-9 border-slate-200">
                  <div className="text-sm font-light text-slate-700">
                    <p>
                      This report is generated as is and its only reflective of
                      the search parameters entered in the app. It is not a
                      guarantee that the data is up to date because of delays in
                      LMEs uploading data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  );
}

export default CustomSalesReportPDF;
