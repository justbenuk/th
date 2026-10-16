"use client";
import {
  type ColDef,
  themeMaterial,
  AllCommunityModule,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useState } from "react";
import TableSearch from "./TableSearch";

type TableRowProps = {
  id: string | number;
};

type TableContainerProps<TData extends TableRowProps> = {
  data: TData[];
  columns: ColDef<TData>[];
  size?: 10 | 20 | 50 | 100;
};

export default function TableContainer<TData extends TableRowProps>({
  data,
  columns,
  size = 20,
}: TableContainerProps<TData>) {
  const modules = [AllCommunityModule];
  const [search, setSearch] = useState("");

  const defaultColDef: ColDef<TData> = {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 120,
  };

  const myTheme = themeMaterial.withParams({
    backgroundColor: "var(--background)",
    foregroundColor: "var(--foreground)",
    borderColor: "var(--border)",
    headerBackgroundColor: "var(--muted)",
    borderRadius: "0px",
    wrapperBorder: true,
  });

  return (
    <AgGridProvider modules={modules}>
      <div className="grid min-w-0 gap-6">
        <div className="flex flex-row items-end-end md:w-1/2">
          <TableSearch
            title="Search..."
            search={search}
            setSearch={setSearch}
          />
        </div>
        <AgGridReact<TData>
          quickFilterText={search}
          defaultColDef={defaultColDef}
          theme={myTheme}
          domLayout="autoHeight"
          rowData={data}
          columnDefs={columns}
          getRowId={(row) => String(row.data.id)}
          pagination={true}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          paginationPageSize={size}
        />
      </div>
    </AgGridProvider>
  );
}
