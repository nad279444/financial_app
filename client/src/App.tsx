import { useMemo } from "react"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { themeSettings } from "./theme"


function App() {
  const theme = useMemo(() => createTheme(themeSettings),[])
  return (
    <div className="app">
      <ThemeProvider theme = {theme }>
        <CssBaseline />
        hi 
      </ThemeProvider>
     
    </div>
  )
}

export default App
