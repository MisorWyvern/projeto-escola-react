import { Box, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BotaoVoltar from "./BotaoVoltar";

function PageHeader({ children, linkVoltar, title }) {
	return (
		<Box component="section">
			<Link to={linkVoltar}>
				<BotaoVoltar />
			</Link>
			<Container maxWidth="sm">
				<Typography
					align="center"
					style={{ marginTop: 16, marginBottom: 8 }}
					component="h3"
					variant="h4"
				>
					{title}
				</Typography>
                {children}
			</Container>
		</Box>
	);
}

export default PageHeader;
