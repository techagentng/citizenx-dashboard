import { sum } from 'lodash';
// import { Link } from 'react-router-dom';
import { useSelector } from 'store';

// material-ui
import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';

// assets
// import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import coinimg from './coin.png';

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {}
}));

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingCart = () => {
    // const theme = useTheme();
    const cart = useSelector((state) => state.cart);
    const totalQuantity = sum(cart?.checkout.products.map((item) => item.quantity));

    return (
        <Box sx={{mr:2, ml:2}}>
            <StyledBadge showZero badgeContent={totalQuantity} color="error">
                <img src={coinimg} alt="coin" style={{ width: 24, height: 24 }} />
            </StyledBadge>
        </Box>
    );
};

export default FloatingCart;
