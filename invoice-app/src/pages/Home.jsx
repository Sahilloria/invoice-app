import { useState } from 'react';
import SandwichTable from '../components/SandwichTable';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color:white
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }
`;

const HomePage = () => {
  const [selectedItems, setSelectedItems] = useState([]); // Ensure this is an array
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/return', { state: { selectedItems } });
  };

  return (
    <Container>
      <Title>GAGGS FOODS</Title>
      <SandwichTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      <Button onClick={handleReturn}>Return</Button>
    </Container>
  );
};

export default HomePage;
