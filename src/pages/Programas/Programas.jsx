import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {
	Link,
	Route,
	Switch,
	useHistory,
	useRouteMatch,
} from "react-router-dom";
import httpService from "../../services/httpService";
import EditarPrograma from "./EditarPrograma";

function Programas() {
	const [programas, setProgramas] = useState({ content: [] });
    const history = useHistory();
    let { url, path } = useRouteMatch();

	useEffect(() => {
		buscarProgramas();
	}, []);

	console.log(programas);

    const handleDelete = (idPrograma) => {
        
    }

    const handleEdit = (idPrograma) => {
        history.push(`${path}/editar-programa/${idPrograma}`)
    }

	function buscarProgramas(page = 0, pageSize = 5) {
		httpService
			.get("programa/", {
				params: { page, size: pageSize },
			})
			.then(({ data }) => {
				setProgramas(data);
			})
			.catch((error) => {
				console.error(error.message);
			});
    }   

	return (
		<Switch>
			<Route exact path={path}>
				<ButtonGroup
					variant="contained"
					color="primary"
					aria-label="contained primary button group"
					fullWidth
				>
					<Button>Adicionar Programa</Button>
					<Button>Editar Programa</Button>
					<Button>Remover Programa</Button>
				</ButtonGroup>

				<TableContainer component={Paper}>
					<Table aria-label="Simple Table">
						<TableHead>
							<TableRow>
								<TableCell component="th">
									<Typography variant="subtitle1">Nome do Programa</Typography>
								</TableCell>
								<TableCell component="th">
									<Typography variant="subtitle1">Data de Início</Typography>
								</TableCell>
								<TableCell colSpan={3} component="th">
									<Typography variant="subtitle1">Data do Término</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{programas.content.map((prog) => {
								return (
									<TableRow key={prog.id}>
										<TableCell component="td">{prog.nome}</TableCell>
										<TableCell component="td">{prog.dataInicio}</TableCell>
										<TableCell component="td">{prog.dataTermino}</TableCell>
										<TableCell
											component="td"
											style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
											align="right"
											size="small"
										>
											<IconButton onClick={() => {handleEdit(prog.id)}}>
												<Edit />
											</IconButton>
										</TableCell>
										<TableCell
											component="td"
											style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
											align="right"
											size="small"
										>
											<IconButton onClick={() => {handleDelete(prog.id)}}>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Route>
            <Route path={`${path}/editar-programa/:idPrograma`} component={EditarPrograma} />
		</Switch>
	);
}

export default Programas;
