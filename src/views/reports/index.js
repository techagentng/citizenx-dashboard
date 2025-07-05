import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import Chip from 'ui-component/extended/Chip';
import { useDispatch, useSelector } from 'store';
import { getAllReports } from 'store/slices/reports';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
// import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EarningCard from './EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
import { getAllUserCount, getAllReportsToday } from 'services/userService';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReviewEdit from './ReviewEdit';
import ReviewVideo from './ReviewVideo.js';
import ReviewImage from './ReviewImage.js';
import { deleteReport } from 'services/reportService';

const RelativeTimeCell = ({ timestamp }) => {
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });

    return <TableCell>{relativeTime}</TableCell>;
};

RelativeTimeCell.propTypes = {
    timestamp: PropTypes.number.isRequired
};

// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
    { id: 'description', numeric: false, label: 'Report', align: 'left' },
    { id: 'category', numeric: false, label: 'Report Type', align: 'left' },
    { id: 'state_name', numeric: false, label: 'State', align: 'left' },
    { id: 'lga_name', numeric: false, label: 'LGA', align: 'left' },
    { id: 'state_name', numeric: false, label: 'Date', align: 'left' },
    { id: 'state_name', numeric: false, label: 'Review Media', align: 'left' },
    // { id: 'lga_name', numeric: false, label: 'Date', align: 'left' },
    // { id: 'road_name', numeric: false, label: 'Road', align: 'left' }
];

// table header component
function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all reports' }}
                    />
                </TableCell>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// table header toolbar component
const EnhancedTableToolbar = ({ numSelected }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Incident Reports
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// main component
const IncidentReportList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('created_at');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const { report } = useSelector((state) => state.report);
    const [open, setOpen] = React.useState(false);
    const [openVideo, setOpenVideo] = React.useState(false);
    const [openImage, setOpenImage] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleClickOpenVideoDialog = () => {
        setOpenVideo(true);
    };
    React.useEffect(() => {
        dispatch(getAllReports());
    }, [dispatch]);

    React.useEffect(() => {
        setRows(report);
    }, [report]);

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;
                const properties = ['description', 'category', 'state_name', 'lga_name', 'road_name'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(productreviews);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.id);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    useEffect(() => {
        console.log('Fetching user data, report data, and online users');
        Promise.all([getAllUserCount(), getAllReportsToday()])
            .then(([userCountData, todayReportCountData]) => {
                console.log('User count:', userCountData);
                console.log('Today report count:', todayReportCountData);

                setUserCount(userCountData);
                setTodayReportCount(todayReportCountData);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [setTodayReportCount]);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleCloseImageDialog = () => {
        setOpenImage(false);
    };

    const handleCloseVideoDialog = () => {
        setOpenVideo(false);
    };

    const handleDeleteClick = (id) => {
        deleteReport(id)
            .then(() => {
                // Remove the deleted report from the rows state
                const updatedRows = rows.filter((row) => row.id !== id);
                setRows(updatedRows);
                setSelected([]);
            })
            .catch((error) => {
                console.error('Failed to delete report:', error.message);
                // Handle error scenario here (e.g., show error message)
            });
    };

    return (
        <MainCard title="Manage Reports" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={3}>
                            <EarningCard count={todayReportCount} detail="Today's Report" icon={EarningIcon} />
                        </Grid>
                        <Grid item xs={3}>
                            <EarningCard count={userCount} detail="Total Users" icon={EarningIcon} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Reports"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.id)} sx={{ pl: 3 }}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.id)}
                                            sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                                        >
                                            <Tooltip title={row.description} placement="top" arrow>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                                        maxWidth: 200,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        display: 'block'
                                                    }}
                                                >
                                                    {row.description && row.description.length > 50 ? row.description.slice(0, 50) + '…' : row.description}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.category}</TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.state_name}</TableCell>
                                        <TableCell>{row.lga_name}</TableCell>
                                        <RelativeTimeCell timestamp={row.created_at} />
                                        <TableCell align="center" sx={{ pr: 3, whiteSpace: 'nowrap' }}>
                                        <IconButton color="primary" size="large" aria-label="view" onClick={handleClickOpenDialog}>
                                                <KeyboardVoiceIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton color="primary" size="large" aria-label="view">
                                                <SlideshowIcon sx={{ fontSize: '1.3rem' }} onClick={handleClickOpenVideoDialog}/>
                                            </IconButton>
                                            <IconButton color="primary" size="large" aria-label="view">
                                                <InsertPhotoIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton color="primary" size="large" aria-label="view">
                                                <CheckIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                size="large"
                                                aria-label="delete"
                                                onClick={() => handleDeleteClick(row.id)}
                                            >
                                                <CancelIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={8} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ReviewEdit open={open} handleCloseDialog={handleCloseDialog} />
                <ReviewImage openImage={openImage} handleCloseImageDialog={handleCloseImageDialog} />
                <ReviewVideo openVideo={openVideo} handleCloseVideoDialog={handleCloseVideoDialog} />
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default IncidentReportList;
