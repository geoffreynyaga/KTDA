// /*
//  * File: /home/geoff/KTDA/ui/src/LMEList.tsx
//  * Project: /home/geoff/KTDA/ui
//  * Created Date: Sunday, May 15th 2022, 2:16:28 pm
//  * Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
//  * -----
//  * Last Modified: Sunday May 15th 2022 2:16:28 pm
//  * Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
//  * -----
//  * This file should not be copied and/or distributed without the express
//  * permission of Geoffrey Nyaga Kinyua.
//  * -----
//  * Copyright (c) 2022 Geoffrey Nyaga Kinyua.
//  */

import React, {useEffect, useState} from "react";
import {useFilters, useTable} from "react-table";

import {useQuery} from "@tanstack/react-query";
import {Helmet} from "react-helmet-async";
import {HashLoader} from "react-spinners";
import {ILME} from "../../typings/LMETypes";
import LMEListTableComponent from "./LME/LMEListTableComponent";

const getLMEs = async () => {
    const res = await fetch("/api/v1/environment/lme/");
    return res.json();
};

function LMEList() {
    const [lmeList, setLmeList] = useState<null | ILME[]>(null);
    const [LMENameInput, setLMENameInput] = useState("");
    const [factoryInput, setFactoryInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");
    const [contactPersonInput, setContactPersonInput] = useState("");

    const {
        isLoading,
        error,
        data: queryData,
    } = useQuery({queryKey: ["getLMEs"], queryFn: getLMEs});

    useEffect(() => {
        if (queryData) {
            // console.log(queryData, "uuuuuuy");
            setLmeList(queryData);
        } else {
            console.log(queryData, "no data");
        }
    }, [queryData]);

    const data = React.useMemo(() => (queryData ? queryData : []), [lmeList]);
    // const data2 = React.useMemo(() => (data !== undefined ? data : []), [data]);

    const columns = React.useMemo(
        () => [
            {
                Header: "LME Name",
                accessor: "name",
            },

            //hidden cell

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
                Header: "View LME",
                accessor: "slug", // accessor is the "key" in the data
                Cell: (props) => {
                    return props.value ? (
                        <a
                            className="text-sm text-blue-500"
                            href={`/environment/lme/${props.value}/`}
                        >
                            <p className="text-blue-400">View</p>
                        </a>
                    ) : (
                        <span className="text-red-500">No Link</span>
                    );
                },
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
    } = useTable(
        {
            columns,
            data,
            initialState: {
                // hiddenColumns: ["slug"],
            },
        },
        useFilters,
    );

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

    if (lmeList !== null && lmeList.length < 1) {
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
        <>
            <Helmet>
                <title>LME List</title>
                <link rel="canonical" href="/ui/lme/list/" />
                <meta name="description" content="LME List" />
                <meta name="keywords" content="LME List" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="revisit-after" content="1 days" />
                <meta name="language" content="en" />
                <meta name="distribution" content="global" />
                <meta name="rating" content="general" />
                <meta name="doc-class" content="completed" />
            </Helmet>

            <div className="flex flex-col px-4 py-10 overflow-y-scroll ">
                {/* <!-- header --> */}
                <div className="flex flex-row items-center justify-between py-2 mt-2 mb-4 bg-gray-200 border-2 border-gray-700 rounded-lg shadow md:justify-evenly">
                    <div className="flex flex-row justify-center w-5/12 px-4 md:w-4/12 ">
                        <a
                            href="/environment/lme/create/"
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
                            <span className="pl-4 pr-5 py-2.5">New LME</span>
                        </a>
                    </div>
                    <div className="flex flex-row justify-center w-4/12 px-1 md:w-5/12 ">
                        <button className="w-full px-2 py-2 text-red-500 rounded-lg ">
                            <h1 className="text-2xl text-center h6">LME List</h1>
                        </button>
                    </div>
                    <div className="flex flex-row justify-center w-3/12 px-1 "></div>
                </div>
                {/* <!-- end header --> */}

                {lmeList !== null && lmeList.length > 0 ? (
                    <LMEListTableComponent data={lmeList} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
                        <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
                            No LME registered yet!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default LMEList;
