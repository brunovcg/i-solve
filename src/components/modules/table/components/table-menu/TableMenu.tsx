import useExportToExcel from '../../root-component/hooks/useExportToExcel';
import useExportToCSV from '../../root-component/hooks/useExportToCSV';
import { TableMenuProps } from '../../root-component/Table.types';
import TableCheckbox from '../table-checkbox/TableCheckbox';
import StyledTableMenu from './TableMenu.styled';
import { CSVLink } from 'react-csv';
import { Button, Popover, Checkbox, Input, ButtonIcon } from '../../../../../components';
import { useRef } from 'react';
import { InputForwardRef } from '../../../form-group/input/Input.types';
import { CONSTANTS } from '../../../../../constants';

const { CHECKLIST } = CONSTANTS.GOOGLE_ICONS;

export default function TableMenu({
  allColumns,
  allowExportExcel,
  allowExportCSV,
  renderRows,
  headerGroups,
  getToggleHideAllColumnsProps,
  showGlobalFilter,
  globalFilter,
  setGlobalFilter,
  label,
  filename,
  hasFilteredValues,
  clearAllFilters,
  customFilters,
  onResetFilters,
}: TableMenuProps) {
  const [getExcel] = useExportToExcel(renderRows, headerGroups, label, filename);
  const [getCSV] = useExportToCSV(renderRows, headerGroups);

  const inputRef = useRef<InputForwardRef>(null);

  const CSVData = getCSV();
  const CSVFileName = filename ?? label ?? 'im-table';

  const isAllToggled = getToggleHideAllColumnsProps().checked;
  const popoverContent = (
    <>
      <div>
        <TableCheckbox {...getToggleHideAllColumnsProps()} label="Toggle All" disabled={isAllToggled} />
      </div>

      {allColumns.map((column) => {
        const header = typeof column.Header === 'string' ? column.Header : column.id;
        return <Checkbox key={column.id} {...column.getToggleHiddenProps()} label={header} />;
      })}
    </>
  );

  const handleResetFilters = () => {
    setGlobalFilter('');
    clearAllFilters();
    onResetFilters?.();

    inputRef.current?.resetInputValue();
  };

  const popoverContentStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  };

  return (
    <StyledTableMenu className="im-table-menu">
      <div className="im-table-download-files">
        {allowExportExcel && <Button onClick={getExcel} text="Download Excel" variant="text" />}
        {allowExportCSV && (
          <Button
            onClick={getCSV}
            variant="text"
            text={
              <CSVLink data={CSVData} target="_self" className="im-csv-download" filename={CSVFileName}>
                Download CSV
              </CSVLink>
            }
          />
        )}
      </div>
      <Popover content={popoverContent} contentStyle={popoverContentStyles} title="Seleção" trigger={<ButtonIcon icon={CHECKLIST} />} />

      <Button variant="text" text="Resetar Filtros" disabled={!hasFilteredValues} onClick={handleResetFilters} />
      {customFilters && <div className="im-table-custom-filters">{customFilters}</div>}
      {showGlobalFilter && (
        <Input
          debounce={500}
          width="300px"
          placeholder="Filtro global"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e)}
          ref={inputRef}
          showAddOns={false}
          canReset={false}
        />
      )}
    </StyledTableMenu>
  );
}
