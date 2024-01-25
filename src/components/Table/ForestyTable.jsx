import React, { useCallback, useEffect, useState } from "react";
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
  Chip,
  Spinner,
  User,
  Pagination,
  Select,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CreateEditModal from "../Modal/CreateEditModal";
import { renderCell, useRenderCell } from "./cellData";
import { useTheme } from "next-themes";
import * as JsSearch from "js-search";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const ForestyTable = ({
  isSelection = false,
  selectionSubmitButton,
  dataLoading,
  createModal,
  editButton,
  deleteButton,
  extraButton,
  tableData,
  columns,
  initialVisibleColumns,
  viewButton,
  searchIndexes,
  isStriped,
  extraData,
}) => {
  const { theme } = useTheme();

  const renderCellData = useCallback(useRenderCell, []);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(initialVisibleColumns)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredDatas = [...tableData];
    if (hasSearchFilter) {
      var search = new JsSearch.Search("id");

      search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
      search.searchIndex = new JsSearch.UnorderedSearchIndex();
      JsSearch.StopWordsMap.bob = true;

      searchIndexes.map((element) => {
        search.addIndex(element);
      });

      search.addDocuments([...tableData]);

      filteredDatas = search.search(filterValue);
    }
    return filteredDatas;
  }, [tableData, filterValue, statusFilter]);

  const pages =
    tableData.length == 0 ? 1 : Math.ceil(tableData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];
      if (sortDescriptor.column.includes(".")) {
        let arr = sortDescriptor.column.split(".");
        first = a;
        second = b;
        arr.forEach((el) => {
          first = first[el];
          second = second[el];
        });
      }
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            size='sm'
            variant='bordered'
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 rounded-full",
            }}
            className='rounded-full'
            isClearable
            // className='w-full sm:max-w-[44%]'
            placeholder='Qidirish...'
            startContent={<MagnifyingGlassIcon className='w-[18px]' />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex items-center gap-3 z-0'>
            {extraData?.type == "payment" && (
              <div>
                <span>{extraData?.data[0]}</span>
                <span className='text-[14px] ml-5 mr-3 font-thin'>
                  {extraData?.data[1]}
                </span>
              </div>
            )}
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={
                    <ChevronDownIcon className='text-small w-[18px]' />
                  }
                  variant='flat'
                >
                  Ustunlar
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {createModal}
            {selectionSubmitButton &&
              selectionSubmitButton(Array.from(selectedKeys))}
          </div>
        </div>
        {/* <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {tableData.length} tableData
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div> */}
      </div>
    );
  }, [
    selectedKeys,
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    tableData.length,
    onSearchChange,
    hasSearchFilter,
    extraData,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {/* {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`} */}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Oldingi
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Keyingi
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      selectionMode={isSelection ? "multiple" : "none"}
      selectedKeys={isSelection && selectedKeys}
      onSelectionChange={isSelection && setSelectedKeys}
      isStriped={isStriped}
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: "max-h-[650px] bg-white dark:bg-neutral-900",
      }}
      //   selectionMode='multiple'
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={dataLoading}
        loadingContent={<Spinner label='Loading...' />}
        emptyContent={!dataLoading && "Ma'lumot topilmadi."}
        items={sortedItems}
      >
        {sortedItems.map((el, index) => (
          <TableRow
            key={el.id}
            className={
              dataLoading ? "h-[50px] opacity-20" : "h-[50px] opacity-100"
            }
          >
            {(columnKey) => (
              <TableCell>
                {renderCellData(
                  { ...el, rowOrder: rowsPerPage * (page - 1) + index + 1 },
                  columnKey,
                  viewButton,
                  editButton,
                  deleteButton,
                  extraButton,
                  theme
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ForestyTable;
