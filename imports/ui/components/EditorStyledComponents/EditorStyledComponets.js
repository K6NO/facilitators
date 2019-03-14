import styled from 'styled-components';
import { Colors } from '../../../modules/colors';

export const StyledTextarea = styled.textarea`
    overflow: auto;
    resize: vertical;
    width: 100%;
    height: 60px;
    font-size: 1.3rem;
    margin-bottom: 2rem;
    color: ${Colors.textDark};
    &:focus, &:hover {
        background: #ffffffaa;
        outline: none;
        border: 1px solid white;
    }
`;

export const StyledTallTextarea = styled.textarea`
    overflow: auto;
    resize: vertical;
    width: 100%;
    height: 600px;
    font-size: 1.3rem;
    margin-bottom: 2rem;
    color: ${Colors.textDark};
    &:focus, &:hover {
        background: #ffffffaa;
        outline: none;
        border: 1px solid white;
    }
`;