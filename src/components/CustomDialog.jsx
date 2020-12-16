import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

function CustomDialog({ open, onClose, title, bodyText, onClickYes, onClickNo }) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{title !== undefined ? title : ""}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{bodyText !== undefined ? bodyText : ""}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClickYes !== undefined ? onClickNo : () => {}} color="primary" autoFocus variant="contained">
					Sim
				</Button>
				<Button onClick={onClickNo !== undefined ? onClickNo : () => {}} color="secondary" variant="contained" >
					Não
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CustomDialog;
