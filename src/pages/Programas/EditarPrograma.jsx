import {
	Box,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
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
	const [defaultDataInicio, setDefaultDataInicio] = useState(Date("2020-01-01"));
	const [defaultDataTermino, setDefaultDataTermino] = useState(Date("2020-01-01"));
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
				setDefaultDataInicio(data.dataInicio);
				setDefaultDataTermino(data.dataTermino);
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
        console.log(programa);
        if(programa.nome === "" || programa.dataInicio === "" || programa.dataTermino === "" || programa.dataTermino < programa.dataInicio){
            console.log("Parou aqui");
            return;
        }
    }

    const classes = {
        TituloPrincipal: {
            marginTop: 16,
        },
        BotaoSubmit: {

        }
    }

	return (
		<Box component="section">
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
			<Link to="/programas">
				<BotaoVoltar />
			</Link>

			<Container maxWidth="sm">
				<Typography style={{marginTop: 16}} component="h3" variant="h4">
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
					<Grid item xs={12} sm={4}>
						<TextField
							required
							variant="outlined"
							margin="normal"
							fullWidth
							defaultValue={defaultDataInicio}
							value={programa.dataInicio}
							label="Data de Início"
							type="date"
							onChange={(event) => {
								setPrograma({ ...programa, dataInicio: event.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							required
							variant="outlined"
							margin="normal"
							fullWidth
							defaultValue={defaultDataTermino}
							value={programa.dataTermino}
							label="Data de Término"
							type="date"
							onChange={(event) => {
								setPrograma({ ...programa, dataTermino: event.target.value });
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Button
							style={{padding: 16, marginTop: 16}}
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
