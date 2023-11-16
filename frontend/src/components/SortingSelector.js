import React, { useEffect } from 'react';
import './SortingSelector.css'
const SortingSelector = ({ selectedSorting, onSortingChange }) => {
  useEffect(() => {
    onSortingChange(selectedSorting);
  }, [selectedSorting, onSortingChange]);

  return (
    <div className="select-dropdown">
      <select className='sorter' value={selectedSorting} onChange={(e) => onSortingChange(e.target.value)}>
        <option value="popular">Popular</option>
        <option value="descending">Newest</option>
        <option value="ascending">Oldest</option>
      </select>
    </div>
  );
};

export default SortingSelector;
