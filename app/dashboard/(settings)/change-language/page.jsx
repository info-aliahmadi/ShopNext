'use client';
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
import ChangeLanguageForm from '../_components/ChangeLanguageForm';
import MainCard from '@dashboard/_components/MainCard';

// ===============================|| COLOR BOX ||=============================== //

function ChangeLanguage() {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={6} lg={6} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.language')}</Typography>
          </Grid>
          <Grid item>
            <MainCard>
              <ChangeLanguageForm />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ChangeLanguage;
