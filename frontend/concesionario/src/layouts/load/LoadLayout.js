import { Outlet } from 'react-router-dom';
// @mui
import {Avatar, Box, CircularProgress} from "@mui/material";
// components
import {Skeleton} from "@mui/lab";

// ----------------------------------------------------------------------

export default function LoadLayout() {
    return (
        <>
            {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}> */}
            {/*    <Box sx={{ width: '20%', height: '100%', padding: '16px' }}> */}
            {/*        <Skeleton variant="rounded" width={'100%'} height={'10%'} /> */}
            {/*            <Box sx={{width: '100%', height: '10%', padding: '5px', display: 'flex', px: '1px'}}> */}
            {/*                <Box sx={{width: '25%', height: '100%'}}  mr={2}> */}
            {/*                    <Skeleton variant="circular" width={'100%'} height={'100%'} > */}
            {/*                        <Avatar /> */}
            {/*                    </Skeleton> */}
            {/*                </Box> */}
            {/*                <Box sx={{width: '75%', height: '100%'}}> */}
            {/*                    <Skeleton variant="text" width={'100%'} height={'100%'}/> */}
            {/*                </Box> */}
            {/*            </Box> */}
            {/*        <Skeleton variant="rounded" width={'100%'} height={'80%'} /> */}
            {/*    </Box> */}
            {/*    <Box sx={{ width: '80%', height: '100%', padding: '16px' }}> */}
            {/*        <Skeleton variant="rounded" width={'100%'} height={'10%'} /> */}
            {/*        <Box sx={{width: '100%', height: '88%'}} mt={2}> */}
            {/*            <Skeleton variant="rounded" width={'100%'} height={'100%'} /> */}
            {/*        </Box> */}

            {/*    </Box> */}
            {/* </Box> */}

            <Outlet/>
        </>
    );
}