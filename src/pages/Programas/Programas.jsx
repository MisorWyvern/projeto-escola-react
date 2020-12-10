import {
	Button,
	ButtonGroup,
	Container,
	Grid,
	Modal,
	Paper,
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
	let { path } = useRouteMatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [openModal, setOpenModal] = useState(false);
	const [modalInfo, setModalInfo] = useState({ id: 0, nome: "", message: "" });
	const [modalBody, setModalBody] = useState(<></>);
	//Tabela
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
			icone: <Edit />,
			onClick: handleEdit,
			tooltip: "Editar Programa",
		},
		{
			icone: <Delete />,
			onClick: handleDelete,
			tooltip: "Deletar Programa",
		},
	];

	useEffect(() => {
		buscarProgramas();
	}, []);

	function handleChangePage(event, newPage) {
		setPage(newPage);
		buscarProgramas(page, rowsPerPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
		buscarProgramas(page, rowsPerPage);
	}

	async function handleDelete(programa) {
		await setModalInfo({ ...modalInfo, id: programa.id, nome: programa.nome });
		setModalBody(modalBody1);
		setOpenModal(true);
	}

	function handleEdit(programa) {
		console.log(programa);
		history.push(`${path}/editar-programa/${programa.id}`);
	}

	function deletarPrograma(idPrograma) {
		httpService
			.delete(`programa/${idPrograma}`)
			.then((response) => {
				setModalInfo({
					...modalInfo,
					message: "Programa excluido com sucesso!",
				});
				setModalBody(modalBody2);
			})
			.catch(async (error) => {
				await setModalInfo({
					...modalInfo,
					message: "Programa já está em uso ou não foi encontrado.",
				});
				setModalBody(modalBody2);
			});
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

	const modalBody1 = (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="subtitle1" align="center">
					Deseja realmente excluir o programa "{modalInfo.nome}"?
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Button
					onClick={() => {
						deletarPrograma(modalInfo.id);
					}}
					fullWidth
					variant="contained"
					color="primary"
				>
					Sim
				</Button>
			</Grid>
			<Grid item xs={6}>
				<Button
					onClick={() => {
						setOpenModal(false);
					}}
					fullWidth
					variant="contained"
					color="secondary"
				>
					Não
				</Button>
			</Grid>
		</Grid>
	);

	const modalBody2 = (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography align="center" variant="subtitle1">
					{modalInfo.message}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button
					onClick={() => {
						setOpenModal(false);
					}}
					fullWidth
					variant="contained"
					color="primary"
				>
					Fechar
				</Button>
			</Grid>
		</Grid>
	);

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

				<Modal
					open={openModal}
					onClose={() => {
						setOpenModal(false);
					}}
					aria-labelledby="Deletar Programa"
					aria-describedby="Confirmação para deletar um Programa"
				>
					<Container
						component={Paper}
						style={{
							width: 200,
							height: 200,
							display: "flex",
							marginTop: "10%",
							alignItems: "center",
						}}
					>
						{modalBody}
					</Container>
				</Modal>
			</Route>
			<Route path={`${path}/editar-programa/:idPrograma`}>
				<EditarPrograma buscar={buscarProgramas} />
			</Route>
			<Route path={`${path}/adicionar-programa`} />
		</Switch>
	);
}

export default Programas;
