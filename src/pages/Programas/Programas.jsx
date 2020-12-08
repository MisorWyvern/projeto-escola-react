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
import CustomTable from "../../components/CustomTable/CustomTable";
import httpService from "../../services/httpService";
import EditarPrograma from "./EditarPrograma";

function Programas() {
	const [programas, setProgramas] = useState({ content: [] });
	const history = useHistory();
	let { url, path } = useRouteMatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const colunas = [
		{
			title: "Nome do Programa",
			field: "nome",
		},
		{
			title: "Data de Início",
			field: "dataInicio",
		},
		{
			title: "Data de Término",
			field: "dataTermino",
		},
	];
	const acoes = [
		{
			icone: <Edit/>,
			onClick: handleEdit,
			tooltip: "Editar Programa",
		},
		{
			icone: <Delete/>,
			onClick: handleDelete,
			tooltip: "Deletar Programa",
		},
	];

	useEffect(() => {
		buscarProgramas();
	}, []);

	function handleChangePage(event, newPage){
		setPage(newPage);
		buscarProgramas(page, rowsPerPage);
	};

	function handleChangeRowsPerPage(event){
		setRowsPerPage(+event.target.value);
		setPage(0);
		buscarProgramas(page, rowsPerPage);
	};

	//console.log(programas);

	function handleDelete(idPrograma) {};

	function handleEdit(programa){
		console.log(programa);
		history.push(`${path}/editar-programa/${programa.id}`);
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

				<CustomTable
					columns={colunas}
					content={programas.content}
					actions={acoes}
					numberOfElements={programas.numberOfElements}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
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
