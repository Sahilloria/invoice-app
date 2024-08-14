import { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import styled from 'styled-components';
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import AddItemForm from './AddItemForm';
import Message from './Message';

const TableContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
`;

const SearchBar = styled.input`
  padding: 10px;
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
  font-size:1.2em;
`;

const Td = styled.td`
     padding: 6px 10px;
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

const SandwichTable = ({ selectedItems, setSelectedItems, schema }) => {
  const [sandwiches, setSandwiches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const [message, setMessage] = useState("");
  const [color,setColor]=useState("none");
  const [showMessage,setShowMessage] =useState(false);

  const ITEMS_PER_PAGE = sandwiches .length;

  const getMessage = () => {
    const timeout = setTimeout(() => {
      if (showMessage===true) {
        setShowMessage(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  };
  useEffect(() => {
   getMessage();
   
  }, [showMessage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handleSelectItem = (item) => {
    const alreadySelected = selectedItems.find((selectedItem) => selectedItem._id === item._id);
    if (!alreadySelected) {
      setSelectedItems([...selectedItems, { ...item, sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, }]);
    }
  };

  const handleRemoveItem = (item) => {
    const removeItem = selectedItems.filter((value) => value._id !== item._id);
    setSelectedItems(removeItem)
  };

  const filteredSandwiches = sandwiches.filter(sandwich =>
    sandwich.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredSandwiches.length / ITEMS_PER_PAGE);
  const displayedSandwiches = filteredSandwiches.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );


  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    margin: ""
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((pre) => ({
      ...pre,
      [name]: value
    }))

  };
  const { id, name, description, price, margin } = form;

  const getSandwiches = async () => {
    try {
      const res = await axios.get(`${schema}/foodItems`)
      setSandwiches(res.data.data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getSandwiches()
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${schema}/newItem`, { name, description, price, margin })
      handleShowModal();
      getSandwiches();
      setColor("green")
      setMessage(res.data.message)   
      setShowMessage(true) 
    } catch (error) {
      console.log("ERROR", error)
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const res = await axios.delete(`${schema}/deleteItem/${id}`);
      getSandwiches();
      setColor("red")
      setMessage("Item Successfully deleted!")
      setShowMessage(true)
    } catch (error) {
      console.log("Error", error)
    }

  };
  const handleUpdateItemForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${schema}/updateItem`, { id, name, description, price, margin })
      handleShowUpdateModal();
      getSandwiches()
      setColor("green")
      setForm((pre) => ({
        ...pre,
        name: "",
        description: "",
        price: "",
        margin: ""

      }));
      setMessage(res.data.message)
      setShowMessage(true)
    } catch (error) {
      console.log("ERROR", error)
      setForm((pre) => ({
        ...pre,
        name: "",
        description: "",
        price: "",
        margin: ""

      }))
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal)
    setForm((pre) => ({
      ...pre,
      name: "",
      description: "",
      price: "",
      margin: ""

    }))
  };

  const handleShowUpdateModal = () => {
    setShowUpdateItemModal(!showUpdateItemModal)
  };

  const handleUdpateItem = (values) => {
    setForm((pre) => ({
      ...pre,
      id: values._id,
      name: values.name,
      description: values.description,
      margin: values.margin,
      price: values.price

    }))
    handleShowUpdateModal()
  };

  // const handleSelectAll = () =>{
  //   setSelectedItems({...displayedSandwiches,  sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, });
  // };
if(sandwiches.length===0){
  return <> Loading...</>
}
  return (
    <>
      <TableContainer>
        <div style={{ display: "flex", alignItems: 'center', width: "100%", justifyContent: "space-between", marginBottom: 20 }}>
          <SearchBar
            type="text"
            placeholder="Search Items"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleShowModal} className='button'> Add Item</button>
          {/* <button onClick={handleSelectAll} className='button'> Select All</button> */}
        </div>

        <Table>
          <thead>
            <tr>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Select</Th>
              <Th>Update Item</Th>
              <Th>Delete Item</Th>

            </tr>
          </thead>
          <tbody>
            {displayedSandwiches.map((sandwich) => {
              const isSelected = selectedItems.some(item => item._id === sandwich._id);
              return (
                <tr key={sandwich._id}>
                  <Td>{sandwich.description} £{sandwich.price}</Td>
                  <Td>£ {sandwich.price_after_margin}</Td>
                  <Td>
                    {isSelected ?
                      <button className='button' onClick={() => handleRemoveItem(sandwich)} style={{ background: "red", }}>Remove Item</button>
                      :
                      <button className='button' onClick={() => handleSelectItem(sandwich)}>Select Item</button>}
                  </Td>
                  <Td onClick={() => handleUdpateItem(sandwich)}><button className='update-button'>Update Item</button></Td>

                  <Td onClick={() => handleDeleteItem(sandwich._id)} >
                    <button className='delete-button' ><MdDelete />Delete Item</button>
                  </Td>
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
      {showModal &&
        <Modal
          Information={
            <AddItemForm
              handleShowModal={handleShowModal}
              handleFormSubmit={handleFormSubmit}
              handleOnChange={handleOnChange}
              form={form}
              title="Add New Item"

            />
          }

        />
      }
      {showUpdateItemModal &&
        <Modal Information={
          <AddItemForm
            handleShowModal={handleShowUpdateModal}
            handleFormSubmit={handleUpdateItemForm}
            handleOnChange={handleOnChange}
            form={form}
            title="Update an Item"

          />
        }
          title="Update Item"
        />
      }
     { showMessage && <Message message={message} color={color}/>}
    </>

  );
};

export default SandwichTable;
