import React from 'react';
import { TableProps } from './component.type';

const Table: React.FC<TableProps> = ({ headerEl, bodyEl }) => {
  return (
    <table className='table'>
      <thead>
        <tr>{headerEl}</tr>
      </thead>
      <tbody>{bodyEl}</tbody>
    </table>
  );
};

export default Table;
