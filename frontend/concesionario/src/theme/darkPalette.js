import {alpha} from "@mui/material/styles";

const mode = 'dark';

const GREY_DARK = {
    0: '#000000',         // Fondo más oscuro
    100: '#161C24',
    200: '#212B36',
    300: '#454F5B',
    400: '#637381',
    500: '#919EAB',
    600: '#C4CDD5',
    700: '#DFE3E8',
    800: '#F4F6F8',
    900: '#F9FAFB',        // Fondo más claro
};

const PRIMARY_DARK = {
    lighter: '#103996',
    light: '#061B64',
    main: '#2065D1',
    dark: '#76B0F1',
    darker: '#2065D1',
    contrastText: '#fff',
};

const SECONDARY_DARK = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
};

const INFO_DARK = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
};

const SUCCESS_DARK = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY_DARK[800],
};

const WARNING_DARK = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY_DARK[800],
};

const ERROR_DARK = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
};

const darkPalette = {
    common: { black: '#fff', white: '#000' }, // Invertir colores comunes
    primary: PRIMARY_DARK,
    secondary: SECONDARY_DARK,
    info: INFO_DARK,
    success: SUCCESS_DARK,
    warning: WARNING_DARK,
    error: ERROR_DARK,
    grey: GREY_DARK,
    divider: alpha(GREY_DARK[500], 0.24),
    text: {
        primary: '#FBF2FF',    // Texto principal más claro
        secondary: '#969199',  // Texto secundario más claro
        disabled: '#B0AAB3',   // Texto deshabilitado más claro
    },
    background: {
        paper: "#181A1F",
        default: "#0A0B0D",
        neutral: "#14151A",
        backdrop: 'rgba(33, 49, 64, 0.4)'
    },
    action: {
        active: GREY_DARK[400],     // Acción activa más clara
        hover: alpha(GREY_DARK[500], 0.08),
        selected: alpha(GREY_DARK[500], 0.16),
        disabled: alpha(GREY_DARK[500], 0.8),
        disabledBackground: alpha('#969199', 0.24),
        focus: alpha(GREY_DARK[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
};

export default darkPalette;
