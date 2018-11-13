import styled from 'styled-components';

const Button = styled.button.attrs({
  // we can define static props
  type: props => props.type,
  
})`
  color: black;
  font-size: 30px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: white;
  width: 50px;
  height: 50px;
  display: inline-block;
  padding: 0;
`;


export default Button;