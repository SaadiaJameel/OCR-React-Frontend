import { IconButton, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyToClipboard = ({text}) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(text)
    }
    
    return (
        <>
          <IconButton size='small' sx={{p:0, mx:1}} onClick={handleClick}><ContentCopyIcon fontSize='small'/></IconButton>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboard;