import styled from 'styled-components';

// const Button = styled.button`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;

//   ${props => props.primary && css`
//     background: palevioletred;
//     color: white;
//   `}
// `;


const Button = styled.button.attrs({
  // we can define static props
  type: props => props.type,

  // or we can define dynamic ones
  // margin: props => props.size || "1em",
  // padding: props => props.size || "1em"
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