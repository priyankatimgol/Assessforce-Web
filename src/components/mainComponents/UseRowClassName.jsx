import { useCallback } from 'react';

export const useRowClassName = (isHovered, selectedRowId) => {
  return useCallback(
    (params) => {
      if (isHovered && params?.id === selectedRowId) {
        return 'hovered-row selected-row';
      }
      return '';
    },
    [isHovered, selectedRowId]
  );
};
