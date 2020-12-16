import {
	Button,
	ButtonGroup,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import CustomAccordion from "../../components/CustomAccordion";
import CustomTable from "../../components/CustomTable/CustomTable";
import PageHeader from "../../components/PageHeader";
import httpService from "../../services/httpService";

function VisualizarPrograma() {
	const { idPrograma } = useParams();
	const history = useHistory();
	let { url } = useRouteMatch();
	const [programa, setPrograma] = useState([
		{
			id: 0,
			nome: "",
			dataInicio: "0000-00-00",
			dataTermino: "0000-00-00",
		},
	]);
	const colunasMentores = [
		{
			title: "Nome",
			field: "nome",
		},
		{
			title: "CPF",
			field: "cpf",
		},
	];
	const [dataInicio, setDataInicio] = useState("");
	const [dataTermino, setDataTermino] = useState("");
	const [mentores, setMentores] = useState([]);
	const fields = ["id", "nome", "dataInicio", "dataTermino"];
	const titulos = ["ID", "Nome", "Data de Início", "Data de Término"];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [totalElements, setTotalElements] = useState(0);
	

	useEffect(() => {
		buscarPrograma(idPrograma);
	}, [idPrograma]);

	function buscarPrograma(id) {
		httpService
			.get(`/programa/${id}`)
			.then(({ data }) => {
				setPrograma(data);
				setDataInicio(
					data.dataInicio.substr(8) +
						"/" +
						data.dataInicio.substr(5, 2) +
						"/" +
						data.dataInicio.substr(0, 4)
				);
				setDataTermino(
					data.dataTermino.substr(8) +
						"/" +
						data.dataTermino.substr(5, 2) +
						"/" +
						data.dataTermino.substr(0, 4)
				);
				buscarMentores(data.id);
			})
			.catch((error) => {
				console.error(error.message);
			});
	}

	function buscarMentores(id) {
		httpService
			.get(`programa/mentores/${id}`)
			.then(({ data }) => {
				setMentores(data);
				setTotalElements(data.totalElements);
			})
			.catch((error) => {
				console.error(error.message);
			});
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
			<PageHeader
				title={`Programa: ${programa.nome !== undefined ? programa.nome : ""}`}
				linkVoltar={"/programas"}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<CustomAccordion title="Dados do Programa">
							<Table>
								<TableBody>
									{fields.map((field, index) => {
										return (
											<TableRow key={index}>
												<TableCell style={{ fontWeight: "bold" }}>
													{titulos[index]}
												</TableCell>

												<TableCell>
													{index < 2 ? programa[field] : ""}
													{index === 2 ? dataInicio : ""}
													{index === 3 ? dataTermino : ""}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</CustomAccordion>
						<Typography style={{ padding: 8 }} variant="h5" component="h4">
							Mentores do "{programa.nome}"
						</Typography>
						<ButtonGroup
							style={{ marginBottom: 8 }}
							variant="contained"
							color="primary"
							aria-label="contained primary button group"
							fullWidth
						>
							<Button startIcon={<Add />} onClick={() => {
								history.push(`${url}/add-mentor`);
							}}>
								Adicionar Mentor
							</Button>
							<Button startIcon={<Delete />} onClick={() => {
								history.push(`${url}/delete-mentor`);
							}}>
								Excluir Mentor
							</Button>
						</ButtonGroup>
						<CustomTable
							columns={colunasMentores}
							content={mentores.content}
							totalElements={totalElements}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Grid>
				</Grid>
			</PageHeader>
	);
}

export default VisualizarPrograma;
