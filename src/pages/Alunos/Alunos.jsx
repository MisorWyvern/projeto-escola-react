import { Box, Button, Grid, Typography } from "@material-ui/core";
import { People, Person, PersonAdd, PersonOutline } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AdicionarAluno from "./AdicionarAluno";
import httpService from "../../services/httpService";
import "./index.css";

function Alunos({ icone }) {
	const [alunos, setAlunos] = useState([]);
	const [tituloTabela, setTituloTabela] = useState("Alunos Ativos");
	let { url, path } = useRouteMatch();

	useEffect(() => {
		buscarAlunos(true);
	}, []);

	console.log(alunos);

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
									startIcon={<People />}
									onClick={() => {
										setTituloTabela("Todos Alunos");
										buscarAlunos();
									}}
								>
									Mostrar Todos Alunos
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
									startIcon={<Person />}
									onClick={() => {
										setTituloTabela("Alunos Ativos");
										buscarAlunos(true);
									}}
								>
									Mostrar Apenas Ativos
								</Button>
							</Grid>
						</Grid>
					</Box>
					<MaterialTable
						className="table-alunos"
						options={{
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
					></MaterialTable>
				</Route>
				<Route path={`${path}/adicionar-aluno`}>
					<AdicionarAluno />
				</Route>
			</Switch>
		</>
	);

	function buscarAlunos(active) {
		if (active === undefined || active === null) {
			httpService
				.get("/aluno")
				.then(({ data }) => {
					setAlunos(data);
				})
				.catch((error) => {
					console.error(error);
				});
			return;
		} else if (active === false) {
			httpService
				.get("/aluno/?active=false")
				.then(({ data }) => {
					setAlunos(data);
				})
				.catch((error) => {
					console.error(error);
				});
			return;
		} else {
			httpService
				.get("/aluno/?active=true")
				.then(({ data }) => {
					setAlunos(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
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
