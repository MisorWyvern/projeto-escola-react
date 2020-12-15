import {
	Button,
	ButtonGroup,
	Container,
	Grid,
	Modal,
	Paper,
	Typography,
} from "@material-ui/core";
import { Add, Delete, Edit, School, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import CustomTable from "../../components/CustomTable/CustomTable";
import httpService from "../../services/httpService";

function Programas() {
	const [programas, setProgramas] = useState({ content: [] });
	const history = useHistory();
	let { path } = useRouteMatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [totalElements, setTotalElements] = useState(0);
	const [modal, setModal] = useState({
		open: false,
		body: <></>,
	});
	//Tabela
	const colunas = [
		{
			title: "Nome",
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
			icone: <Visibility />,
			onClick: handleViewOnClick,
			tooltip: "Ver Dados do Programa",
		},
		{
			icone: <Edit />,
			onClick: handleEdit,
			tooltip: "Editar Programa",
			hidden: true,
		},

		{
			icone: <Delete />,
			onClick: handleDelete,
			tooltip: "Deletar Programa",
		},
	];
	function ModalBody1({ info }) {
		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="subtitle1" align="center">
						Deseja realmente excluir o programa "{info.nome}"?
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Button
						onClick={() => {
							deletarPrograma(info.id);
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
							setModal({ ...modal, open: false });
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
	}

	function ModalBody2({ info }) {
		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography align="center" variant="subtitle1">
						{info.message}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button
						onClick={() => {
							setModal({ ...modal, open: false });
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
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function handleDelete(programa) {
		setModal({
			...modal,
			body: <ModalBody1 info={programa} />,
			open: true,
		});
	}

	function handleEdit(programa) {
		history.push(`${path}/editar-programa/${programa.id}`);
	}

	function handleViewOnClick(programa) {
		history.push(`${path}/view/${programa.id}`);
	}

	function deletarPrograma(idPrograma) {
		httpService
			.delete(`programa/${idPrograma}`)
			.then((response) => {
				setModal({
					...modal,
					open: true,
					body: (
						<ModalBody2 info={{ message: "Programa excluido com sucesso!" }} />
					),
				});
				buscarProgramas();
			})
			.catch((error) => {
				setModal({
					...modal,
					open: true,
					body: (
						<ModalBody2
							info={{
								message: "Programa já está em uso ou não foi encontrado.",
							}}
						/>
					),
				});
			});
	}

	const buscarProgramas = (pagina = page, tamanho = rowsPerPage) => {
		httpService
			.get("programa/", {
				params: { page: pagina, size: tamanho },
			})
			.then(({ data }) => {
				setProgramas(data);
				setTotalElements(data.totalElements);
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	useEffect(() => {
		buscarProgramas();
	}, [page, rowsPerPage]);

	//useEffect(() => () => console.log("unmount"), []);

	return (
		<>
			<Typography variant="h4" component="h3" align="center">
				<School /> <br />
				Programas
			</Typography>
			<ButtonGroup
				style={{ marginBottom: 8 }}
				variant="contained"
				color="primary"
				aria-label="contained primary button group"
				fullWidth
			>
				<Button
					startIcon={<Add />}
					onClick={() => {
						history.push(`${path}/adicionar-programa`);
					}}
				>
					Adicionar Programa
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
				open={modal.open}
				onClose={() => {
					setModal({ ...modal, open: false });
				}}
				aria-labelledby="Deletar Programa"
				aria-describedby="Confirmação para deletar um Programa"
			>
				<Container
					component={Paper}
					style={{
						width: 300,
						height: 300,
						display: "flex",
						marginTop: "10%",
						alignItems: "center",
						borderRadius: 15,
					}}
				>
					{modal.body}
				</Container>
			</Modal>
		</>
	);
}

export default Programas;
