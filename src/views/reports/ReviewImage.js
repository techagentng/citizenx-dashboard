import PropTypes from 'prop-types';

// material-ui
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

// project imports
// import AudioPlayer from 'material-ui-audio-player';
const ReviewImage = ({ openImage, handleCloseImageDialog }) => {
    // handle star rating
    return (
        <Dialog
            open={openImage}
            onClose={handleCloseImageDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    '&>div': {
                        maxWidth: 400
                    }
                }
            }}
        >
            {openImage && (
                <>
                    <DialogTitle>Image preview</DialogTitle>
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

ReviewImage.propTypes = {
    open: PropTypes.bool,
    handleCloseImageDialog: PropTypes.func
};

export default ReviewImage;
