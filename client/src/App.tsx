import { useMemo } from "react"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { Box } from "@mui/material"
import { themeSettings } from "./theme"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";
import {loadDataIntoIndexedDB} from '../db/load_db'
import { useGetKpisQuery,useGetTransactionsQuery } from "./state/api"



function App() {
  const theme = useMemo(() => createTheme(themeSettings),[])


  loadDataIntoIndexedDB().catch((error) =>
    console.error("Error loading data into IndexedDB:", error)
  );
  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme = {theme }>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box>
      </ThemeProvider>
    </BrowserRouter> 
    </div>
  )
}

export default App
