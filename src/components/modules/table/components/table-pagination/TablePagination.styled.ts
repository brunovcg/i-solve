import styled from 'styled-components';

const StyledTablePagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 5px;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  .im-table-pagination-pages,
  .im-table-pagination-size {
    font-size: 14px;
  }

  .im-table-pagination-buttons {
    display: flex;
    gap: 5px;

    .im-button {
      padding: 0;
    }
  }
`;

export default StyledTablePagination;
