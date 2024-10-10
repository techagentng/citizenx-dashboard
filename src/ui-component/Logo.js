// material-ui
// import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    // const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Berry" width="100" />
         *
         */
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.0800781" width="64" height="63.8398" fill="url(#pattern0_4188_12771)" />
            <defs>
                <pattern id="pattern0_4188_12771" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_4188_12771" transform="matrix(0.00775194 0 0 0.00777139 0 -0.00125478)" />
                </pattern>
                <image
                    id="image0_4188_12771"
                    width="129"
                    height="129"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default Logo;
