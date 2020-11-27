import { Typography, Grid, Container, Button, Box } from "@material-ui/core";
import {
	Add,
	Edit,
	People,
	Person,
	PersonAdd,
	PersonOutline,
} from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import httpService from "../../services/httpService";
import "./index.css";

function Alunos({ icone }) {
	const [alunos, setAlunos] = useState([]);
	const [tituloTabela, setTituloTabela] = useState("Todos");

	useEffect(() => {
		httpService
			.get("/aluno/?active=true")
			.then(({ data }) => {
				setAlunos(data);
			})			
			.catch((error) => {
				console.error(error);
			});
	}, []);

	console.log(alunos);
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

	return (
		<>
			<Box component="nav" className="nav-alunos">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						{icone}
						<Typography variant="h4" component="h3" align="center">
							Alunos
						</Typography>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button variant="contained" color="primary" fullWidth>
							<PersonAdd />
							Adicionar Novo Aluno
						</Button>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button variant="contained" color="primary" fullWidth>
							<People />
							Mostrar Todos Alunos
						</Button>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button variant="contained" color="primary" fullWidth>
							<PersonOutline />
							Mostrar Apenas Inativos
						</Button>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Button variant="contained" color="primary" fullWidth>
							<Person />
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
				}}
				title={tituloTabela}
				columns={[
					{ title: "Nome do Aluno", field: "nome" },
					{ title: "CPF", field: "cpf" },
					{ title: "Nome do Programa", field: "nomePrograma" },
				]}
				data={alunos.content}
			></MaterialTable>
		</>
	);
}

export default Alunos;
