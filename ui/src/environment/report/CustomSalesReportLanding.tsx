/*
 * File: /home/geoff/KTDA/ui/src/environment/report/CustomSalesReportLanding.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Saturday, May 21st 2022, 3:59:42 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * Last Modified: Saturday May 21st 2022 3:59:42 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Geoffrey Nyaga Kinyua.
 * -----
 * Copyright (c) 2022 Geoffrey Nyaga Kinyua.
 */

import "react-datepicker/dist/react-datepicker.css";

import React, {useEffect, useState} from "react";
import {useFilters, useTable} from "react-table";

import {useQuery} from "@tanstack/react-query";
import {addDays} from "date-fns";
import cookie from "react-cookies";
import DatePicker from "react-datepicker";
import {HashLoader} from "react-spinners";
import {IMonthlySales} from "../../../typings/LMETypes";

const getMonthlySales = async () => {
    const res = await fetch("/api/v1/environment/lme/sales/list/");
    return res.json();
};

function CustomSalesReportLanding() {
    const [lme, setLme] = useState<null | IMonthlySales[]>(null);

    const [LMENameInput, setLMENameInput] = useState<string>("");
    const [factoryInput, setFactoryInput] = useState<string>("");
    const [monthInput, setMonthInput] = useState<string>("");
    const [yearInput, setYearInput] = useState<string>("");

    const [jikoSasaInput, setJikoSasaInput] = useState<any>(false);
    const [linersInput, setLinersInput] = useState<any>(false);
    const [multiPurposeInput, setMultiPurposeInput] = useState<any>(false);
    const [kcjInput, setKcjInput] = useState<any>(false);
    const [rocketInput, setRocketInput] = useState<any>(false);

    const [startDate, setStartDate] = useState<any>(undefined);
    const [endDate, setEndDate] = useState(new Date());

    const [reportReady, setReportReady] = useState<boolean>(false);
    const [reportData, setReportData] = useState<any>([]);
    const [reportPK, setReportPK] = useState<null | string>(null);

    const {
        isLoading,
        error,
        data: queryData,
    } = useQuery({queryKey: ["monthlySales"], queryFn: getMonthlySales});

    useEffect(() => {
        if (queryData) {
            let x: IMonthlySales[] = queryData;
            setLme(x);
        } else {
            console.log(queryData, "no data");
        }
    }, [queryData]);

    async function sendFilterData() {
        await fetch("/api/v1/environment/lme/sales/report/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.load("csrftoken"),
            },
            body: JSON.stringify({
                lme: LMENameInput,
                factory: factoryInput,
                month: monthInput,
                year: yearInput,
                jikoSasa: jikoSasaInput,
                liners: linersInput,
                multiPurpose: multiPurposeInput,
                kcj: kcjInput,
                rocket: rocketInput,
                startDate: startDate !== undefined ? startDate : "",
                endDate: endDate !== undefined ? endDate : "",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data, "data");
                setReportReady(true);
                setReportData(data.data);
                setReportPK(data.report_pk);
                setLme(null);
            });
    }

    function sendReport() {
        sendFilterData();
    }

    const data = React.useMemo(() => (queryData ? queryData : []), [lme]);

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
    } = useTable({columns, data}, useFilters);

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

    if (isLoading) {
        return (
            <div className="flex-1 w-1/5 w-full h-screen px-2 my-2 overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
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
            <div className="w-1/5 h-screen px-2 my-2 overflow-hidden bg-pink-200 lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
                <h1 className="text-2xl tracking-wider text-gray-700">
                    Error Occurred getting Sales from server
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

    return reportReady == true && lme === null ? (
        <div className="flex flex-col items-center justify-center w-11/12 h-screen px-2 py-8 my-2 space-y-4 bg-pink-200 lg:my-1 lg:px-1 xl:my-1 xl:px-1 hue-rotate-15">
            {reportData.length >= 1 && reportPK !== null ? (
                <>
                    <h1 className="text-2xl tracking-wider text-gray-700">
                        Your Report is Ready!
                    </h1>
                    <hr />
                    <p className="mt-6 font-serif text-xs italic font-light tracking-tight text-gray-700">
                        You can refresh the page to reset the filters
                    </p>
                    <hr />
                    <a
                        href={"/ui/lme/report/xy/".replace("xy", reportPK)}
                        className="mt-12"
                    >
                        <button className="px-6 py-2 bg-indigo-300 rounded-lg shadow-lg ">
                            Go To Report
                        </button>
                    </a>
                </>
            ) : (
                <>
                    <h1 className="text-2xl tracking-wider text-gray-700">
                        No Results Found!
                    </h1>
                    <hr />
                    <p className="mt-6 font-serif text-xs italic font-light tracking-tight text-gray-700">
                        Go back and refine your filters
                    </p>
                    <hr />
                    <p className="mt-6 font-serif text-xs italic font-light tracking-tight text-gray-700">
                        Ensure there is some data in the table before you click
                        "Generate"
                    </p>
                </>
            )}

            <hr />
            <a href="/ui/lme/sales/" className="mt-12">
                <button className="flex flex-row items-center justify-around px-6 py-0 bg-pink-400 rounded-lg shadow-lg ">
                    <p className="text-gray-800">Go Back to Sales</p>
                    <i className="mx-4 fad fa-arrow-left"></i>
                </button>
            </a>
        </div>
    ) : (
        <div className="flex flex-col items-center flex-1 w-full pt-0 bg-gray-100 ">
            {/* <!-- header --> */}

            <div className="flex flex-row items-center w-full py-2 mt-2 mb-4 bg-gray-200 rounded-lg shadow md:w-11/12 justify-evenly ">
                <div className="flex flex-row justify-center w-4/12 ">
                    {/* <a
            href="/ui/lme/sales/"
            className="flex flex-row items-center justify-around px-4 py-2 text-gray-700 bg-gray-300 border-2 rounded-lg"
          >
            <i className="text-blue-500 fad fa-arrow-left"></i>
            <p className="ml-4 tracking-tighter sm:text-xs">Sales</p>
          </a> */}
                    <a
                        href="/ui/lme/sales/"
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </span>
                        <span className="pl-4 pr-5 py-2.5">Sales List</span>
                    </a>
                </div>
                <div className="flex flex-row justify-center w-4/12">
                    <button className="px-4 py-2 rounded-lg bg-gray-50">
                        <p className="text-center text-red-500 text-md sm:text-xs">
                            Customized Reports
                        </p>
                    </button>
                </div>
                <div className="w-4/12"></div>
            </div>
            {/* <!-- end header --> */}

            <div className="w-full mx-2 mb-6">
                {lme !== null ? (
                    <>
                        <div className="flex flex-col justify-center my-2">
                            <p className="font-serif text-sm font-semibold text-center text-indigo-400">
                                Apply Filters Below to refine your report
                            </p>
                        </div>

                        <div className="grid grid-cols-3 px-4 py-2 mb-4 sm:grid-cols-2">
                            <div className="flex flex-col justify-around px-4 py-2 md:px-6">
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
                            <div className="flex flex-col justify-around px-4 py-2 md:px-6">
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

                            <div className="flex flex-col justify-around px-4 py-2 md:px-6">
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
                            <div className="flex flex-col justify-around px-4 py-2 md:px-6">
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

                            {/* Start Date */}

                            <div className="flex flex-col justify-around px-4 py-2 md:px-6">
                                <div>
                                    <p className="text-xs">Start Date</p>
                                </div>
                                <div className="mt-2">
                                    <DatePicker
                                        selected={startDate}
                                        locale="en-GB"
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date: Date) => setStartDate(date)}
                                        className="w-full p-1 text-sm border-2 rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* End Date */}

                            <div className="flex flex-col justify-around px-4 py-2 md:px-6">
                                <div>
                                    <p className="text-xs">End Date</p>
                                </div>
                                <div className="mt-2">
                                    <DatePicker
                                        selected={endDate}
                                        locale="en-GB"
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date: Date) => setEndDate(date)}
                                        maxDate={addDays(new Date(), 1)}
                                        className="w-full p-1 text-sm border-2 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr />

                        {/*  */}
                        <div className="flex flex-row justify-around w-full mb-2 -mx-2 overflow-hidden lg:-mx-1 xl:-mx-1">
                            {/* Jiko Sasa */}
                            <div className="flex flex-col items-center justify-around w-1/5 px-2 my-2 overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
                                <div>
                                    <p className="text-xs">Jiko Sasa</p>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        className="p-2 text-sm border-blue-500 rounded-sm "
                                        checked={jikoSasaInput}
                                        value={jikoSasaInput}
                                        onChange={() => {
                                            setJikoSasaInput(!jikoSasaInput);
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Liners */}
                            <div className="flex flex-col items-center justify-around w-1/5 px-2 my-2 overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
                                <div>
                                    <p className="text-xs">Liners</p>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        className="p-2 text-sm border-blue-500 rounded-sm "
                                        checked={linersInput}
                                        value={linersInput}
                                        onChange={() => {
                                            setLinersInput(!linersInput);
                                        }}
                                    />
                                </div>
                            </div>
                            {/* KCJ */}
                            <div className="flex flex-col items-center justify-around w-1/5 px-2 my-2 overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
                                <div>
                                    <p className="text-xs">KCJ</p>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        className="p-2 text-sm border-blue-500 rounded-sm "
                                        checked={kcjInput}
                                        value={kcjInput}
                                        onChange={() => {
                                            setKcjInput(!kcjInput);
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Multipurpose */}
                            <div className="flex flex-col items-center justify-around w-1/5 px-2 my-2 overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
                                <div>
                                    <p className="text-xs">MultiPurpose</p>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        className="p-2 text-sm border-blue-500 rounded-sm "
                                        checked={multiPurposeInput}
                                        value={multiPurposeInput}
                                        onChange={() => {
                                            setMultiPurposeInput(!multiPurposeInput);
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Rocket */}
                            <div className="flex flex-col items-center justify-around w-1/5 px-2 my-2 overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
                                <div>
                                    <p className="text-xs">Rocket</p>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        className="p-2 text-sm border-blue-500 rounded-sm "
                                        checked={rocketInput}
                                        value={rocketInput}
                                        onChange={() => {
                                            setRocketInput(!rocketInput);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* end */}
                        </div>
                        <hr />
                        {monthInput ||
                        yearInput ||
                        factoryInput ||
                        LMENameInput ||
                        startDate ||
                        jikoSasaInput ||
                        linersInput ||
                        multiPurposeInput ||
                        rocketInput ||
                        kcjInput ? (
                            <>
                                <p className="text-sm text-center text-gray-600">
                                    Filtered by:
                                </p>
                                <hr />
                                <div className="flex flex-row items-center py-4 justify-evenly">
                                    {LMENameInput && (
                                        <div className="flex ">
                                            <p className="font-serif text-sm font-semibold text-center text-indigo-400">
                                                LME: {LMENameInput}
                                            </p>
                                        </div>
                                    )}
                                    {factoryInput && (
                                        <div className="flex ">
                                            <p className="font-serif text-sm font-semibold text-center text-indigo-400">
                                                Factory: {factoryInput}
                                            </p>
                                        </div>
                                    )}
                                    {monthInput && (
                                        <div className="flex ">
                                            <p className="font-serif text-sm font-semibold text-center text-indigo-400">
                                                Month: {monthInput}
                                            </p>
                                        </div>
                                    )}
                                    {yearInput && (
                                        <div className="flex ">
                                            <p className="font-serif text-sm font-semibold text-center text-indigo-400">
                                                Year: {yearInput}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex ">
                                        <a
                                            href=""
                                            className="flex flex-row justify-center"
                                        >
                                            <button
                                                className="px-4 py-2 bg-blue-500 rounded-lg "
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sendReport();
                                                }}
                                            >
                                                <p className="tracking-tighter text-gray-100 sm:text-xs">
                                                    Generate Report
                                                </p>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col justify-center my-4">
                                {/* tailwind italic text */}

                                <p className="font-serif text-sm italic font-semibold text-center text-red-400">
                                    No filters applied
                                </p>
                            </div>
                        )}

                        <table
                            {...getTableProps()}
                            className="w-full text-left table-auto"
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
                    <div className="w-1/5 px-2 my-2 overflow-hidden bg-pink-200 lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6 hue-rotate-15 h-72">
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

export default CustomSalesReportLanding;
