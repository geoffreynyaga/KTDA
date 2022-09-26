
import { useFilters, useSortBy, useTable } from "react-table";

// import JsPDF from "jspdf";
import Papa from "papaparse";
import React from "react";

import { useExportData } from "react-table-plugins";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

const defaultColumn = {
  Filter: DefaultColumnFilter,
};

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
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

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    exportData,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      getExportFileBlob,
    },
    useFilters,
    useSortBy,
    useExportData
  );

  return (
    <div>
      <button
        onClick={() => {
          exportData("csv", true);
        }}
      >
        Export All as CSV
      </button>
      <button
        onClick={() => {
          exportData("csv", false);
        }}
      >
        Export Current View as CSV
      </button>
      <button
        onClick={() => {
          exportData("xlsx", true);
        }}
      >
        Export All as xlsx
      </button>
      <button
        onClick={() => {
          exportData("xlsx", false);
        }}
      >
        Export Current View as xlsx
      </button>
      <button
        onClick={() => {
          exportData("pdf", true);
        }}
      >
        Export All as PDF
      </button>{" "}
      <button
        onClick={() => {
          exportData("pdf", false);
        }}
      >
        Export Current View as PDF
      </button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                  </span>
                  <div>
                    {column.canFilter ? column.render("Filter") : null}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </div>
  );
}

function LMESalesList() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  let x = [{"firstName":"independence-dbd7c","lastName":"role-huzid","age":13,"visits":61,"progress":19,"status":"complicated"},{"firstName":"cart-ytwhm","lastName":"comfort-g9nd2","age":2,"visits":98,"progress":62,"status":"single"},{"firstName":"bathroom-z1609","lastName":"powder-djuxe","age":2,"visits":46,"progress":37,"status":"single"},{"firstName":"farm-tfaet","lastName":"stranger-yxz2o","age":11,"visits":85,"progress":69,"status":"complicated"},{"firstName":"prison-ugqu4","lastName":"humor-qw65v","age":14,"visits":7,"progress":36,"status":"single"},{"firstName":"dust-lzb8h","lastName":"trees-8rzeh","age":10,"visits":96,"progress":18,"status":"complicated"},{"firstName":"revolution-u9etm","lastName":"finger-p3hed","age":13,"visits":36,"progress":87,"status":"complicated"},{"firstName":"quality-t238y","lastName":"light-dg5ar","age":26,"visits":49,"progress":18,"status":"single"},{"firstName":"hall-3i3s5","lastName":"pigs-8kbiv","age":12,"visits":82,"progress":93,"status":"relationship"},{"firstName":"kick-8pcbi","lastName":"initiative-ja2i4","age":26,"visits":96,"progress":58,"status":"complicated"},{"firstName":"face-6llj2","lastName":"boat-s1qtf","age":24,"visits":19,"progress":55,"status":"relationship"},{"firstName":"cherries-zxtso","lastName":"book-ew1oy","age":14,"visits":41,"progress":31,"status":"relationship"},{"firstName":"variation-6zxbx","lastName":"fog-ssge3","age":13,"visits":16,"progress":24,"status":"relationship"},{"firstName":"view-vzqil","lastName":"surprise-3insf","age":1,"visits":58,"progress":25,"status":"single"},{"firstName":"locket-oy85k","lastName":"team-dsakm","age":17,"visits":66,"progress":85,"status":"relationship"},{"firstName":"youth-zbkn2","lastName":"existence-5igmz","age":9,"visits":66,"progress":38,"status":"relationship"},{"firstName":"cousin-ay0fb","lastName":"maid-mum13","age":2,"visits":23,"progress":98,"status":"single"},{"firstName":"eggs-ag5id","lastName":"stage-a8y29","age":0,"visits":7,"progress":30,"status":"relationship"},{"firstName":"drain-3ralk","lastName":"security-wdpvx","age":1,"visits":99,"progress":51,"status":"single"},{"firstName":"weight-a1xdc","lastName":"solution-xfz38","age":20,"visits":61,"progress":77,"status":"single"}] 


  const data = React.useMemo(() => x, []);

  return (
      <Table columns={columns} data={data} />
  );
}

export default LMESalesList;
