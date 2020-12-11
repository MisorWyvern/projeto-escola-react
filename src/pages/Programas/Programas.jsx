import {
	Button,
	ButtonGroup,
	Container,
	Grid,
	Modal,
	Paper,
	Typography,
} from "@material-ui/core";
import { Delete, Edit, School } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import CustomTable from "../../components/CustomTable/CustomTable";
import httpService from "../../services/httpService";
import AdicionarProgramas from "./AdicionarProgramas";
import EditarPrograma from "./EditarPrograma";

function Programas() {
	const [programas, setProgramas] = useState({ content: [] });
	const history = useHistory();
	let { path } = useRouteMatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [totalElements, setTotalElements] = useState(0);
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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

	const buscarProgramas = () => {
		httpService
			.get("programa/", {
				params: { page, size: rowsPerPage },
			})
			.then(({ data }) => {
				setProgramas(data);
				setTotalElements(data.totalElements);
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

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

	useEffect(() => {
		buscarProgramas();
	}, [page, rowsPerPage]);

	return (
		<Switch>
			<Route exact path={path}>
				<Typography variant="h4" component="h3" align="center">
					<School/> <br />
					Programas
				</Typography>
				<ButtonGroup
					variant="contained"
					color="primary"
					aria-label="contained primary button group"
					fullWidth
				>
					<Button
						onClick={() => {
							history.push(`${path}/adicionar-programa`);
						}}
					>
						Adicionar Programa
					</Button>
					<Button
						onClick={() => {
							buscarProgramas();
						}}
					>
						Atualizar Tabela
					</Button>
				</ButtonGroup>

				<CustomTable
					columns={colunas}
					content={programas.content}
					actions={acoes}
					totalElements={totalElements}
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
				<EditarPrograma />
			</Route>
			<Route path={`${path}/adicionar-programa`}>
				<AdicionarProgramas onAction={buscarProgramas} />
			</Route>
		</Switch>
	);
}

export default Programas;
