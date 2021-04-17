import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Button, Box } from '@material-ui/core'

const PaginationControls = ({ children, prevPage, nextPage, page }) => {
  return (
    <Box display='flex' justifyContent='space-between' my='2rem'>
      <Button
        onClick={prevPage}
        disabled={page === 0}
        variant='contained'
        color='primary'
        startIcon={<ArrowBackIcon>previous</ArrowBackIcon>}
      >
        Previous
      </Button>

      {children}

      <Button
        onClick={nextPage}
        disabled={page > 0}
        variant='contained'
        color='primary'
        endIcon={<ArrowForwardIcon>previous</ArrowForwardIcon>}
      >
        Next
      </Button>
    </Box>
  )
}

export default PaginationControls
