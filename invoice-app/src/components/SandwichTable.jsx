import  { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import sandwichesData from '../data/sandwiches.json';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Table = styled.table`
background: #f8f8f8;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;

  .button{
  color:white,
  background-color: red;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    
  }

  .pagination li.active a {
    background-color: #6e9e68 !important;
    color: white !important;
  }
`;

const SandwichTable = ({ selectedItems, setSelectedItems }) => {
  const [sandwiches, setSandwiches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setSandwiches(sandwichesData);
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handleSelectItem = (item) => {
    const alreadySelected = selectedItems.find((selectedItem) => selectedItem.id === item.id);
    if (!alreadySelected) {
      setSelectedItems([...selectedItems, { ...item, sun:0, mon:0, tue:0, wed:0, thu:0,fri:0,sat:0, }]);
    }
  };
  const handleRemoveItem = (item) => {
    const removeItem = selectedItems.filter((value)=>value.id!==item.id);
    setSelectedItems(removeItem)
  };

  const filteredSandwiches = sandwiches.filter(sandwich =>
    sandwich.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredSandwiches.length / ITEMS_PER_PAGE);
  const displayedSandwiches = filteredSandwiches.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <TableContainer>
      <SearchBar
        type="text"
        placeholder="Search Items"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Select</Th>
            <Th>Selected</Th>
          </tr>
        </thead>
        <tbody>
          {displayedSandwiches.map((sandwich) => {
            const isSelected = selectedItems.some(item => item.id === sandwich.id);
            return (
              <tr key={sandwich.id}>
                <Td>{sandwich.name}</Td>
                <Td>£ {sandwich.price}</Td>
                <Td>{sandwich.description}</Td>
               
                <Td>
                 { isSelected?
                 <button onClick={() => handleRemoveItem(sandwich)} style={{background:"red"}}>Remove Item</button>
                 :
                  <button onClick={() => handleSelectItem(sandwich)}>Select Item</button>}
                </Td>
                <Td>{isSelected ? 'Yes' : 'No'}</Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PaginationContainer>
        <ReactPaginate
  
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </PaginationContainer>
    </TableContainer>
  );
};

export default SandwichTable;
