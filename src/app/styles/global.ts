import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #F6F8FC;
    --surface: rgba(255,255,255,.78);
    --surface-solid: #FFFFFF;
    --border: rgba(15,23,42,.10);
    --text: #0F172A;
    --muted: rgba(15,23,42,.62);
    --muted2: rgba(15,23,42,.46);
    --primary: #2563EB;   /* azul */
    --primary2:#0EA5E9;   /* cyan */
    --ring: rgba(37,99,235,.18);
  }

  html, body{
    margin:0;
    padding:0;
    height:100%;
    width:100%;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  *{ box-sizing: border-box; }
`
