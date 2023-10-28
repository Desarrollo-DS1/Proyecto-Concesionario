import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import EmployeeContext from "../../../hooks/employee/EmployeeContext";

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export default function ListHead(props) {

  const {
    TABLE_HEAD,
    order,
    orderBy,
    handleRequestSort,
  }= useContext(props.context);

  const { t, i18n } = useTranslation("lang");

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <div> </div>
        </TableCell>
        {TABLE_HEAD.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
