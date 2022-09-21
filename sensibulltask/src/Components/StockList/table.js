import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { styled } from '@mui/material/styles';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    const { stockList } = props;

  return (
    <TableContainer style={{maxHeight:'500px', overflowY:'scroll'}}  component={Paper}>
      <Table stickyHeader  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'#8cd87c'}}>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell >Symbol</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Sector</StyledTableCell>
            <StyledTableCell >Valid Till</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {stockList.length > 0 ? stockList.map((row,index) => (
            <StyledTableRow
              key={row.Symbol}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell style={{color:'blue'}} >{row.Symbol}</StyledTableCell>
              <StyledTableCell >{row.Name}</StyledTableCell>
              <StyledTableCell >{row.Sector}</StyledTableCell>
              <StyledTableCell >{row.Validtill}</StyledTableCell>
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
