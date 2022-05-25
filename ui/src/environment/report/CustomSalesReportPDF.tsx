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
    <div className="flex flex-col items-center flex-1 pt-0 mx-auto bg-gray-100 ">
      {lme !== null ? (
        <>
          {/*  */}
          <div className="flex flex-row items-center w-11/12 py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow justify-evenly">
            <div className="flex flex-row justify-center w-4/12 ">
              <a
                href="/environment/lme/sales/"
                className="flex flex-row items-center justify-around px-4 py-2 text-gray-700 bg-gray-300 border-2 rounded-lg"
              >
                <i className="text-blue-500 fad fa-arrow-left"></i>
                <p className="ml-2 tracking-tighter sm:text-xs">
                  Back to Sales
                </p>
              </a>
            </div>
            <div className="flex flex-row justify-center w-5/12 ">
              <button className="px-4 py-2 rounded-lg bg-gray-50 ">
                <p className="text-center text-red-500 text-md sm:text-base">
                  Report
                </p>
              </button>
            </div>
            <div className="flex flex-row justify-center w-3/12 ">
              <button
                className="px-4 py-2 bg-indigo-200 rounded-lg shadow-lg sm:text-xs "
                onClick={handlePrint}
              >
                Print this Report
              </button>
            </div>
          </div>

          {/* <!-- component --> */}
          <div
            className="flex w-11/12 px-1 py-2 mx-0 bg-gray-200"
            ref={componentRef}
          >
            <div className="flex flex-col items-start w-full px-2 py-2 mx-0 bg-gray-100 rounded-lg justify-evenly raised">
              {/* Branding */}
              <div className="flex flex-row justify-between w-full px-4 py-2 mb-2 rounded-lg shadow-lg bg-green-50 raised">
                <div className="space-y-2 text-slate-700">
                  <img
                    className="object-cover h-12"
                    src="/static/cleo/img/logo.png"
                  />
                  <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                    KTDA Foundation M&E
                  </p>
                </div>
                <div className="flex flex-col justify-center px-4 rounded-lg raised">
                  <p className="tracking-wide text-blue-400 sm:text-xs">
                    Generated by:{" "}
                    <span className="ml-2 text-red-500">
                      {createdBy ? createdBy : ""}
                    </span>
                  </p>
                </div>
              </div>
              {/* Address */}
              <div className="flex w-full my-4">
                <div className="flex w-full border-4">
                  <div className="grid w-full grid-cols-3 gap-12 sm:grid-cols-2">
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-gray-900">
                        Search Details:
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        LME:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Factory:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Month:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Year:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-semibold text-gray-700">
                        KCJ:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Multipurpose:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Jiko Sasa:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Liners:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Rocket:
                        <span className="ml-2 text-xs font-normal text-gray-500">
                          xxxx
                        </span>
                      </p>
                    </div>

                    <div className="text-sm font-light text-slate-500">
                      <p>
                        Start Date:<span className="ml-2">xxxx</span>
                      </p>
                      <p>
                        End Date:<span className="ml-2">xxxx</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* table */}
              <table
                {...getTableProps()}
                className="w-full my-4 text-left table-auto"
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
                    <p>Disclaimer statement goes here.......</p>
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
