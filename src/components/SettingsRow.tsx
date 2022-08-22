import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, TextField } from "@mui/material";
import React from "react";


function SettingRowString(props: { settingName: string, settingValue: string, updateValue: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [newValue, setNewValue] = React.useState(props.settingValue);

  function openDialog() {
    setOpen(true);
  };
  function closeDialog() {
    setOpen(false);
  };
  function saveDialog() {
    props.updateValue(newValue);
    closeDialog();
  };
  function updateNewValue(event: React.ChangeEvent<HTMLInputElement>) {
    setNewValue(event.target.value);
  }
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={openDialog}>
        <TableCell component="th" scope="row">{props.settingName}</TableCell>
        <TableCell align="right">{props.settingValue !== '' ? props.settingValue : 'N/A'}</TableCell>
      </TableRow>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Change {props.settingName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Value"
            type="string"
            fullWidth
            variant="standard"
            defaultValue={props.settingValue}
            onChange={updateNewValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={saveDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SettingRowString;