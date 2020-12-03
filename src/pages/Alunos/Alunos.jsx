import { Box, Button, Grid, Typography } from "@material-ui/core";
import {
	People,
	Person,
	PersonAdd,
	PersonOutline
} from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import httpService from "../../services/httpService";
import AdicionarAluno from "./AdicionarAluno";
import EditarAluno from "./EditarAluno";
import "./index.css";

function Alunos({ icone }) {
	const [alunos, setAlunos] = useState([]);
	const [tituloTabela, setTituloTabela] = useState("Alunos Ativos");
	let { url, path } = useRouteMatch();
	let history = useHistory();

	useEffect(() => {
		buscarAlunos(true);
	}, []);

	console.log(alunos);

	function buscarAlunos(active, page = 0, pageSize = 10) {
		if (active === undefined || active === null) {
			httpService
				.get("aluno", { params: { page, size: pageSize } })
				.then(({ data }) => {
					setAlunos(data);
				})
				.catch((error) => {
					console.error(error);
				});
			return;
		} else if (active === false) {
			httpService
				.get(`/aluno/?active=false&page=${page}&size=${pageSize}`)
				.then(({ data }) => {
					setAlunos(data);
				})
				.catch((error) => {
					console.error(error);
				});
			return;
		} else {
			httpService
				.get(`/aluno/?active=true&page=${page}&size=${pageSize}`)
				.then(({ data }) => {
					setAlunos(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	function deletarAluno(idAluno) {
		httpService
			.delete(`aluno/${idAluno}`)
			.then(() => {
				const updatedAlunos = alunos.content.filter((aluno) => {
					return aluno.id !== idAluno;
				});
				setAlunos({ ...alunos, content: updatedAlunos });
			})
			.catch((error) => {
				console.error(error.message);
			});
	}

	const activateAluno = (idAluno) => {
		httpService
			.put(`aluno/activate/${idAluno}`)
			.then(() => {
				let updatedAlunos = alunos.content.filter((aluno) => {
					return aluno.id !== idAluno;
				});
				setAlunos({ ...alunos, content: updatedAlunos });
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	return (
		<>
			<Switch>
				<Route exact path={path}>
					<Box component="nav" className="nav-alunos">
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant="h4" component="h3" align="center">
									{icone} <br />
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
										buscarAlunos(true);
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
										buscarAlunos(false);
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
										buscarAlunos();
									}}
								>
									Mostrar Todos Alunos
								</Button>
							</Grid>
						</Grid>
					</Box>
					<MaterialTable
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
						data={alunos.content}
						actions={[
							{
								icon: "edit",
								tooltip: "Editar Aluno",
								onClick: (event, rowData) => {
									history.push(`${path}/editar-aluno/${rowData.id}`)
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
									alert("Aluno excluido com sucesso!");
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
				</Route>
				<Route path={`${path}/adicionar-aluno`} component={AdicionarAluno} />
				<Route path={`${path}/editar-aluno/:idAluno`} component={EditarAluno} />
			</Switch>
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
