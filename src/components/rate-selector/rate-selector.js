import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors/colors.js";
import rateString from "../../lib/helpers/rate-formatter/rate-string.js";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.2rem 0.5rem;

    min-height: 2rem;

    border: 1px solid ${colors.primaryLight};
    border-radius: 4px;

    background-color: ${colors.primaryDark};
    color: ${colors.textPrimary};

    font-weight: 400;

    cursor: pointer;

    transition: border-color 0.1s ease 0s;

    &:active {
        border-color: ${colors.secondary};
    }

    &:hover {
        border-color: ${colors.secondary};
    }
`;

const TextRate = styled.span`
    width: 100%;

    text-align: center;
`;

function RateSelector({rate, currencySymbols}) {
    const formattedRate = rateString(rate, currencySymbols);

    return formattedRate ? (
        <Wrapper>
            <TextRate>{formattedRate}</TextRate>
        </Wrapper>
    ) : null;
}

export default RateSelector;
