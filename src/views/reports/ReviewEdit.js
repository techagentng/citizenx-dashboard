import PropTypes from 'prop-types'

// material-ui
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

// project imports
// import AudioPlayer from 'material-ui-audio-player';
const ReviewEdit = ({ open, handleCloseDialog }) => {
    // handle star rating
    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    '&>div': {
                        maxWidth: 400
                    }
                }
            }}
        >
            {open && (
                <>
                    <DialogTitle>Voice record</DialogTitle>
                    <DialogContent>
                    {/* <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /> */}
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
};

ReviewEdit.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ReviewEdit;
