import PropTypes from 'prop-types';

// material-ui
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

// project imports
// import AudioPlayer from 'material-ui-audio-player';
const ReviewVideo = ({ openVideo, handleCloseVideoDialog }) => {
    // handle star rating
    return (
        <Dialog
            open={openVideo}
            onClose={handleCloseVideoDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    '&>div': {
                        maxWidth: 400
                    }
                }
            }}
        >
            {openVideo && (
                <>
                    <DialogTitle>Voice record</DialogTitle>
                    <DialogContent>
                        <video width="600" controls>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                            <track
                                kind="captions"
                                srcLang="en"
                                src="https://example.com/path/to/your/captions.vtt"
                                label="English"
                                default
                            />
                            Your browser does not support the video tag.
                        </video>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
};

ReviewVideo.propTypes = {
    open: PropTypes.bool,
    handleCloseVideoDialog: PropTypes.func
};

export default ReviewVideo;
