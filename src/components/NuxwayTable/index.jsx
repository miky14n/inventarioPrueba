"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "./Complements/PlusIcon";
import { VerticalDotsIcon } from "./Complements/VerticalDotsIcon";
import { SearchIcon } from "./Complements/SearchIcon";
import { ChevronDownIcon } from "./Complements/ChevronDownIcon";
import { capitalize } from "./Complements/utils";
import { EditIcon } from "./Complements/EditIcon";
import { DeleteIcon } from "./Complements/DeleteIcon";
import { EyeIcon } from "./Complements/EyeIcon";
import { usePathname } from "next/navigation";

export default function NuxwayTable({
  columns = [{ name: "Enter your name colum", uid: "columid", sortable: true }],
  keyColumn = "numserial",
  statusOptions = [],
  statusColorMap,
  selectFind = "first_column",
  searchers = [""],
  renderCellCustom,
  initialVisibleColumns = [
    "numserial",
    "categoryname",
    "mark",
    "model",
    "bar_code",
    "actions",
  ],
  initialSort = { column: "numserial", direction: "ascending" },
  onAddNew = () => {
    setIsModalOpen(true);
  },
  actions = [""],
  resources = [],
  typeSelection = "",
  setSelecetedItems = () => {},
  addInventory = false,
}) {
  const [searchColumn, setSearchColumn] = React.useState(selectFind);
  const [listSearchers, setListSearchers] = React.useState(searchers);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(initialVisibleColumns)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState(initialSort);
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith("/inventory/item/view");

  useEffect(() => {
    setData(resources);
  }, [resources]);

  const handleDelete = async (numserial) => {
    setData((prevData) =>
      prevData.filter((item) => item.numserial !== numserial)
    );

    try {
      const response = await fetch(
        `https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items/${numserial}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        setData((prevData) => [
          ...prevData,
          data.find((item) => item.numserial === numserial),
        ]);
        console.error("Error deleting item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setData((prevData) => [
        ...prevData,
        data.find((item) => item.numserial === numserial),
      ]);
    }
  };

  const handleAddNew = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false); // Oculta el mensaje después de 3 segundos
    }, 3000);
  };

  const headerColumns = React.useMemo(() => {
    return visibleColumns === "all"
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = Array.isArray(data) ? [...data] : [];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        item[searchColumn].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filteredData = filteredData.filter((item) =>
        Array.from(statusFilter).includes(item.status)
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter, searchColumn]);

  const pages = Math.ceil(data.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    console.log("este es:", item.numserial);
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-x-4 justify-center">
            {" "}
            {/* Espaciado entre acciones */}
            {actions.map((action) => (
              <div
                key={action}
                className={`flex items-center transition-colors duration-200 ${
                  action === "Edit"
                    ? "text-lg  text-default-400 cursor-pointer active:opacity-50"
                    : action === "Delete"
                    ? "text-red-500 text-lg text-danger cursor-pointer active:opacity-50"
                    : action === "View"
                    ? "text-green-500 hover:text-green-700 text-lg text-default-400 cursor-pointer active:opacity-50"
                    : "text-blue-500 hover:text-blue-700"
                }`}
              >
                {action === "Edit" ? (
                  <Tooltip content="Edit">
                    <Link
                      href={`/item/edit/${item.numserial}`}
                      className={`${isActive ? "text-blue-500" : ""}`}
                    >
                      <EditIcon className="mr-1" />
                    </Link>
                  </Tooltip>
                ) : action === "View" ? (
                  <Tooltip content="View Details">
                    <Link
                      href={`/inventory/item/view/${item.numserial}`}
                      className={`${isActive ? "text-blue-500" : ""}`}
                    >
                      <EyeIcon className="mr-1" />
                    </Link>
                  </Tooltip>
                ) : action === "Delete" ? (
                  <Tooltip color="danger" content="Delete Contact">
                    <span
                      onClick={() => handleDelete(item.numserial)}
                      className="flex items-center cursor-pointer"
                    >
                      <DeleteIcon className="mr-1" />
                    </span>
                  </Tooltip>
                ) : (
                  <span className="flex items-center">{action}</span>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <span className="text-center">{cellValue}</span>;
    }
  }, []);

  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <div className="flex gap-4 items-center w-full">
          <div className="w-1/4">
            <Input
              isClearable
              classNames={{
                base: "w-full",
                inputWrapper: "border-1",
              }}
              placeholder="Search by mark and model ..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={setFilterValue}
            />
          </div>

          <div>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <ChevronDownIcon className="text-sm text-gray-500" />
                  }
                  size="sm"
                  variant="flat"
                >
                  {"Search By"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Search Column Filter"
                closeOnSelect={false}
                selectedKeys={new Set([searchColumn])}
                selectionMode="single"
                onSelectionChange={(e) => {
                  const selected = Array.from(e)[0];
                  setSearchColumn(selected);
                }}
              >
                {listSearchers.map((item) => (
                  <DropdownItem key={item} className="capitalize">
                    {capitalize(item)}
                  </DropdownItem>
                ))}
                {setSelecetedItems(selectedKeys)}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Status Filter"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Visible Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {addInventory && (
            <Link href="/item">
              <Button
                className="bg-foreground text-background"
                endContent={<PlusIcon />}
                size="sm"
                onClick={handleAddNew}
              >
                Add New Item
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        classNames={{ cursor: "bg-foreground text-background" }}
        color="default"
        isDisabled={hasSearchFilter}
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />

      <span className="text-small text-default-400">
        {selectedKeys.size === 0
          ? "No items selected"
          : `${selectedKeys.size} of ${items.length} selected`}
      </span>
    </div>
  );

  console.log("Las key seleccionadas son:", selectedKeys);
  setSelecetedItems(selectedKeys);
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={<div className="m-2 p-4">{bottomContent}</div>}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      className="border-collapse border-spacing-0 border border-gray-300 rounded-lg shadow-lg px-4"
      selectedKeys={selectedKeys}
      selectionMode={typeSelection}
      sortDescriptor={sortDescriptor}
      topContent={<div className="m-2 p-4">{topContent} </div>}
      topContentPlacement="outside"
      onSelectionChange={(keys) =>
        setSelectedKeys(
          new Set(
            [...keys].map(
              (key) => data.find((item) => item[keyColumn] === key)?.[keyColumn]
            )
          )
        )
      }
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        {headerColumns.map((column) => (
          <TableColumn
            key={column.uid}
            className="text-center font-bold text-sm bg-gray-800 text-white border-b-2 border-gray-120 py-3"
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {sortedItems.map((item, index) => (
          <TableRow
            key={item[keyColumn]}
            className={`${index % 2 === 0 ? "bg-gray-light" : "bg-gray-200"} `}
          >
            {headerColumns.map((column) => (
              <TableCell key={column.uid} className="py-3 text-center">
                {renderCell(item, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
