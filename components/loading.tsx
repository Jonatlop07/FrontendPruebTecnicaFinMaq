import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <h2>Buscando...</h2>
    </Box>
  );
}

export default Loading
