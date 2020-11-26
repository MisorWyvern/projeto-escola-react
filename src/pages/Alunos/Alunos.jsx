import { Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import httpService from "../../services/httpService";

function Alunos() {
	const [alunos, setAlunos] = useState([]);

	useEffect(() => {
		httpService.get("aluno/?active=true")
			.then(({ data }) => {
				setAlunos(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<>
			<Typography variant="h4" component="h3">
				Alunos
			</Typography>
			<MaterialTable
            options={
                {
                    headerStyle: {
                        fontWeight: 'bold'
                    }
                }
            }
            title="Alunos"
				columns={[
					{ title: "Nome do Aluno", field: "nome" },
					{ title: "CPF", field: "cpf" },
					{ title: "Identificador do Programa", field: "idPrograma" },
				]}
				data={alunos}
			></MaterialTable>
		</>
	);
}

export default Alunos;
