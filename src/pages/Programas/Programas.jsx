import {
	Button,
	ButtonGroup,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import httpService from "../../services/httpService";
import EditarPrograma from "./EditarPrograma";

function Programas() {
	const [programas, setProgramas] = useState({ content: [] });
	const history = useHistory();
	let { url, path } = useRouteMatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		buscarProgramas();
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		buscarProgramas(page, rowsPerPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
		buscarProgramas(page, rowsPerPage);
	};

	console.log(programas);

	const handleDelete = (idPrograma) => {};

	const handleEdit = (idPrograma) => {
		history.push(`${path}/editar-programa/${idPrograma}`);
	};

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
					<Button>????</Button>
					<Button>????</Button>
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
											aria-label="Editar Programa"
											component="td"
											style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
											align="right"
											size="small"
										>
											<IconButton
												onClick={() => {
													handleEdit(prog.id);
												}}
											>
												<Edit />
											</IconButton>
										</TableCell>
										<TableCell
											component="td"
											style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
											align="right"
											size="small"
										>
											<IconButton
												aria-label="Deletar Programa"
												onClick={() => {
													handleDelete(prog.id);
												}}
											>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10]}
									colSpan={5}
									count={programas.numberOfElements}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Route>
			<Route
				path={`${path}/editar-programa/:idPrograma`}
				component={EditarPrograma}
			/>
			<Route path={`${path}/adicionar-programa`} />
		</Switch>
	);
}

export default Programas;
