import "react-datepicker/dist/react-datepicker.css";

import React, {useEffect, useState} from "react";

import DatePicker from "react-datepicker";
import cookie from "react-cookies";

interface IStove {
    id?: number;
    price?: number;
    name?: string;
}

const randomLargeNumber = 1998;

function CreateSale() {
    const [startDate, setStartDate] = useState(new Date());
    const [lmes, setLMES] = useState<null | any>(null);
    const [availableStoves, setAvailableStoves] = useState<any | null>(null);

    const [selectedLME, setSelectedLME] = useState<null | string>(null);
    const [selectedCustomerName, setSelectedCustomerName] = useState<null | string>(
        null,
    );
    const [selectedCustomerPhoneNumber, setSelectedCustomerPhoneNumber] = useState<
        null | string
    >(null);
    const [selectedStovesArray, setSelectedStovesArray] = useState<IStove[]>([]);
    const [stoveData, setStoveData] = useState<IStove>({});

    async function fetchLMEs() {
        await fetch("/api/v1/environment/lme/sales/lmeandstoves/")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data, "data");
                if (data["lmes"].length > 0) {
                    setLMES(data["lmes"]);
                }
                if (data["stoves"].length > 0) {
                    setAvailableStoves(data["stoves"]);
                }
            });
    }

    async function createSale(data) {
        await fetch("/api/v1/environment/lme/sales/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.load("csrftoken"),
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data, "data");
            });
    }

    useEffect(() => {
        fetchLMEs();
    }, []);

    const removeStove = (index: number) => () =>
        setSelectedStovesArray((items) => items.filter((_, i) => i !== index));

    const addItem = (stove: IStove) => {
        let newArr = [...selectedStovesArray, stove];
        console.log(newArr, "new Array");
        setSelectedStovesArray(newArr);
        //
        setStoveData({});
    };

    const getStoveName = (id: number) => {
        let stove_name = "";
        for (let i = 0; i < availableStoves.length; i++) {
            console.log("iterating");
            if (availableStoves[i]["id"] === id) {
                stove_name = availableStoves[i]["name"];
                break;
            }
        }

        return stove_name;
    };

    const handleSubmit = () => {
        let data = {
            lme: selectedLME,
            customerName: selectedCustomerName,
            customerPhone: selectedCustomerPhoneNumber,
            stovesList: selectedStovesArray,
            dateSold: startDate,
        };

        createSale(data);
    };

    return (
        <div className="w-full px-2 md:px-6">
            <div className="flex flex-row justify-center mb-4 ">
                <h1 className="text-3xl">Create a sale</h1>
                <hr />
            </div>
            <hr />

            <div className="w-full p-2 border-2 rounded-lg  md:marker:p-4">
                <form className="w-full ">
                    <div className="grid grid-cols-2 gap-4">
                        {/* LME */}
                        <div className="w-full px-3 my-2 md:mb-0">
                            <label
                                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                htmlFor="grid-state"
                            >
                                LME
                            </label>
                            {/* <p>{selectedLME}</p> */}

                            <div className="relative">
                                <select
                                    className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    onChange={(e) => setSelectedLME(e.target.value)}
                                >
                                    <option>------------</option>
                                    {lmes !== null &&
                                        lmes.map((lme, index) => {
                                            return (
                                                <option key={index}>
                                                    {lme["name"]}
                                                </option>
                                            );
                                        })}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Customer Name */}
                        <div className="flex flex-wrap my-2 -mx-3">
                            <div className="w-full px-3 my-2 md:w-1/2 md:mb-0">
                                <label
                                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                    htmlFor="grid-first-name"
                                >
                                    Customer Name
                                </label>
                                {/* <>{selectedCustomerName}</> */}

                                <input
                                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setSelectedCustomerName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {/* Customer Phone */}
                        <div className="flex flex-wrap my-2 -mx-3">
                            <div className="w-full px-3 my-2 md:w-1/2 md:mb-0">
                                <label
                                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                    htmlFor="grid-first-name"
                                >
                                    Customer Phone Number
                                </label>
                                <>{selectedCustomerPhoneNumber}</>
                                <input
                                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    placeholder="+2547....."
                                    onChange={(e) =>
                                        setSelectedCustomerPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap my-2 -mx-3">
                            <div className="w-full px-3">
                                <label
                                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                    htmlFor="grid-password"
                                >
                                    Date Purchased
                                </label>
                            </div>
                            {/* <p>{JSON.stringify(startDate)}</p> */}
                            <div className="mt-0 ml-4">
                                <DatePicker
                                    className="w-full"
                                    selected={startDate}
                                    onChange={(date: Date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* stove select */}
                    {/* STOVES */}
                    {/* <pre>{JSON.stringify(selectedStovesArray)}</pre> */}
                    {selectedStovesArray !== null &&
                        selectedStovesArray.map((stove, index) => {
                            return (
                                <div
                                    key={stove.id}
                                    className="flex flex-row items-center justify-center w-full mb-6"
                                >
                                    <div className="grid items-center justify-center w-1/2 grid-cols-3 gap-2 px-4 py-2 my-2 bg-green-100 border-2 rounded-md shadow-md">
                                        <div className="grid my-2 ">
                                            Stove:{" "}
                                            {stove.id !== undefined
                                                ? getStoveName(stove.id)
                                                : ""}
                                        </div>
                                        <div className="grid my-2 ">
                                            Kshs. {stove.price}
                                        </div>
                                        <div className="grid my-2 border-2 ">
                                            <button
                                                className="w-full px-4 py-2 bg-red-400 rounded-sm"
                                                onClick={removeStove(index)}
                                                style={{
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    backgroundColor: "#fc5185",
                                                }}
                                            >
                                                Remove Entry
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <hr />
                    {/* {selectedStovesArray.map((it, index) => {
            return (
              <div key={it.id}>
                {it.price} <button onClick={removeStove(index)}>delete</button>
              </div>
            );
          })} */}
                    {/* <pre>{JSON.stringify(selectedStovesArray)}</pre>
          <pre>Stovedata:{JSON.stringify(stoveData)}</pre>
          <pre>
            Undefined:
            {stoveData.name === undefined ? "name undefined" : "defined"}
          </pre>
          <pre>
            Undefined?:
            {stoveData.name ? "? name undefined" : "? defined"}
          </pre>
          <pre>
            Null:{stoveData.name === null ? "name null" : "name not null"}
          </pre> */}
                    <div className="grid w-full grid-cols-3 gap-2 py-2 border-2 md:gap-4">
                        {/* stove */}
                        <div className="grid w-full px-3 my-2 md:mb-0">
                            {stoveData.id === randomLargeNumber ? (
                                <div className="grid flex-wrap w-full my-2 ">
                                    <div className="w-full px-3 my-2 md:w-1/2 md:mb-0">
                                        <label
                                            className="block mb-2 text-xs font-bold tracking-wide text-red-500 uppercase"
                                            htmlFor="grid-first-name"
                                        >
                                            New Stove Name
                                        </label>
                                        <input
                                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="text"
                                            placeholder="New Stove Name"
                                            value={stoveData.name ? stoveData.name : ""}
                                            onChange={(e) => {
                                                setStoveData({
                                                    ...stoveData,
                                                    name: e.target.value,
                                                    id: randomLargeNumber,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <label
                                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-state"
                                    >
                                        Stove
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-state"
                                            value={
                                                stoveData.id ? stoveData.id : "-----"
                                            }
                                            onChange={(e) => {
                                                if (
                                                    parseInt(e.target.value) ===
                                                    randomLargeNumber
                                                ) {
                                                    console.log("we have our number");
                                                    setStoveData({
                                                        id: parseInt(e.target.value),
                                                    });
                                                } else {
                                                    console.log("other jikos");

                                                    setStoveData({
                                                        ...stoveData,
                                                        id: parseInt(e.target.value),
                                                    });
                                                }
                                            }}
                                        >
                                            <option>-----------</option>
                                            {availableStoves !== null &&
                                                availableStoves.map((stove, index) => {
                                                    return (
                                                        <option
                                                            key={stove.id}
                                                            value={stove.id}
                                                        >
                                                            {stove.name}
                                                        </option>
                                                    );
                                                })}
                                            <option value={randomLargeNumber}>
                                                Other
                                            </option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {/* price */}
                        <div className="grid flex-wrap w-full my-2 ">
                            <div className="w-full px-3 my-2 md:w-1/2 md:mb-0">
                                <label
                                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                    htmlFor="grid-first-name"
                                >
                                    Price
                                </label>
                                <input
                                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="number"
                                    placeholder="Price"
                                    value={stoveData.price ? stoveData.price : ""}
                                    onChange={(e) => {
                                        setStoveData({
                                            ...stoveData,
                                            price: parseInt(e.target.value),
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* Add */}
                        <div className="flex flex-col items-start justify-center w-7/12 ">
                            {stoveData.id === randomLargeNumber &&
                            stoveData.price &&
                            stoveData.name ? (
                                <button
                                    className="w-full px-4 py-4 text-center text-white rounded-md"
                                    id="add_button"
                                    style={{
                                        paddingLeft: 4,
                                        paddingRight: 4,
                                        backgroundColor: "#fc5185",
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addItem({...stoveData});
                                    }}
                                >
                                    <p className="self-center w-full px-4 text-xs text-center md:text-md">
                                        Add New Jiko To Cart
                                    </p>
                                </button>
                            ) : stoveData.id &&
                              stoveData.price &&
                              stoveData.name === undefined ? (
                                <button
                                    className="w-full px-4 py-4 text-center text-white rounded-md"
                                    id="add_button"
                                    style={{
                                        paddingLeft: 4,
                                        paddingRight: 4,
                                        backgroundColor: "#fc5185",
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addItem({...stoveData});
                                    }}
                                >
                                    <p className="self-center w-full px-4 text-xs text-center md:text-md">
                                        Add To Cart
                                    </p>
                                </button>
                            ) : (
                                <>
                                    {/* <p>id: {stoveData.id}</p>
                  <p>price: {stoveData.price}</p>
                  <p>name: {stoveData.name ? "its not null" : " null"}</p> */}

                                    <p className="px-0 text-red-500">
                                        Add a stove and price
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex flex-wrap items-center justify-center mt-6 mb-2 -mx-3">
                        {selectedStovesArray.length > 0 &&
                        selectedLME &&
                        selectedCustomerName &&
                        selectedCustomerPhoneNumber ? (
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-400 h-14"
                                onClick={handleSubmit}
                            >
                                SUBMIT
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-1/2 py-2 h-14"
                                style={{
                                    backgroundColor: "#dee1ec",
                                }}
                                disabled
                            >
                                Fill in all fields to submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSale;
