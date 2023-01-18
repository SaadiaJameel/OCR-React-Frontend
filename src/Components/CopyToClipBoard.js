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
          <IconButton onClick={handleClick}><ContentCopyIcon/></IconButton>
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