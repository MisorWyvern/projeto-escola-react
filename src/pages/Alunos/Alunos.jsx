import { Typography } from "@material-ui/core";
import Axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

function Alunos() {
	const [alunos, setAlunos] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:8080/aluno/?active=true")
			.then(({ data }) => {
				setAlunos(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<>
			<Typography variant="h3" component="h3">
				Alunos
			</Typography>
			<MaterialTable
				columns={[
					{ title: "Nome do Aluno", field: "nome" },
					{ title: "CPF", field: "cpf" },
					{ title: "Identificador do Aluno", field: "idPrograma" },
				]}
				data={alunos}
			></MaterialTable>
		</>
	);
}

export default Alunos;
