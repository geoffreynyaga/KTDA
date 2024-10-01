import * as React from "react";

/*
 * File: /Users/geoff/Documents/code/KTDA/ui/src/environment/LMESalesListTableComponent.tsx
 * Project: ui
 * Author: Geoffrey Nyaga  at geoffreynyagak@gmail.com
 * -----
 * Last Modified: Thursday September 26th 2024 10:01:03 am
 * Modified By: Geoffrey Nyaga at geoffreynyagak@gmail.com
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Geoffrey Nyaga Kinyua
 *
 * Copyright (c) 2024 Geoffrey Nyaga Kinyua
 * -----
 * HISTORY:
 */
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";

import {ArrowUpDown} from "lucide-react";
import {Button} from "../../../@/components/ui/button";
import {Checkbox} from "../../../@/components/ui/checkbox";
import {ILME} from "../../../typings/LMETypes";
import {IMonthlySales} from "../../../typings/LMETypes";
import {Input} from "../../../@/components/ui/input";
import {formatCurrency} from "../../utils/currency";

export const columns: ColumnDef<IMonthlySales>[] = [
    {
        accessorKey: "lme",
        header: "LME Name",

        cell: ({row}) => {
            let slug = row.getValue("lme_slug");
            return (
                <a className=" hover:underline" href={`/environment/lme/${slug}/`}>
                    <p className="capitalize font-montserrat text-[14px] text-sm text-blue-600 font-semibold">
                        {row.getValue("lme")}
                    </p>
                </a>
            );
        },
    },

    {
        accessorKey: "factory",
        header: "Factory",
        cell: ({row}) => <div className="capitalize">{row.getValue("factory")}</div>,
    },
    {
        accessorKey: "month_string",
        header: "Month",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("month_string")}</div>
        ),
    },
    {
        accessorKey: "year_number",
        header: "Year",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("year_number")}</div>
        ),
    },

    {
        accessorKey: "jiko_kisasa",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jiko Kisasa
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({row}) => {
            return row.original.jiko_kisasa > 0 ? (
                <p className="text-green-500">{row.original.jiko_kisasa}</p>
            ) : (
                <div className="capitalize">0</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.original.kcj ?? 0;
            const b = rowB.original.kcj ?? 0;
            return a - b;
        },
    },
    {
        accessorKey: "kcj",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    KCJ
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({row}) => {
            return row.original.kcj > 0 ? (
                <p className="text-green-500">{row.original.kcj}</p>
            ) : (
                <div className="capitalize">0</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.original.kcj ?? 0;
            const b = rowB.original.kcj ?? 0;
            return a - b;
        },
    },
    {
        accessorKey: "multipurpose",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Multipurpose
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({row}) => {
            return row.original.multipurpose > 0 ? (
                <p className="text-green-500">{row.original.multipurpose}</p>
            ) : (
                <div className="capitalize">0</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.original.kcj ?? 0;
            const b = rowB.original.kcj ?? 0;
            return a - b;
        },
    },
    {
        accessorKey: "liners",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Liners
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({row}) => {
            return row.original.liners > 0 ? (
                <p className="text-green-500">{row.original.liners}</p>
            ) : (
                <div className="capitalize">0</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.original.kcj ?? 0;
            const b = rowB.original.kcj ?? 0;
            return a - b;
        },
    },
    {
        accessorKey: "rocket",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rocket
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({row}) => {
            return row.original.rocket > 0 ? (
                <p className="text-green-500">{row.original.rocket}</p>
            ) : (
                <div className="capitalize">0</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.original.kcj ?? 0;
            const b = rowB.original.kcj ?? 0;
            return a - b;
        },
    },
    {
        enableHiding: true,
        accessorKey: "lme_slug",
        header: "View LME",
        cell: ({row}) => {
            let slug = row.getValue("lme_slug");

            return slug ? (
                <a className="text-sm text-blue-500" href={`/environment/lme/${slug}/`}>
                    <p className="text-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                            />
                        </svg>
                    </p>
                </a>
            ) : null;
        },
    },
];

export default function LMESalesListTableComponent({data}: {data: IMonthlySales[]}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // console.log(JSON.stringify(data), "sales data");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 25, //custom default page size
            },
        },
    });

    // export all data  to csv
    const exportToCSV = () => {
        const csvData = data.map((row) => ({
            lme: row.lme,
            factory: row.factory,
            month: row.month,
            year: row.year_number,
            jiko_kisasa: row.jiko_kisasa,

            kcj: row.kcj,
            multipurpose: row.multipurpose,
            liners: row.liners,
            rocket: row.rocket,
        }));

        const csvString = [
            Object.keys(csvData[0]).join(","),
            ...csvData.map((row) => Object.values(row).join(",")),
        ].join("\n");

        const blob = new Blob([csvString], {type: "text/csv;charset=utf-8;"});
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "lme_sales_data.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Export filtered data to CSV
    const exportFilteredToCSV = () => {
        const filteredData = table
            .getFilteredRowModel()
            .rows.map((row) => row.original);

        const csvData = filteredData.map((row) => ({
            lme: row.lme,
            factory: row.factory,
            month: row.month_string,
            year: row.year_number,
            jiko_kisasa: row.jiko_kisasa,
            kcj: row.kcj,
            multipurpose: row.multipurpose,
            liners: row.liners,
            rocket: row.rocket,
        }));

        const csvString = [
            Object.keys(csvData[0]).join(","),
            ...csvData.map((row) => Object.values(row).join(",")),
        ].join("\n");

        const blob = new Blob([csvString], {type: "text/csv;charset=utf-8;"});
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "filtered_lme_sales_data.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="w-full px-4 rounded-xl">
            {/* filter */}
            <div className="flex flex-col items-center w-full py-2 md:flex-row justify-evenly md:space-x-2 md:space-y-0">
                <div className="flex w-full md:w-1/3">
                    <Input
                        placeholder="Filter by Name..."
                        value={
                            (table.getColumn("lme")?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn("lme")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                <div className="flex w-full md:w-1/3">
                    <Input
                        placeholder="Filter by Factory..."
                        value={
                            (table.getColumn("factory")?.getFilterValue() as string) ??
                            ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("factory")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
            </div>

            <div className="w-full px-4 rounded-xl">
                <div className="flex justify-end mb-4">
                    {isFiltered ? (
                        <Button onClick={exportFilteredToCSV} className="text-blue-600">
                            Export Filtered Data to CSV
                        </Button>
                    ) : null}

                    <Button onClick={exportToCSV} className="text-blue-600">
                        Export to CSV
                    </Button>
                </div>
            </div>

            {/* table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={i % 2 ? "bg-[#F7F6FE]" : "bg-white"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* pagination */}
            <div className="flex items-center justify-end py-4 space-x-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
