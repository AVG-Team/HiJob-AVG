import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextFieldColor = styled(TextField)({
    '& label.Mui-focused': {
        color: '#00a9ff',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#00a9ff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#00a9ff',
        },
    },
});

// eslint-disable-next-line react/prop-types
function CustomInput({ label, ...props }) {
    return <TextFieldColor label={label} {...props} />;
}

export default CustomInput;
