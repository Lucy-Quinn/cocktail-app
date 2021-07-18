import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: baseline;
  &:first-child{
    padding: 0 0 0 16px;
  }
  ul {
    display: flex;
    align-items: center;
  }
  li {
    margin-left: 20px;
  }
  li a {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.8em;
    display: block;
    padding: 10px 16px;
    letter-spacing: 2px;
  }
`;

export {
  NavbarWrapper
}
