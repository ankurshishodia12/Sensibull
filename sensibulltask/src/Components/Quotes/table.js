import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import moment from 'moment';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function BasicTable(props) {
  const { quotesList } = props;

  return (
    <TableContainer style={{ maxHeight: '500px', overflowY: 'scroll' }} component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: '#8cd87c' }}>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell >Price</StyledTableCell>
            <StyledTableCell >Time</StyledTableCell>
            <StyledTableCell >Valid Till</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {quotesList.length > 0 ? quotesList.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell >&#8377;{(row.price).toFixed(2)}</StyledTableCell>
              <StyledTableCell >{moment.utc(row.time).local().format("DD-MM-YYYY HH:mm:ss")}</StyledTableCell>
              <StyledTableCell >{moment.utc(row.valid_till).local().format("DD-MM-YYYY HH:mm:ss")}</StyledTableCell>
            </StyledTableRow>
          )) :

            <StyledTableRow>
              <StyledTableCell colSpan={14} style={{ textAlign: 'center', fontSize: 16 }}>No Data to show!</StyledTableCell>
            </StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
