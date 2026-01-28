import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Inter, sans-serif;
    background: #f9fafb; /* opcional: fundo leve */
    color: #111827;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`
