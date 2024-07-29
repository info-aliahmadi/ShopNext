// material-ui
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

// project import

// assets
import languageList from '/Localization/languageList';
import { useTranslation } from 'react-i18next';
import LocalizationService from '/Localization/LocalizationService';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Localization = () => {
  const theme = useTheme();
  const [t, i18n] = useTranslation();

  let currentLanguage = languageList.find((l) => l.key === i18n.language);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const changeLanguage = (lng) => {
    let locService = new LocalizationService();
    locService.setCurrentLanguage(i18n, theme, lng);
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Tooltip title="Change default language">
        <IconButton
          disableRipple
          color="secondary"
          sx={{ color: 'text.primary' }}
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <img src={currentLanguage.icon} alt={currentLanguage.name} style={{ opacity: '0.8' }} />
        </IconButton>
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languageList.map((language) => (
          <MenuItem key={language.key} onClick={() => changeLanguage(language)}>
            <img src={language.icon} alt={language.name} style={{ width: '20px', margin: '0px 5px' }} /> {language.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Localization;
