import styled from "styled-components";

const ClockS = styled.div`
  color: ${(props) => props.timeColor};
`;

const UIS = styled.div`
* {
    box-sizing: border-box;

    font-size: 14px;
    font-family: Roboto, 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, sans-serif;
    font-variant: small-caps;
    text-rendering: optimizeLegibility;

    line-height: 1.5rem;

    outline: none;
}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

export {
    ClockS,
    UIS
};
