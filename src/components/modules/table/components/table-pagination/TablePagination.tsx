import { Button, Icon, Tooltip } from '../../../../../components';
import { AllTableSize, TablePaginationProps } from '../../root-component/Table.types';
import StyledTablePagination from './TablePagination.styled';
import { CONSTANTS } from '../../../../../constants';
const { FIRST_PAGE, LAST_PAGE, NAVIGATE_NEXT, NAVIGATE_BEFORE } = CONSTANTS.GOOGLE_ICONS;
const { ALL_TABLE_SIZE } = CONSTANTS.COMPONENTS.TABLE;

export default function TablePagination({
  currentPage,
  pageCount,
  limit,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  paginate,
  totalResults,
  goToFirstPage,
  goToLastPage,
  handleLimitChange,
  isUncontrolled,
}: TablePaginationProps) {
  const setLimit = isUncontrolled || String(limit) !== ALL_TABLE_SIZE ? limit : totalResults;
  const setOptionValue = (size: number | AllTableSize) => (isUncontrolled || String(size) !== ALL_TABLE_SIZE ? size : totalResults);

  return (
    <StyledTablePagination className="im-table-pagination">
      <div className="im-table-pagination-pages">
        Página &nbsp;
        <strong>
          {currentPage} de {pageCount}
        </strong>
      </div>
      <div className="im-table-pagination-size">
        |&nbsp;&nbsp;Resultados por página:&nbsp;
        <select value={setLimit} onChange={handleLimitChange}>
          {paginate?.map((size) => (
            <option key={size} value={setOptionValue(size)}>
              {size == ALL_TABLE_SIZE ? 'Total' : size}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      <div className="im-table-pagination-buttons">
        <Tooltip
          content="Primeira Página"
          side="top"
          trigger={
            <Button
              disabled={!canPreviousPage}
              text={<Icon icon={FIRST_PAGE} size="medium" margin="2px 1px 0 0" />}
              onClick={goToFirstPage}
              height="30px"
              width="40px"
            />
          }
        />
        <Tooltip
          content="Página Anterior"
          side="top"
          trigger={
            <Button
              disabled={!canPreviousPage}
              text={<Icon icon={NAVIGATE_BEFORE} size="medium" margin="2px 1px 0 0" />}
              onClick={() => previousPage()}
              round="30px"
            />
          }
        />
        <Tooltip
          content="Próxima Página"
          side="top"
          trigger={
            <Button
              disabled={!canNextPage}
              text={<Icon icon={NAVIGATE_NEXT} size="medium" margin="2px 0 2px 0" />}
              onClick={nextPage}
              round="30px"
            />
          }
        />
        <Tooltip
          content="Última Página"
          side="top"
          trigger={
            <Button
              disabled={!canNextPage}
              text={<Icon icon={LAST_PAGE} size="medium" margin="2px 1px 0 0" />}
              onClick={goToLastPage}
              height="30px"
              width="40px"
            />
          }
        />
      </div>
    </StyledTablePagination>
  );
}
