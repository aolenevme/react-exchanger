import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors/colors.js";

const Value = styled.label`
    display: flex;
    justify-content: flex-end;

    padding: 0;

    width: 100%;
    height: 3rem;

    border: 0 solid transparent;
    border-right: 1px solid transparent;

    color: ${colors.textPrimary};
    background-color: transparent;

    font-size: 3rem;
    line-height: 3rem;
    
    cursor: pointer;

    &:focus-within {
      animation: caret-pulse 1.5s cubic-bezier(.215, .61, .355, 1) forwards infinite;
    }

    &::selection {
      background-color: transparent;
    }

    @keyframes caret-pulse {
      50% {
        border-color: ${colors.textSecondary};
      }
    }
`;

const Controller = styled.input`
    margin: 0;
    padding: 0;

    width: 0;
    height: 0; 

    border: 0;
`;

function Input({isDisabled = false, value = "", onInput = () => ({})}) {
    return (
        <Value>
            {value}
            <Controller
                type="number"
                disabled={isDisabled}
                value={value}
                onInput={onInput}
            />
        </Value>);
}

export default Input;
