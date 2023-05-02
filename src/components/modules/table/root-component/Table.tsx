/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Cell, ColumnInstance } from 'react-table';
import { StyledTable, StyledColumnData, StyledColumnHeader } from './Table.styled';
import { TableProps } from './Table.types';
import TablePagination from '../components/table-pagination/TablePagination';
import TableMenu from '../components/table-menu/TableMenu';
import { CONSTANTS } from '../../../../constants';
import { configs } from '../../../../configs';
import { memo } from 'react';
import { Icon, LoadingSpinner } from '../../../../components';
import { jsxHelper } from '../../../../helpers';

const { KEYBOARD_ARROW_UP, KEYBOARD_ARROW_DOWN, SORT } = CONSTANTS.GOOGLE_ICONS;
const { zIndexes } = configs;
const { conditionalClasses } = jsxHelper;

function Table({
  allowExportExcel = true,
  allowExportCSV = true,
  sortable = true,
  showGlobalFilter = true,
  showColumnFilter = true,
  paginate,
  noData,
  stickFromColumn,
  stickHeader = true,
  headerStyles,
  rowStyles,
  onRowClick,
  tableHeight = '100%',
  label,
  filename,
  loading = true,
  tableInstance,
  customFilters,
  info,
  onResetFilters,
}: TableProps) {
  const noDataRenderer = noData ?? 'Sem resultados';

  const handleRowClick = (rowData: any) => {
    onRowClick?.(rowData);
  };

  const setHeaderGroupArgs = (column: ColumnInstance) => {
    if (sortable) {
      return [column.getSortByToggleProps()];
    }
    return [];
  };

  const {
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
    headerGroups,
    prepareRow,
    getToggleHideAllColumnsProps,
    globalFilter,
    allColumns,
    renderRows,
    hasFilteredValues,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    handleLimitChange,
    clearAllFilters,
    currentPage,
    goToFirstPage,
    goToLastPage,
    limit,
    hasManualWidthColumns,
    totalResults,
    isUncontrolled,
  } = tableInstance;

  const hasData = renderRows.length > 0;

  const renderOrderingIcon = (column: ColumnInstance) => {
    if (column.disableSortBy) {
      return <div />;
    }
    if (!column.isSorted) {
      return (
        <div>
          <Icon icon={SORT} />
        </div>
      );
    }
    if (column.isSortedDesc) {
      return (
        <div>
          <Icon icon={KEYBOARD_ARROW_DOWN} color="var(--primary-color)" />
        </div>
      );
    }
    return (
      <div>
        <Icon icon={KEYBOARD_ARROW_UP} color="var(--primary-color)" />
      </div>
    );
  };

  const columnHeaderClasses = (columnId: string) =>
    conditionalClasses({ ['im-table-th']: true, ['im-table-sticky-column']: columnId === stickFromColumn });

  const columnsDataClasses = (cellColumnId: string) =>
    conditionalClasses({ ['im-table-td']: true, ['im-table-sticky-column']: cellColumnId === stickFromColumn });

  return (
    <StyledTable
      className="im-table"
      stickColumn={!!stickFromColumn}
      manualWidth={hasManualWidthColumns}
      headerStyles={headerStyles}
      rowStyles={rowStyles}
      clickableRow={!!onRowClick}
      stickHeader={!!stickHeader}
      tableHeight={tableHeight}
    >
      {label && <h2>{label}</h2>}
      <TableMenu
        allColumns={allColumns}
        allowExportExcel={allowExportExcel}
        allowExportCSV={allowExportCSV}
        renderRows={renderRows}
        headerGroups={headerGroups}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        showGlobalFilter={showGlobalFilter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        label={label}
        filename={filename}
        hasFilteredValues={hasFilteredValues}
        clearAllFilters={clearAllFilters}
        customFilters={customFilters}
        onResetFilters={onResetFilters}
      />
      {info && <div className="im-table-info">{!loading && hasData && info}</div>}
      <div className="im-table-wrapper">
        <table {...getTableProps}>
          <thead>
            {headerGroups?.map((headerGroup: any) => (
              // react-table headerGroup.getHeaderGroupProps() already set a key
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  // react-table column.getHeaderProps() already set a key
                  // eslint-disable-next-line react/jsx-key
                  <StyledColumnHeader
                    key="1"
                    className={columnHeaderClasses(column.id)}
                    width={column.width}
                    {...column.getHeaderProps(...setHeaderGroupArgs(column))}
                    // Implemented this way to override sticky properties
                    style={{ zIndex: zIndexes.table.thead }}
                  >
                    <div className="im-table-th-container">
                      {column.render('Header')}
                      {renderOrderingIcon(column)}
                      {column?.Filter && showColumnFilter ? column.render('Filter') : null}
                    </div>
                  </StyledColumnHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {renderRows?.map((row: Row) => {
              prepareRow(row);
              return (
                // react-table row.getRowProps() already set a key
                // eslint-disable-next-line react/jsx-key
                <tr onClick={() => handleRowClick(row.original)} {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => (
                    // react-table row.getCellProps() already set a key
                    // eslint-disable-next-line react/jsx-key
                    <StyledColumnData
                      className={columnsDataClasses(cell.column.id)}
                      width={cell.column.width}
                      {...cell.getCellProps()}
                      // Implemented this way to override sticky properties
                      style={{ zIndex: zIndexes.table.tbody }}
                    >
                      {cell.render('Cell')}
                    </StyledColumnData>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!hasData && !loading && <div className="im-table-no-data">{noDataRenderer}</div>}
      {loading && (
        <div className="im-table-loading">
          <LoadingSpinner size="medium" />
        </div>
      )}
      {paginate && !loading && (
        <TablePagination
          currentPage={currentPage}
          pageCount={pageCount}
          paginate={paginate}
          limit={limit}
          handleLimitChange={handleLimitChange}
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          totalResults={totalResults}
          isUncontrolled={isUncontrolled}
        />
      )}
    </StyledTable>
  );
}

export default memo(Table);
