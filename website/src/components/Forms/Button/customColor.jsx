import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)({
    backgroundColor: '#00a9ff',
    '&:hover': {
        backgroundColor: '#0087cc',
    },
});

// eslint-disable-next-line react/prop-types
function CustomButton({ children, ...props }) {
    return <ColorButton {...props}>{children}</ColorButton>;
}

export default CustomButton;
