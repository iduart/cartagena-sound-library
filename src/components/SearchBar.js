import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import globalSearch from '../store/globalSearch';

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
  const dispatch = useDispatch();

  const handleChange = debounce((value) => {
    dispatch(globalSearch.actions.setSearch(value));
  }, 250)

  return (
    <Container>
      <SearchInput>
        <Input placeholder="Buscar..." onChangeText={handleChange} autoCorrect={false} />
        <Icon name="search1" size={18} color="#FFFFFF" />
      </SearchInput>
    </Container>
  )
}

export default SearchBar;