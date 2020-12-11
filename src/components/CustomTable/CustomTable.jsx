import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableCell,
	Typography,
	TableBody,
	TableFooter,
	TablePagination,
	IconButton,
} from "@material-ui/core";

function CustomTable({
	columns,
	content,
	actions,
	totalElements,
	rowsPerPage,
	page,
	onChangePage,
	onChangeRowsPerPage,
}) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="Custom Table">
				<TableHead>
					<TableRow>
						{columns.map((column, index) => {
							return (
								<TableCell component="th">
									<Typography variant="subtitle1">{column.title}</Typography>
								</TableCell>
							);
						})}
						{actions.length > 0 ? <TableCell colSpan={actions.length} /> : ""}
					</TableRow>
				</TableHead>
				<TableBody>
					{content.map((obj) => {
						return (
							<TableRow key={obj.id}>
								{columns.map((column) => {
									return (
										<TableCell component="td">{obj[column.field]}</TableCell>
									);
								})}
								{actions.map((acao, index) => (
									<TableCell
										aria-label={acao.tooltip}
										component="td"
										style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
										align="right"
										size="small"
									>
										<IconButton onClick={() => acao.onClick(obj)}>
											{acao.icone}
										</IconButton>
									</TableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							nextIconButtonText="Próxima Página"
							backIconButtonText="Página Anterior"
							labelRowsPerPage="Linhas por página:"
							rowsPerPageOptions={[5, 10]}
							colSpan={columns.length + actions.length}
							count={totalElements}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={onChangePage}
							onChangeRowsPerPage={onChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

export default CustomTable;
