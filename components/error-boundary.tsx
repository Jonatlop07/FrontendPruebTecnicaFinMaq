'use client';

import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#08052f',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Modal
      role={'alert'}
      open={open}
      onClose={resetErrorBoundary}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Ocurrió un error:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {error}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={resetErrorBoundary}
          style={{ marginTop: '2rem' }}
        >
          Inténtalo de nuevo
        </Button>
      </Box>
    </Modal>
  )
}

export default ErrorFallback;
