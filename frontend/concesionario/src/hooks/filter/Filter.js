import {filter} from "lodash";

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_item) => {
            let nombre
            if (_item.nombre === undefined){
                nombre = `${_item.primerNombre}${" "}${_item.primerApellido}` .toLowerCase();
            }
            else
            {
                nombre = _item.nombre.toLowerCase();
            }
            const queryLowercase = query.toLowerCase();
            return nombre.indexOf(queryLowercase) !== -1;});
    }
    return stabilizedThis.map((el) => el[0]);
}