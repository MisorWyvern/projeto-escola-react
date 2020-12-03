import { useEffect, useState } from "react";
import {
	Link,
	Route,
	Switch,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import httpService from "../../services/httpService";
import {
	Box,
	Typography,
	TextField,
	Select,
	MenuItem,
	Container,
	Grid,
	Button,
	Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function EditarAluno() {
	const [aluno, setAluno] = useState({
		id: 0,
		nome: "",
		cpf: "",
		idPrograma: 0,
		nomePrograma: "",
	});
	const [titulo, setTitulo] = useState("");
	const [programas, setProgramas] = useState([]);
	const [openSnack, setOpenSnack] = useState(false);
	const [snackMessage, setSnackMessage] = useState("");
	const [snackSeverity, setSnackSeverity] = useState("success");
	let match = useRouteMatch();
	const { idAluno } = useParams();

	useEffect(() => {
		httpService
			.get("programa")
			.then(({ data }) => {
				setProgramas(data);
			})
			.catch((error) => {
				console.error(error.message);
			});
	}, []);

	useEffect(() => {
		httpService
			.get(`aluno/${idAluno}`)
			.then(({ data }) => {
				setAluno(data);
				setTitulo(data.nome);
			})
			.catch((error) => {
				console.error(error.message);
			});
	}, [idAluno]);
	
	console.log(titulo);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (aluno.nome === "" || aluno.cpf === "" || aluno.idPrograma === "") {
			return;
		}

		console.log(aluno);
		httpService
			.put(`/aluno/${aluno.id}`, {
				nome: aluno.nome,
				cpf: aluno.cpf,
				idPrograma: aluno.idPrograma,
			})
			.then((response) => {
				setSnackSeverity("success");
				setSnackMessage(response.status + " - Aluno editado com sucesso!");
				setOpenSnack(true);
			})
			.catch((error) => {
				setSnackSeverity("error");
				setSnackMessage(error.message);
				setOpenSnack(true);
			});
	};
	return (
		<Box>
			<Switch>
				<Route exact path={`${match.path}`}>
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
					<Link to="/alunos">
						<Typography component="body1" variant="h5">
							Voltar
						</Typography>
					</Link>
					<Typography component="h3" variant="h4" align="center">
						Editar Aluno "{titulo}"
					</Typography>

					<Container maxWidth="sm">
						<form action="" onSubmit={handleSubmit}>
							<TextField
								required
								variant="outlined"
								margin="normal"
								fullWidth
								value={aluno.nome}
								onChange={(event) => {
									setAluno({ ...aluno, nome: event.target.value });
								}}
								type="text"
								label="Nome do Aluno"
							/>
							<TextField
								required
								variant="outlined"
								margin="normal"
								fullWidth
								value={aluno.cpf}
								label="CPF"
								onChange={(event) => {
									setAluno({ ...aluno, cpf: event.target.value });
								}}
							/>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Select
										fullWidth
										required
										displayEmpty={true}
										variant="outlined"
										value={aluno.idPrograma}
										onChange={(event) => {
											setAluno({ ...aluno, idPrograma: event.target.value });
										}}
									>
										<MenuItem value="">Escolha um Programa</MenuItem>
										{programas.map((prog) => {
											return (
												<MenuItem key={prog.id} value={prog.id}>
													{prog.nome}
												</MenuItem>
											);
										})}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<Button
										style={{ padding: 16 }}
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
									>
										Editar Aluno
									</Button>
								</Grid>
							</Grid>
						</form>
					</Container>
				</Route>
			</Switch>
		</Box>
	);
}

export default EditarAluno;
