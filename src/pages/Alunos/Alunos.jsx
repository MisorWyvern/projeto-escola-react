import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Mood, People, Person, PersonAdd, PersonOutline } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useState } from "react";
import {
	Link,


	useHistory,
	useRouteMatch
} from "react-router-dom";
import httpService from "../../services/httpService";
import "./index.css";

function Alunos({ icone }) {
	const [tituloTabela, setTituloTabela] = useState("Alunos Ativos");
	const [active, setActive] = useState(true);
	const [lastActive, setLastActive] = useState(true);
	let { url, path } = useRouteMatch();
	let history = useHistory();
	const tableRef = React.createRef();
	const atualizarTabela = () => {
		tableRef.current && tableRef.current.onQueryChange();
	};

	/*
	useEffect(() => atualizarTabela(), [
		active,
	]);
	*/
	

	function buscarAlunos(page = 0, pageSize = 10) {
		return httpService.get("aluno/", {
			params: { page, size: pageSize, active },
		});
	}

	function deletarAluno(idAluno) {
		httpService
			.delete(`aluno/${idAluno}`)
			.then(() => {
				atualizarTabela();
				//console.log(tableRef.current.state.data.filter((aluno) => aluno.id !== idAluno));
			})
			.catch((error) => {
				console.error(error.message);
			});
	}

	const activateAluno = (idAluno) => {
		httpService
			.put("aluno/activate/" + idAluno)
			.then(() => {
				atualizarTabela();
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	return (
		<>
			<Box component="nav" className="nav-alunos">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4" component="h3" align="center">
							<Mood /> <br />
							Alunos
						</Typography>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Link to={`${url}/adicionar-aluno`}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								startIcon={<PersonAdd />}
							>
								Adicionar Novo Aluno
							</Button>
						</Link>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							startIcon={<Person />}
							onClick={() => {
								setTituloTabela("Alunos Ativos");
								setActive(true);
								atualizarTabela();
							}}
						>
							Mostrar Apenas Ativos
						</Button>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							startIcon={<PersonOutline />}
							onClick={() => {
								setTituloTabela("Alunos Inativos");
								setActive(false);
								atualizarTabela();
							}}
						>
							Mostrar Apenas Inativos
						</Button>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							startIcon={<People />}
							onClick={() => {
								setTituloTabela("Todos Alunos");
								setActive(null);
								atualizarTabela();
							}}
						>
							Mostrar Todos Alunos
						</Button>
					</Grid>
				</Grid>
			</Box>
			<MaterialTable
				tableRef={tableRef}
				className="table-alunos"
				options={{
					actionsColumnIndex: -1,
					headerStyle: {
						fontWeight: "bold",
					},
					search: false,
				}}
				title={tituloTabela}
				columns={[
					{ title: "Nome do Aluno", field: "nome" },
					{ title: "CPF", field: "cpf" },
					{ title: "Nome do Programa", field: "nomePrograma" },
				]}
				data={(query) =>
					new Promise((resolve, reject) => {
						let page = lastActive !== active ? 0 : query.page;
						buscarAlunos(page, query.pageSize)
							.then(({ data }) => {
								resolve({
									data: data.content,
									page: data.pageable.pageNumber,
									totalCount: data.totalElements,
								});
								setLastActive(active);
							})
							.catch((error) => {
								console.error(error.message);
							});
					})
				}
				actions={[
					{
						icon: "edit",
						tooltip: "Editar Aluno",
						onClick: (event, rowData) => {
							history.push(`${path}/editar-aluno/${rowData.id}`);
						},
					},
					{
						icon: "delete",
						tooltip: "Deletar Aluno",
						hidden: tituloTabela === "Alunos Inativos",
						onClick: (event, rowData) => {
							let deleteAluno = window.confirm(
								`Tem certeza que deseja excluir "${rowData.nome}"?`
							);

							if (!deleteAluno) {
								alert("Exclusão cancelada!");
								return;
							}

							deletarAluno(rowData.id);
							alert("Aluno " + rowData.nome + " excluido com sucesso!");
						},
					},
					{
						icon: "person_add",
						tooltip: "Reativar Aluno",
						hidden: tituloTabela !== "Alunos Inativos",
						onClick: (event, rowData) => {
							let reativarAluno = window.confirm(
								`Tem certeza que deseja reativar "${rowData.nome}"?`
							);

							if (!reativarAluno) {
								alert("Reativação cancelada!");
								return;
							}

							activateAluno(rowData.id);
							alert(`Aluno "${rowData.nome}" reativado com sucesso!`);
						},
					},
				]}
			></MaterialTable>
		</>
	);
}

export default Alunos;

//Exemplos:
// useEffect(() => {
// 	httpService.get("/aluno/?active=true").then(({ data }) => {
// 		console.log(programas);
// 		const updatedAlunos = data.map((aluno) => {
// 			const programa = programas.find((p) => p.id === aluno.idPrograma);
// 			return programa ? { ...aluno, nomePrograma: programa.nome } : aluno;
// 		});
// 		setAlunos(updatedAlunos);
// 	});
// }, [programas]);
