import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";

import MainText from "../main-text/main-text.js";
import colors from "../../lib/styles/colors/colors.js";

const Wrapper = styled(MainText)`
    display: flex;
    justify-content: flex-end;

    padding: 0;

    width: 100%;
    height: 3rem;

    border: 0 solid transparent;
    border-right: 1px solid transparent;

    background-color: transparent;

    cursor: pointer;

    &:focus-within {
      animation: caret-pulse 1.5s cubic-bezier(.215, .61, .355, 1) forwards infinite;
    }

    @keyframes caret-pulse {
      50% {
        border-color: ${colors.textSecondary};
      }
    }
`;

const InputController = styled.input`
    margin: 0;
    padding: 0;

    width: 0;
    height: 0; 

    border: 0;
    
    appearance: none;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
    }
    
    &:invalid {
      box-shadow: none;
    }
`;

function Input({
    isDisabled = false, prefix = constant(null), value = "", onInput = () => ({})
}) {
    return (
        <Wrapper as="label">
            {prefix()}
            {value}
            <InputController
                type="number"
                disabled={isDisabled}
                value={value}
                onInput={onInput}
            />
        </Wrapper>);
}

export default Input;
