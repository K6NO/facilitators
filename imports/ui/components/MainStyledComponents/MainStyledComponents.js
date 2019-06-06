import styled from 'styled-components';
import { NavLink } from 'reactstrap';

export const BasicStyledButton = styled.button`
    height: 40px;
    padding: .8rem 1.5rem;
    border-radius: .5rem;
    background: ${props => props.backcolor};
    color: ${props => props.color};
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    font-weight: 100;
    text-transform: uppercase;
    border: ${props => `1px solid ${props.backcolor}`};
    &:hover {
      background: ${props => `${props.backcolor}dd`};
      box-shadow: 1px 1px 2px 0 #999999;
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

export const BasicStyledLink = styled.a`
    color: ${props => props.color || "#777777"};
    background: ${props => props.backcolor ? props.backcolor : 'white'};
    font-size: 1.3rem;
    letter-spacing: 3px;
    font-weight: 100;
    text-transform: uppercase;
    &:hover {
        color: ${props => `${props.color}dd` || "#777777"};
        text-decoration: ${props => `underline ${props.color}88` || "#77777788"};
    }
    &:focus {
        outline: none;
        color: ${props => `${props.color}dd` || "#777777"};
        text-decoration: ${props => `underline ${props.color}88` || "#77777788"};
    }
    &:active {
        outline: none;
        color: ${props => `${props.color}dd` || "#777777"};
    }
`;

export const BasicStyledBadge =  styled.span`
    background-color: ${props => props.backcolor || "#777777"};
    color: ${props => props.color || "#ffffff"};
    margin: 1rem .5rem 1rem 0;
    padding: .5rem 1rem;
    min-width: 10px;
    white-space: nowrap;
    vertical-align: baseline;
    text-align: center;  
    font-size: 1.3rem;
    border-radius: 10rem;
    &:hover {
          color: ${props => `${props.color}dd` || "#777777"};
          background-color: ${props => `${props.backcolor}dd` || "#777777"};
      }
`;

export const StyledAboutNavLink = styled(NavLink)`
  color: #0e8ed5!important;
  font-size: 1.2rem!important;
  &:hover {
    color: #084d72!important;
  }
`;