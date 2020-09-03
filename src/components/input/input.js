import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors/colors.js";

const Value = styled.label`
    display: block;

    padding: 0;

    height: 3rem;

    border: 0 solid transparent;
    border-right: 1px solid transparent;

    color: ${colors.textPrimary};
    background-color: transparent;

    font-size: 3rem;
    line-height: 3rem;

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

const Input = styled.input`
    margin: 0;
    padding: 0;
    
    width: 0;
    height: 0; 
    
    border: 0;
`;

// const INPUT_REGEXP = "\\d+(\\.\\d{2})?";

function MoneyInput({isDisabled = false, value = "", onChange = () => ({})}) {
    return (
        <Value>
            {value}
            <Input
                type="number"
                disabled={isDisabled}
                value={value}
                onInput={onChange}
            />
        </Value>);
}

export default MoneyInput;
