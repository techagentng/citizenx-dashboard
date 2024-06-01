// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Grid } from '@mui/material';

// // project-import
// import MainCard from 'ui-component/cards/MainCard';
// import MapContainerStyled from 'ui-component/third-party/map/MapContainerStyled';

// import ClustersMap from './maps/clusters-map';
// import ChangeTheme from './maps/change-theme';
// import DraggableMarker from './maps/draggable-marker';
// import GeoJSONAnimation from './maps/GeoJSONAnimation';
// import Heatmap from './maps/heatmap';
// import HighlightByFilter from './maps/HighlightByFilter';
// import InteractionMap from './maps/interaction-map';
// import MarkersPopups from './maps/MarkersPopups';
// import SideBySide from './maps/side-by-side';
// import ViewportAnimation from './maps/viewport-animation';

// import { cities, countries } from 'data/location';

// const MAPBOX_THEMES = {
//     light: 'mapbox://styles/mapbox/light-v10',
//     dark: 'mapbox://styles/mapbox/dark-v10',
//     streets: 'mapbox://styles/mapbox/streets-v11',
//     outdoors: 'mapbox://styles/mapbox/outdoors-v11',
//     satellite: 'mapbox://styles/mapbox/satellite-v9',
//     satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11'
// };

// const mapConfiguration = {
//     mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
//     minZoom: 1
// };

// // ==============================|| MAP ||============================== //

// const Map = () => {
//     const theme = useTheme();

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12}>
//                 <MainCard title="Theme Variants">
//                     <MapContainerStyled>
//                         <ChangeTheme {...mapConfiguration} themes={MAPBOX_THEMES} />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <MainCard title="Markers & Popups">
//                     <MapContainerStyled>
//                         <MarkersPopups
//                             {...mapConfiguration}
//                             data={countries}
//                             mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <MainCard title="Draggable Marker">
//                     <MapContainerStyled>
//                         <DraggableMarker
//                             {...mapConfiguration}
//                             mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12}>
//                 <MainCard title="Geo JSON Animation">
//                     <MapContainerStyled>
//                         <GeoJSONAnimation {...mapConfiguration} mapStyle={MAPBOX_THEMES.satelliteStreets} />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12}>
//                 <MainCard title="Clusters">
//                     <MapContainerStyled>
//                         <ClustersMap
//                             {...mapConfiguration}
//                             mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12}>
//                 <MainCard title="Interaction">
//                     <MapContainerStyled>
//                         <InteractionMap
//                             {...mapConfiguration}
//                             mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12}>
//                 <MainCard title="Viewport Animation">
//                     <MapContainerStyled>
//                         <ViewportAnimation
//                             {...mapConfiguration}
//                             data={cities.filter((city) => city.state === 'Gujarat')}
//                             mapStyle={MAPBOX_THEMES.outdoors}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <MainCard title="Highlight By Filter">
//                     <MapContainerStyled>
//                         <HighlightByFilter
//                             {...mapConfiguration}
//                             mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <MainCard title="Heatmap">
//                     <MapContainerStyled>
//                         <Heatmap
//                             {...mapConfiguration}
//                             mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
//                         />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//             <Grid item xs={12}>
//                 <MainCard title="Side By Side">
//                     <MapContainerStyled>
//                         <SideBySide {...mapConfiguration} />
//                     </MapContainerStyled>
//                 </MainCard>
//             </Grid>
//         </Grid>
//     );
// };

// export default Map;
