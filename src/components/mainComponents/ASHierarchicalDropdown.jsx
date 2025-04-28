import React from 'react';
import Select from 'react-select';

const treeData = [
  {
    label: 'Parent 1',
    options: [
      {
        label: 'Parent 1-0',
        options: [
          { label: 'Leaf 1', value: 'leaf1' },
          { label: 'Leaf 2', value: 'leaf2' },
        ],
      },
    ],
  },
  {
    label: 'Parent 2',
    options: [
      {
        label: 'Parent 2-0',
        options: [
          { label: 'Leaf 22', value: 'leaf22' },
          { label: 'Leaf 23', value: 'leaf23' },
        ],
      },
    ],
  },
];

const MultiLevelDropdown = () => {
  const handleChange = (selectedOption) => {
    console.log('Selected:', selectedOption);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isDisabled ? 'bold' : 'normal',
      paddingLeft: state.data.isGroup ? 10 : 30,
    }),
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: 'bold',
    }),
  };

  return (
    <Select
      options={treeData}
      onChange={handleChange}
      styles={customStyles}
      placeholder="Select an option"
      isClearable
    />
  );
};

export default MultiLevelDropdown;
