import styled from "styled-components/native";

export const Container = styled.View``;

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  font-weight: bold;
`;

export const Description = styled.Text`
  padding: 10px;
  line-height: 12px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: "small",
  color: "#999",
})`
  margin: 30px 0;
`;

export const LikeList = styled.Text`
  margin-left: 10px;
  margin-top: 5px;
`;

export const AddComment = styled.TextInput`
  margin: 10px;
  margin-top: 10px;
  font-size: 18px;
`;
