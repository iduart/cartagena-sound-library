import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign'

const Container = styled.View`
  padding-horizontal: 30px;
`;

const SearchInput = styled.View`
  border: solid #FFFFFF 1px;
  height: 46px;
  border-radius: 30px;
  padding: 5px 25px;
  color: #FFFFFF;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#FFFFFF'
})`
  padding-right: 10px;
  color: #FFFFFF;
  flex-basis: 94%;
  font-size: 17px;
`;

const SearchBar = () => {
  return (
    <Container>
      <SearchInput>
        <Input placeholder="Buscar..." />
        <Icon name="search1" size={18} color="#FFFFFF" />
      </SearchInput>
    </Container>
  )
}

export default SearchBar;