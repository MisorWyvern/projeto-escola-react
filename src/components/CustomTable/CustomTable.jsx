import { Table, TableContainer, TableHead, TableRow } from "@material-ui/core";

function CustomTable({ columns, content, actions, numberOfElements, rowsPerPage, page, onChangePage, onChangeRowsPerPage }) {
    
    
    return (
		<TableContainer component={Paper}>
			<Table aria-label="Custom Table">
				<TableHead>
					<TableRow>
						{headers.map((index) => {
							return (
								<TableCell
									colSpan={index === headers.length - 1 ? 1 + actions.length : 1}
									component="th"
								>
									<Typography variant="subtitle1">
										${columns.title[index]}
									</Typography>
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{content.map((obj) => {
						return (
							<TableRow key={obj.id}>
								{columns.field.map((field) => {
									return <TableCell component="td">{obj[field]}</TableCell>;
								})}
								{actions.map((acao) => {
									<TableCell
										aria-label={acao.tooltip[index]}
										component="td"
										style={{ width: 48, paddingLeft: 6, paddingRight: 6 }}
										align="right"
										size="small"
									>
										<IconButton
											onClick={() => {
												acao.onClick[index];
											}}
										>
											${acao.icone[index]}
										</IconButton>
									</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10]}
							colSpan={columns.length + actions.length}
							count={numberOfElements}
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
