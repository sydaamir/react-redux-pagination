import React, { useState } from "react";

// material ui
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TablePaginationActions from "./paigination";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

// modal
import Modal from "./modal";

// icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// hooks
import { useSelector, useDispatch } from "react-redux";

// actions
import { addData, deleteData, updateData } from "../store/crud";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fafafa",
    color: "gray",
    fontWeight: 600,
    letterSpacing: 1.5,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

function createData(name, email, phone, createdAt) {
  const dateInstance = new Date();
  const date = dateInstance.getDate();
  const month = dateInstance.getMonth() + 1;
  const year = dateInstance.getFullYear();
  return { Id: 0, name, email, phone, createdAt: `${date}/${month}/${year}` };
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const CrudTable = () => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //   hooks
  const tableData = useSelector((state) => state.CRUD);
  const Dispatch = useDispatch();

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // modal
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(createData("", "", ""));
  const [formValdaition, setFormValdaition] = useState({
    isNameValid: false,
    isEmailValid: false,
  });

  // console.log("demo", tableData);

  const handleModalState = (isOpen, row, isUpdate) => {
    if (isUpdate) {
      setOpen(isOpen);
      setModalState(row);
    } else {
      setModalState(createData("", "", ""));
      setOpen(isOpen);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name == "email") {
      let emailPattern = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
      const isEmailValid = emailPattern.test(value);
      setFormValdaition((prev) => ({
        ...prev,
        isEmailValid: !isEmailValid,
      }));
      setModalState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name == "name") {
      let namePattern = new RegExp("^[a-zA-Z]+$");
      const isnameValid = namePattern.test(value);
      if (!isnameValid) {
        return false;
      } else {
        setModalState((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setModalState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // add
  const handleADDRow = () => {
    if (formValdaition.isEmailValid == true || modalState.email.length <= 0)
      return false;
    if (modalState.Id > 0) {
      Dispatch(updateData(modalState));
      setTimeout(() => {
        setOpen(false);
      }, 200);
    } else {
      Dispatch(addData(modalState));
      setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  //   delete
  const handleRowDelete = () => {
    // console.log('modalstate',modalState.Id);
    Dispatch(deleteData(modalState.Id));
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div style={{ height: "inherit" }}>
      {/* modal */}
      <Modal
        open={open}
        handleInput={handleInput}
        handleModalState={handleModalState}
        handleADDRow={handleADDRow}
        data={modalState}
        formValdaition={formValdaition}
        handleRowDelete={handleRowDelete}
      />
      {/* modal */}

      {/* add button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => handleModalState(true)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      {/* add button */}

      {/* table */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone NO</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }}>{row.email}</TableCell>
                <TableCell style={{ width: 160 }}>{row.phone}</TableCell>
                <TableCell style={{ width: 160 }}>{row.createdAt}</TableCell>
                <TableCell
                  style={{ width: 160, color:'blue', cursor:'pointer' }}
                  onClick={() => handleModalState(true, row, true)}
                >
                  View
                </TableCell>
                <TableCell
                  style={{ width: 160 }}
                  // onClick={() => handleModalState(true, row, true)}
                >
                  
                  <Button onClick={ () => { Dispatch(deleteData(row.Id))}} color="primary">
                    <DeleteSharpIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* table */}
    </div>
  );
};

export default CrudTable;
