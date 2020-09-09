import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// eslint-disable-next-line import/no-unassigned-import
import "./index.css";

import App from "./components/app/app.js";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100vh;
`;

ReactDOM.render(<Wrapper><App/></Wrapper>, document.querySelector("#root"));
