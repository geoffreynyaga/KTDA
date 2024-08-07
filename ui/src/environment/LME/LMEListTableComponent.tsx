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
import {ArrowUpDown} from "lucide-react";
import * as React from "react";

import {Button} from "../../../@/components/ui/button";
import {Checkbox} from "../../../@/components/ui/checkbox";
import {Input} from "../../../@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";
import {ILME} from "../../../typings/LMETypes";

import {formatCurrency} from "../../utils/currency";

export const columns: ColumnDef<ILME>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "LME Name",
        cell: ({row}) => (
            <div className="capitalize font-montserrat text-[14px] font-semibold">
                {row.getValue("name")}
            </div>
        ),
    },
    {
        accessorKey: "factory",
        header: "Factory",
        cell: ({row}) => <div className="capitalize">{row.getValue("factory")}</div>,
    },
    {
        accessorKey: "contact_person",
        header: "Contact Person",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("contact_person")}</div>
        ),
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("phone_number")}</div>
        ),
    },

    {
        accessorKey: "all_sales.stove_price__sum",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Sales
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({row}) => {
            let amount =
                row.original.all_sales.stove_price__sum !== null
                    ? formatCurrency(row.original.all_sales.stove_price__sum)
                    : 0;
            return row.original.all_sales.stove_price__sum !== null ? (
                <p className="text-green-500">{amount}</p>
            ) : (
                <div className="capitalize">0</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.original.all_sales.stove_price__sum ?? 0;
            const b = rowB.original.all_sales.stove_price__sum ?? 0;
            return a - b;
        },
    },
    {
        accessorKey: "slug",
        header: "View LME",
        cell: ({row}) => {
            let slug = row.getValue("slug");

            return slug ? (
                <a className="text-sm text-blue-500" href={`/environment/lme/${slug}/`}>
                    <p className="text-blue-400">View LME</p>
                </a>
            ) : (
                <span className="text-red-500">No Link</span>
            );
        },
    },

    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({row}) => {
    //         const payment = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="w-8 h-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="w-4 h-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(payment.id.toString())
    //                         }
    //                     >
    //                         Copy payment ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>View payment details</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

export default function LMEListTableComponent({data}: {data: ILME[]}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

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

    return (
        <div className="w-full px-4 rounded-xl">
            {/* filter */}
            <div className="flex flex-col items-center w-full py-2 md:flex-row justify-evenly md:space-x-2 md:space-y-0">
                <div className="flex w-full md:w-1/3">
                    <Input
                        placeholder="Filter by Name..."
                        value={
                            (table.getColumn("name")?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
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

                <div className="flex w-full md:w-1/3">
                    <Input
                        placeholder="Filter by Phone..."
                        value={
                            (table
                                .getColumn("phone_number")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("phone_number")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu> */}
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
