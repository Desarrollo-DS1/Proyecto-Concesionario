import {useContext} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Divider, Grid, IconButton, Stack, darken} from "@mui/material";
import propTypes from "prop-types";
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';

import BranchContext from "../../hooks/branch/BranchContext";

const colorPalette = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', "#ffd700", "#4caf50", "#ff69b4"];

BranchCard.propTypes = {
    id: propTypes.number,
    name: propTypes.string,
    address: propTypes.string,
    city: propTypes.string,
    phone: propTypes.string,
}

const getColor = (id) => {
    if (id < colorPalette.length) {
        return colorPalette[id];
    }
    return colorPalette[id % colorPalette.length];
}

export default function BranchCard({id, name, address, city, phone, ...other}) {

    const { t } = useTranslation("lang");
    
    const selectedColor = getColor(id);

    const {
        handleOpenForm,
        handleOpenDelete} = useContext(BranchContext);

    return (
        <Grid item xs={12} sm={3} >
            <Card sx={{ maxWidth: 345, minWidth: 100 }}>
            <CardMedia
                sx={{ height: 140, backgroundColor: selectedColor}}
                title="color-background"

            >
                <WarehouseRoundedIcon sx={{ width: "100%", height: "100%", color: darken(selectedColor, 0.3)}}/>

            </CardMedia>
            <CardContent>
                <Stack direction={"row"} justifyContent={"space-between"} >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {city}
                    </Typography>
                </Stack>
                <Stack>
                    <Typography variant="body2" color="text.secondary">
                        {address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {phone}
                    </Typography>
                </Stack>

            </CardContent>
                <Divider/>
            <CardActions>
                <IconButton id={`editar-sucursal-${id}`} color="inherit" onClick={(event)=>handleOpenForm(event, id)}>
                    <EditIcon/>
                </IconButton>
                <IconButton id={`eliminar-sucursal-${id}`} color="error" onClick={(event)=>handleOpenDelete(event, id)}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
            </Card>
        </Grid>
    );
}