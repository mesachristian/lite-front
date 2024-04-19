import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
    return(
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress />
        </Box>
    );
}

export default LoadingComponent;