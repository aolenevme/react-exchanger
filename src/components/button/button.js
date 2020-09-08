import React from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";

import colors from "../../lib/styles/colors/colors.js";

const Wrapper = styled.button`
    border-color: transparent;

    background-color: transparent;
    color: ${defineColor};
    -webkit-tap-highlight-color: transparent;

    font-size: 1rem;

    cursor: pointer;

    transition: color 0.1s ease 0s;

    &:active {
      color: ${colors.textPrimaryDark};
    }

    &:disabled {
      cursor: unset;
    }

    &:hover {
      color: ${colors.textPrimaryDark};
    }
`;

function defineColor(props) {
    return props.disabled
        ? colors.textPrimaryDark
        : colors.textPrimary;
}

function Button({
    children, isDisabled = false, onClick = () => ({})
}) {
    return (
        <Wrapper
            disabled={isDisabled}
            type="button"
            onClick={onClick}
        >
            {children}
        </Wrapper>);
}

export default observer(Button);
