import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

const ColorButton = styled(Button)({
    backgroundColor: '#00a9ff',
    '&:hover': {
        backgroundColor: '#0087cc',
    },
});

const ColorButtonLoading = styled(LoadingButton)({
    backgroundColor: '#00a9ff',
    '&:hover': {
        backgroundColor: '#0087cc',
    },
});

// eslint-disable-next-line react/prop-types
function CustomButton({ children, ...props }) {
    return <ColorButton {...props}>{children}</ColorButton>;
}

// eslint-disable-next-line react/prop-types
export function CustomLoadingButton({ children, ...props }) {
    return <ColorButtonLoading {...props}>{children}</ColorButtonLoading>;
}

export default CustomButton;
