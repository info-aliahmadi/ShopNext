// material-ui
import { styled, useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

// ==============================|| Loader ||============================== //

const Loader = () => {
  const theme = useTheme();
  return (
    <LoaderWrapper theme={theme}>
      <LinearProgress color="primary" />
    </LoaderWrapper>
  );
};

export default Loader;
