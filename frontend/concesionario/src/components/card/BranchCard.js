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



export default function BranchCard(name, address, city, phone) {
    
    const { t } = useTranslation("lang");

    return (
        <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
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
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
            </Card>
        </Grid>
    );
}