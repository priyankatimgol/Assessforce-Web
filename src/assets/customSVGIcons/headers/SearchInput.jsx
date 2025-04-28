import React from "react";
import { TextField, InputAdornment, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search Customer"

      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Box
              sx={{
                backgroundColor: "#F3F4F6",
                borderRadius: "4px",
                padding: "2px 6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 500, color: "#374151", fontSize: "12px" }}
              >
                Ctrl + K
              </Typography>
            </Box>
          </InputAdornment>
        ),
      }}
      sx={{
        width: "220px",
        height: '39.97px',
        "& .MuiOutlinedInput-root": {
          borderRadius: "4.326px solid  rgba(0, 0, 0, 0.23) ", // Rounded corners
        },
        "& .MuiOutlinedInput-input::placeholder": {
          color: "rgba(0, 0, 0, 0.38)",
        
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px",
          letterSpacing: "0.15px",
          opacity: 1, // Ensures visibility in some browsers
        },
        flexDirection:'row',
        paddingLeft: '10.32px',
      }}

    />
  );
};

export default SearchInput;
