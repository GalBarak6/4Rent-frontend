import * as React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'

export const SendBtn = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<SendIcon />} type="submit" style={{ background: '#e61e4d' }}>
                Add review
            </Button>
        </Stack>
    )
}

