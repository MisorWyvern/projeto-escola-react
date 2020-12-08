import { Box, Snackbar } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

function AdicionarProgramas() {
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");
    const [openSnack, setOpenSnack] = useState(false);

    const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
	};
	

	return (
    <Box>
        <Switch>
            <Route>
            <Snackbar
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
						fullWidth
						open={openSnack}
						autoHideDuration={6000}
						onClose={handleClose}
					>
						<Alert onClose={handleClose} severity={snackSeverity}>
							{snackMessage}
						</Alert>
					</Snackbar>
            </Route>
        </Switch>
    </Box>
    );
}

export default AdicionarProgramas;
