import { Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import CustomDialog from "../../components/CustomDialog";
import CustomTable from "../../components/CustomTable/CustomTable";
import PageHeader from "../../components/PageHeader";
import httpService from "../../services/httpService";

function AddMentorToPrograma() {
	const { idPrograma } = useParams();
	let { url } = useRouteMatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [mentores, setMentores] = useState([]);
	const [programa, setPrograma] = useState([
		{
			id: 0,
			nome: "",
			dataInicio: "",
			dataTermino: "",
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
	const acoesMentores = [
		{
			icone: <Add />,
			onClick: handleAddOnClick,
			tooltip: "Adicionar Mentor ao Programa",
		},
    ];
    const [dialog, setDialog] = useState({
        open: false,
        onClose: () => {},
        title: "Teste",
        body: "Teste",
        onClickYes: () => {},
        onClickNo: () => {},
    });

	useEffect(() => {
		buscarMentores();
	}, []);

	useEffect(() => {
		buscarPrograma(idPrograma);
	}, [idPrograma]);

	function buscarMentores(page = 0, size = 5) {
		httpService.get("/mentor", { params: { page, size } }).then(({ data }) => {
			setMentores(data);
		});
	}

	function buscarPrograma(id) {
		httpService
			.get(`/programa/${id}`)
			.then(({ data }) => {
				setPrograma(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function handleAddOnClick(mentor) {
        setDialog({...dialog, open: true})
    }

	return (
		<PageHeader
			title={`Adicionar Mentores ao "${programa.nome}"`}
			linkVoltar={url.replace("/add-mentor", "")}
		>
			<CustomDialog 
                open={dialog.open}
                onClose={dialog.onClose}
                title={dialog.title}
                bodyText={dialog.body}
                onClickYes={dialog.onClickYes}
                onClickNo={dialog.onClickNo}
            />
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography style={{ paddingLeft: 8 }} variant="h5" component="h4">
						Escolha um mentor:
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<CustomTable
						columns={colunasMentores}
						content={mentores.content}
						totalElements={mentores.totalElements}
						rowsPerPage={rowsPerPage}
						actions={acoesMentores}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Grid>
			</Grid>
		</PageHeader>
	);
}

export default AddMentorToPrograma;
