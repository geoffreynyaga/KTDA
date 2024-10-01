/*
 * File: /home/geoff/KTDA/ui/src/environment/SalesList.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Wednesday, May 18th 2022, 3:29:58 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * Last Modified: Wednesday May 18th 2022 3:29:58 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Geoffrey Nyaga Kinyua.
 * -----
 * Copyright (c) 2022 Geoffrey Nyaga Kinyua.
 */

import React, {useEffect, useState} from "react";
import {useFilters, useTable} from "react-table";

import {IMonthlySales} from "../../../typings/LMETypes";
import LMESalesListTableComponent from "./LMESalesListTableComponent";
// import JsPDF from "jspdf";
import Papa from "papaparse";
import {useExportData} from "react-table-plugins";

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
                // console.log(data, 'data');
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
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        exportData,
    } = useTable({columns, data, getExportFileBlob}, useFilters, useExportData);

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

    function getExportFileBlob({columns, data, fileType, fileName}) {
        if (fileType === "csv") {
            // CSV example
            const headerNames = columns.map((col) => col.exportValue);
            const csvString = Papa.unparse({fields: headerNames, data});
            return new Blob([csvString], {type: "text/csv"});
        }
        //PDF example
        //if (fileType === "pdf") {
        //  const headerNames = columns.map((column) => column.exportValue);
        //  const doc = new JsPDF();
        //  doc.autoTable({
        //    head: [headerNames],
        //    body: data,
        //    margin: { top: 20 },
        //    styles: {
        //      minCellHeight: 9,
        //      halign: "left",
        //      valign: "center",
        //      fontSize: 11,
        //    },
        //  });
        //  doc.save(`${fileName}.pdf`);
        //
        //  return false;
        //}

        // Other formats goes here
        return false;
    }

    return (
        <div className="flex flex-col items-center w-full pt-0 overflow-scroll">
            {/* <!-- header --> */}

            <div className="flex flex-row items-center w-11/12 py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow justify-evenly ">
                <div className="flex flex-row justify-center w-4/12 ">
                    {/* <a
            href="/ui/lme/sales/create/"
            className="flex flex-row items-center justify-around px-4 py-2 text-gray-700 bg-gray-300 border-2 rounded-lg"
          >
            <i className="text-blue-500 fad fa-plus"></i>
            <p className="ml-2 tracking-tighter sm:text-xs">New Sale</p>
          </a> */}
                    <a
                        href="/ui/lme/sales/create/"
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
                        <span className="pl-4 pr-5 py-2.5">New Sale</span>
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
                    {/* <button className="px-4 py-2 bg-gray-300 border-2 rounded-lg ">
            <a href="/ui/lme/report/" className=" md:px-4 md:py-2">
              <p className="tracking-tighter text-blue-400 sm:text-xs">
                Sales Report
              </p>
            </a>
          </button> */}
                    <a
                        href="/ui/lme/report/"
                        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                    >
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                            Sales Report
                        </span>
                    </a>
                </div>
            </div>
            {/* <!-- end header --> */}

            {lme !== null && lme.length > 0 ? (
                <>
                    <LMESalesListTableComponent data={lme} />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
                    <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
                        No Sales registered yet!
                    </div>
                </div>
            )}
        </div>
    );
}

export default LMESalesList;
