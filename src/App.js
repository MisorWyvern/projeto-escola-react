import { Container, createMuiTheme } from "@material-ui/core";
import { deepPurple, red } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core/styles";
import { Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PersistentDrawerRight from "./components/PersistentDrawerRight/PersistentDrawerRight";
import RouteConfig from "./components/RouteConfig";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: deepPurple[300],
			main: deepPurple[600],
			dark: deepPurple[900],
		},
		secondary: {
			light: red["A200"],
			main: red["A400"],
			dark: red["A700"],
		},
	},
});

function App() {
	const drawerTitle = "Projeto Escola React";

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<Router>
					<PersistentDrawerRight drawerTitle={drawerTitle} />
					<Container className="container-switch">
						<Switch>
							<RouteConfig/>
						</Switch>
					</Container>
				</Router>
			</ThemeProvider>
		</Fragment>
	);
}

export default App;
