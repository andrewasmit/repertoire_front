import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import React from "react";

function Confirmation({ confirmDialog, setConfirmDialog, onConfirm }){


    return(
        <Dialog open = {confirmDialog.isOpen}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">{confirmDialog.title}</Typography>
                <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={()=>setConfirmDialog({...confirmDialog, isOpen:false})}>NO</Button>
                <Button variant="contained" onClick={onConfirm}>YES</Button>
            </DialogActions>
        </Dialog>
    )
};

export default Confirmation;