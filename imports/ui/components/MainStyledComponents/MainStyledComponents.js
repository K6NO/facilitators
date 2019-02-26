import styled from 'styled-components';
import { Nav, NavItem, NavLink } from 'reactstrap';

export const BasicStyledButton = styled.button`
    height: 40px;
    padding: .8rem 1.5rem;
    background: ${props => props.backcolor};
    color: ${props => props.color};
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    font-weight: 100;
    border: ${props => `1px solid ${props.backcolor}`};
    &:hover {
      background: ${props => `${props.backcolor}bb`};
    }
    &:focus {
        outline: none;
        background: ${props => `${props.backcolor}dd`};
    }
    &:active {
        outline: none;
        background: ${props => `${props.backcolor}dd`};
    }
`;

export const StyledAboutNavLink = styled(NavLink)`
  color: #0e8ed5!important;
  font-size: 1.2rem!important;
  &:hover {
    color: #084d72!important;
  }
`;