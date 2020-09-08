import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import isNumber from "lodash/isNumber.js";

import MainText from "../main-text/main-text.js";
import colors from "../../lib/styles/colors/colors.js";

const Wrapper = styled(MainText)`
    display: flex;
    justify-content: flex-end;

    padding: 0;

    min-width: 3rem;
    height: 3rem;

    border: 0 solid transparent;
    border-right: 1px solid transparent;

    background-color: transparent;
    
    outline: none;

    cursor: ${({isDisabled}) => (isDisabled
                ? "initial"
                : "pointer")};

    &:focus-within {
      animation: ${({isDisabled}) => (isDisabled
                    ? "none"
                    : "caret-pulse 1.5s cubic-bezier(.215, .61, .355, 1) forwards infinite")};
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

function validateValue(value) {
    const valueNumber = Number(value);

    return value !== "" && isNumber(valueNumber) && valueNumber >= 0
        ? valueNumber
        : "";
}

function Input({
    isDisabled = false, prefix = constant(null), value = "", onChange = () => ({}), onInput = () => ({})
}) {
    const validValue = validateValue(value);

    return (
        <Wrapper as="label" tabIndex="-1" isDisabled={isDisabled}>
            {prefix()}
            {validValue}
            <InputController
                type="number"
                tabIndex="-1"
                disabled={isDisabled}
                value={validValue}
                onInput={onInput}
                onChange={onChange}
            />
        </Wrapper>);
}

export default Input;
