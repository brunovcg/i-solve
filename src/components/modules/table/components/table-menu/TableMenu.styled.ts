import styled from 'styled-components';

const StyledTableMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  padding-bottom: 15px;
  flex-wrap: wrap;

  .im-table-custom-filters {
    display: flex;
    width: 100%;
  }

  .im-table-download-files {
    display: flex;
    justify-content: flex-end;
  }
  .im-csv-download {
    text-decoration: none;
    color: var(--text-color);
  }

  .im-csv-download,
  button {
    font-size: 14px;
  }
`;

export default StyledTableMenu;
