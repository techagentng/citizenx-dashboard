import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { HOME_PATH } from 'config';
// import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link
        component={RouterLink}
        to={HOME_PATH}
        aria-label="berry logo"
        sx={{ display: 'flex', alignItems: 'space-between', textDecoration: 'none' }}
    >
        {/* <h2>Citizen</h2>  */}
       
    </Link>
);

export default LogoSection;
