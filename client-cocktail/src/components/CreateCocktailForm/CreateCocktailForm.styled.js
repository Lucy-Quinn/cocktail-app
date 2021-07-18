import styled from 'styled-components';

const CreateFormWrapper = styled.form`
    max-width: 400px;
    margin: 0 auto;
  input{
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
  }
 button {
    margin-top: 20px;
    background: crimson;
    color: white;
    padding: 6px;
    border: 0;
    font-size: 1.2em;
    cursor: pointer;
  }
`;

export {
    CreateFormWrapper
}