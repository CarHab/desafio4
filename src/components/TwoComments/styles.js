import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  color: #333;
  margin-right: 10px;
  width: 25%;
`;

export const AddComment = styled.TextInput`
  margin: 15px;
  margin-top: 25px;
  font-size: 20px;
`;

export const Comment = styled.Text`
  width: 50%;
  flex-wrap: wrap;
  text-align: justify;
`;
