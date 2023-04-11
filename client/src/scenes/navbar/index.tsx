import {useState} from 'react'
import {Box,useTheme,Typography} from '@mui/material'
import PixIcon from "@mui/icons-material/Pix";
import { Link } from 'react-router-dom'
import FlexBetween from '@/reusable-components/flex-between';




const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    return (
      <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        {/* LEFT SIDE */}
        <FlexBetween gap="0.75rem">
          <PixIcon sx={{ fontSize: "28px" }} />
          <Typography variant="h4" fontSize="16px">
            Finanseer
          </Typography>
        </FlexBetween>
  
        {/* RIGHT SIDE */}
        <FlexBetween gap="2rem">
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              dashboard
            </Link>
          </Box>
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link
              to="/predictions"
              onClick={() => setSelected("predictions")}
              style={{
                color: selected === "predictions" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              predictions
            </Link>
          </Box>
        </FlexBetween>
      </FlexBetween>
    );
  };

export default Navbar