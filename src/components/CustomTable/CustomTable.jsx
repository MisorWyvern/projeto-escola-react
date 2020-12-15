import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

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
	const theme = useTheme();
	return (
		<TableContainer component={Paper}>
			<Table aria-label="Custom Table" size="small">
				<TableHead>
					<TableRow style={{ backgroundColor: theme.palette.primary.main }}>
						{columns.map((column, index) => {
							return (
								<TableCell size="medium" key={column.title} component="th">
									<Typography
										variant="subtitle1"
										style={{ fontWeight: "bold", color: "#EEE" }}
									>
										{column.title}
									</Typography>
								</TableCell>
							);
						})}
						{actions !== undefined ? (
							<TableCell colSpan={actions.length} />
						) : (
							""
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{content !== undefined && content.length > 0 ? (
						content.map((obj) => {
							return (
								<TableRow key={obj.id}>
									{columns.map((column, index) => {
										return (
											<TableCell key={index} component="td">
												{obj[column.field]}
											</TableCell>
										);
									})}
									{actions !== undefined
										? actions.map((acao, index) => (
												<TableCell
													key={index}
													aria-label={acao.tooltip}
													component="td"
													style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
													align="right"
													size="small"
												>
													<IconButton
														style={{ color: theme.palette.primary.dark }}
														onClick={() => acao.onClick(obj)}
													>
														{acao.icone}
													</IconButton>
												</TableCell>
										  ))
										: ""}
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell size="medium" align="center" component="td" rowSpan={columns.length} colSpan={columns.length}>
								Não há registros nessa página.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							nextIconButtonText="Próxima Página"
							backIconButtonText="Página Anterior"
							labelRowsPerPage="Itens:"
							rowsPerPageOptions={[5, 10]}
							colSpan={actions !== undefined ? columns.length + actions.length : columns.length}
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
