import { Box, Typography } from '@mui/material'
import React from 'react'

const Trial = () => {
  return (
    <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
    </Box>
  )
}

export default Trial