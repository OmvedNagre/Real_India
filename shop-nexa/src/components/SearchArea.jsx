import React from 'react'
import styled from 'styled-components'

const SearchArea = () => {
  return (
    <FlexContainer>
    <Container>
      <FormWrapper>
        <Dropdown>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="awdawd">Chennai</option>
        </Dropdown>
        <InputField placeholder="Search" />
        <SubmitButton>Submit</SubmitButton>
      </FormWrapper>
    </Container>
    </FlexContainer>
  );
}

export default SearchArea

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`
const Container = styled.div`
  padding: 1rem 2rem;
  background-color: #f1f3f5;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  width:100vw;
  margin-top:100px;
  
  
`;

const FormWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 2;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
