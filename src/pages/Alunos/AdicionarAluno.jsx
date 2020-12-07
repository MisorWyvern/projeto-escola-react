import { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
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
import BotaoVoltar from "../../components/BotaoVoltar";

function AdicionarAluno() {
	const [nomeAluno, setNomeAluno] = useState("");
	const [cpf, setCpf] = useState("");
	const [programas, setProgramas] = useState([]);
	const [idPrograma, setIdPrograma] = useState("");
	const [openSnack, setOpenSnack] = useState(false);
	const [snackMessage, setSnackMessage] = useState("");
	const [snackSeverity, setSnackSeverity] = useState("success");
	const cpfRegex = new RegExp("[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}");
	let match = useRouteMatch();
	

	useEffect(() => {
		httpService
			.get("/programa")
			.then(({ data }) => {
				setProgramas(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (nomeAluno === "" || cpf === "" || idPrograma === "") {
			return;
		}

		if(!(cpfRegex.test(cpf))){
			return;
		}

		httpService
			.post("/aluno", {
				nome: nomeAluno,
				cpf: cpf,
				idPrograma: idPrograma,
			})
			.then((response) => {
				setSnackSeverity("success");
				setSnackMessage(response.status + " - Aluno criado com sucesso!");
				setOpenSnack(true);
				setNomeAluno("");
				setCpf("");
				setIdPrograma("");
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
						<BotaoVoltar/>
					</Link>
					<Typography component="h3" variant="h4" align="center">
						Adicionar um novo Aluno
					</Typography>

					<Container maxWidth="sm">
						<form action="" onSubmit={handleSubmit}>
							<TextField
								required
								variant="outlined"
								margin="normal"
								fullWidth
								value={nomeAluno}
								onChange={(event) => {
									setNomeAluno(event.target.value);
								}}
								type="text"
								label="Nome do Aluno"
							/>
							<TextField
							
								required
								variant="outlined"
								margin="normal"
								fullWidth
								value={cpf}
								label="CPF"
								placeholder="Ex: 000.000.000-00"
								onChange={(event) => {
									setCpf(event.target.value);
								}}
							/>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Select
										fullWidth
										required
										displayEmpty={true}
										variant="outlined"
										value={idPrograma}
										onChange={(event) => {
											setIdPrograma(event.target.value);
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
										Criar Aluno
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

export default AdicionarAluno;
