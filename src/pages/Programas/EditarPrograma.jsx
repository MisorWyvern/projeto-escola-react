import {
	Box,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BotaoVoltar from "../../components/BotaoVoltar";
import httpService from "../../services/httpService";
import "./index.css";

function EditarPrograma() {
	const [programa, setPrograma] = useState({
		id: 0,
		nome: "",
		dataInicio: "",
		dataTermino: "",
	});
	const [titulo, setTitulo] = useState("Titulo");
	const { idPrograma } = useParams();
	const [openSnack, setOpenSnack] = useState(false);
	const [snackMessage, setSnackMessage] = useState("");
	const [snackSeverity, setSnackSeverity] = useState("success");

	useEffect(() => {
		httpService
			.get(`programa/${idPrograma}`)
			.then(({ data }) => {
				setPrograma(data);
				setTitulo(data.nome);
			})
			.catch((error) => {
				console.error(error.message);
			});
	}, [idPrograma]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			programa.nome === "" ||
			programa.nome.length > 50 ||
			programa.dataInicio === "" ||
			programa.dataTermino === "" ||
			programa.dataTermino < programa.dataInicio
		) {
			setSnackSeverity("warning");
			setSnackMessage("Informe um Nome com no máximo 50 caracteres e Data de Término mais recente que o seu Início...")
			setOpenSnack(true);
			return;
		}

		httpService
			.put(`programa/${programa.id}`, programa)
			.then((response) => {
				setSnackSeverity("success");
				setSnackMessage(response.status + " - Programa editado com sucesso!");
				setOpenSnack(true);
				setTitulo(programa.nome);
			})
			.catch((error) => {
				setSnackSeverity("error");
				setSnackMessage(error.message);
				setOpenSnack(true);
			});
	};

	return (
		<Box component="section">
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={openSnack}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={snackSeverity}>
					{snackMessage}
				</Alert>
			</Snackbar>
			<Link to="/programas">
				<BotaoVoltar />
			</Link>

			<Container maxWidth="sm">
				<Typography align="center" style={{ marginTop: 16 }} component="h3" variant="h4">
					Editar Programa "{titulo}"
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
							Editar Programa
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default EditarPrograma;
