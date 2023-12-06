import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import BranchContext from '../../branch/BranchContext';
import BranchDelete from '../../branch/BranchDelete';
import BranchForm from '../../branch/BranchForm';


const colorPalette = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', "#ffd700", "#4caf50", "#ff69b4"];



export default function BranchCard(id, name, address, city, phone) {
    
    const { t } = useTranslation("lang");
    
    const selectedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];    

    return (
        <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140, backgroundColor: selectedColor }}
                title="color-background"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {phone}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton id={'editar-sucursal-${id}'} color="inherit" onClick={(event)=>handleOpenForm(event, id)}>                    
                    <EditIcon/>
                </IconButton>
                <IconButton id={'eliminar-sucursal-${id}'} color="error" onClick={(event)=>handleOpenDelete(event, id)}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
            </Card>
        </Grid>
    );
}