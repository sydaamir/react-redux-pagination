import React from "react";

// masterial ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Modal = ({
  open,
  handleModalState,
  handleInput,
  data,
  handleADDRow,
  handleRowDelete,
  formValdaition: { isNameValid, isEmailValid },
}) => {
  // console.log("demo modal", isEmailValid);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleModalState(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {data.Id > 0 ? "update" : "Add"} Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Valid Email.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="name"
            required
            fullWidth
            value={data["name"]}
            onChange={(e) => handleInput(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            required
            error={isEmailValid}
            fullWidth
            value={data["email"]}
            onChange={(e) => handleInput(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone NO"
            name="phone"
            type="number"
            fullWidth
            value={data["phone"]}
            onChange={(e) => handleInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalState(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleADDRow()} color="primary">
            {data.Id > 0 ? "update" : "Add"}
          </Button>
          {/* <Button onClick={() => handleRowDelete(data.Id)} color="primary">
            delete
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
