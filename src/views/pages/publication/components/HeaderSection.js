import { Container, Grid, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

import FormControl from 'ui-component/extended/Form/FormControl';

// import iconFlag from 'assets/images/i18n/china.svg'
import Chip from 'ui-component/extended/Chip';

const HeaderSection = () => {
    
    const chips = [
        {id: 1, name: 'Citizen Engagement'},
        {id: 2, name: 'Governance'},
        {id: 3, name: 'Digital Media'},
        {id: 4, name: 'Community Development'}
    ]

    const headerSX = { 
        fontSize: { xs: '2rem', sm: '2.5rem', md: '2.5rem', lg: '2.5rem' }, 
    };

  return (
    <>
        <Container>
            <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
                >
                    <Grid item xs={12}>
                    <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                            >
                                <Stack spacing={1}>
                                    <Typography textAlign={{ xs: 'center'}} variant="h1" sx={headerSX}>
                                        Publication
                                    </Typography>
                                    <Typography
                                    textAlign={{ xs: 'center' }}
                                    color="text.primary"
                                    variant="body1"
                                    sx={{ fontSize: { xs: '0.8rem', md: '1rem' }}}
                                >
                                    Citizen X Nigeria was founded with the belief that every citizen deserves.
                                </Typography>

                                </Stack>
                            </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                        <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                            >
                                <Stack spacing={3}>
                                    <FormControl  placeholder="Search Publication" />
                                   
                                   < Stack direction='row' justifyContent='center' spacing={2} >
                                        {chips.map((data, index)=>{
                                            return(
                                                <Chip key={index} label={data.name} chipcolor="secondary"  />
                                            );
                                        })}
                                   </Stack>
                                </Stack>
                            </motion.div>
                    </Grid>

            </Grid>
        </Container>
    </>
  )
}

export default HeaderSection