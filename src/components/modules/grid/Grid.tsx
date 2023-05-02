import { jsxHelper } from '../../../helpers';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { StyledCell, StyledGrid, StyledHead } from './Grid.styled';
import { GridRow, GridProps, GridCell, Alignment } from './Grid.types';

const { conditionalClasses } = jsxHelper;

export default function Grid({ columns, rows, width, maxWidth, maxHeight, height, loading, noData, className }: GridProps) {
  const mappedRows = rows?.reduce((acc, row, rowIndex) => {
    let mappedRow = { id: `${rowIndex}-${row.id}` } as GridRow;
    const cells: GridCell[] = [];

    columns.forEach((column, index) => {
      const accessedValue = column.accessor ? row[column?.accessor] : undefined;

      const cell = column.template ? column.template({ row, value: accessedValue, rows, index: rowIndex }) : accessedValue;
      cells.push({
        id: `${row.id}-${column.accessor}-${index}`,
        value: cell,
        cellAlignment: column.cellAlignment as Alignment,
        isTemplate: !!column.template,
      });
    });
    mappedRow = { ...mappedRow, cells };
    acc.push(mappedRow);
    return acc;
  }, [] as GridRow[]);

  const tableRenderer = (
    <>
      <table>
        <thead>
          <tr>
            {columns?.map((column) => (
              <StyledHead headerAlignment={column.headerAlignment ?? 'center'} key={column.id}>
                {column.component ?? column.accessor}
              </StyledHead>
            ))}
          </tr>
        </thead>
        <tbody>
          {mappedRows?.map((row) => (
            <tr key={row.id}>
              {row.cells?.map((cell) => (
                <StyledCell cellAlignment={cell.cellAlignment ?? 'center'} key={cell.id}>
                  {cell.isTemplate ? <div className="im-grid-cell-template">{cell.value}</div> : cell.value}
                </StyledCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {noData && !mappedRows?.length && <div className="im-grid-no-data">{noData}</div>}
    </>
  );

  const renderer = loading ? <LoadingSpinner /> : tableRenderer;

  const classes = conditionalClasses({
    [className as string]: !!className,
    ['im-grid']: true,
  });

  return (
    <StyledGrid className={classes} height={height} width={width} maxWidth={maxWidth} maxHeight={maxHeight} loading={loading ? 1 : 0}>
      {renderer}
    </StyledGrid>
  );
}
