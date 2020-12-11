import {
	Box,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import BotaoVoltar from "../../components/BotaoVoltar";
import { useState } from "react";
import httpService from "../../services/httpService";

function AdicionarProgramas({ onAction }) {
	const [snack, setSnack] = useState({
		message: "",
		severity: "success",
		open: false,
	});
	const [programa, setPrograma] = useState({
		nome: "",
		dataInicio: "2020-01-01",
		dataTermino: "2020-02-02",
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnack({ ...snack, open: false });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(programa);
		if (
			programa.nome === "" ||
			programa.nome.length > 50 ||
			programa.dataInicio === "" ||
			programa.dataTermino === "" ||
			programa.dataTermino < programa.dataInicio
		) {
			console.log("Barrado");
			setSnack({
				...snack,
				severity: "warning",
				message:
					"Informe um Nome com no máximo 50 caracteres e Data de Término mais recente que o seu Início...",
				open: true,
			});
			return;
		}

		httpService
			.post("programa", programa)
			.then((response) => {
				setSnack({
					...snack,
					severity: "success",
					message: response.status + " - Programa criado com sucesso!",
					open: true,
				});
				setPrograma({ ...programa, nome: "" });
			})
			.catch((error) => {
				setSnack({
					...snack,
					severity: "error",
					message: error.message,
					open: true,
				});
			});
	};

	return (
		<Box>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				fullWidth
				open={snack.open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={snack.severity}>
					{snack.message}
				</Alert>
			</Snackbar>

			<Link to="/programas">
				<BotaoVoltar onClick={() => onAction()} />
			</Link>

			<Container maxWidth="sm">
				<Typography
					align="center"
					style={{ marginTop: 16 }}
					component="h3"
					variant="h4"
				>
					Adicionar Programa
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							required
							variant="outlined"
							margin="normal"
							fullWidth
							value={programa.nome}
							label="Nome do Programa"
							type="text"
							onChange={(event) => {
								setPrograma({ ...programa, nome: event.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							variant="outlined"
							margin="normal"
							fullWidth
							value={programa.dataInicio}
							label="Data de Início"
							type="date"
							onChange={(event) => {
								setPrograma({ ...programa, dataInicio: event.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							variant="outlined"
							margin="normal"
							fullWidth
							value={programa.dataTermino}
							label="Data de Término"
							type="date"
							onChange={(event) => {
								setPrograma({ ...programa, dataTermino: event.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							style={{ padding: 16 }}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Adicionar Programa
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default AdicionarProgramas;
