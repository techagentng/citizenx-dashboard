import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';

// third-party
import { SnackbarProvider } from 'notistack';

// project import
import { useSelector } from 'store';

// assets
import { IconCircleCheck, IconSquareRoundedX, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
    '&.notistack-MuiContent-default': {
        backgroundColor: theme.palette.primary.main
    },
    '&.notistack-MuiContent-error': {
        backgroundColor: theme.palette.error.main
    },
    '&.notistack-MuiContent-success': {
        backgroundColor: theme.palette.success.main
    },
    '&.notistack-MuiContent-info': {
        backgroundColor: theme.palette.info.main
    },
    '&.notistack-MuiContent-warning': {
        backgroundColor: theme.palette.warning.main
    }
}));

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

const Notistack = ({ children }) => {
    const snackbar = useSelector((state) => state.snackbar);
    const iconSX = { marginRight: 8, fontSize: '1.15rem' };

    return (
        <StyledSnackbarProvider
            maxSnack={snackbar.maxStack}
            dense={snackbar.dense}
            iconVariant={
                snackbar.iconVariant === 'useemojis'
                    ? {
                          success: <IconCircleCheck style={iconSX} />,
                          error: <IconSquareRoundedX style={iconSX} />,
                          warning: <IconInfoCircle style={iconSX} />,
                          info: <IconAlertCircle style={iconSX} />
                      }
                    : undefined
            }
            // eslint-disable-next-line
            hideIconVariant={snackbar.iconVariant === 'hide' ? true : false}
        >
            {children}
        </StyledSnackbarProvider>
    );
};

Notistack.propTypes = {
    children: PropTypes.node
};

export default Notistack;
