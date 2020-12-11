import { Container, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, red } from "@material-ui/core/colors";
import { Mood } from "@material-ui/icons";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PersistentDrawerRight from "./components/PersistentDrawerRight/PersistentDrawerRight";
import Alunos from "./pages/Alunos";
import HomePage from "./pages/Home";
import Programas from "./pages/Programas";

const theme = createMuiTheme({
	pallete: {
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
			<Router>
				<PersistentDrawerRight drawerTitle={drawerTitle} />
				<Container className="container-switch">
					<ThemeProvider theme={theme}>
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/alunos">
							<Alunos icone={<Mood />} />
						</Route>
						<Route path="/mentores"></Route>
						<Route path="/programas">
							<Programas />
						</Route>
						<Route path="/disciplinas"></Route>
						<Route path="/avaliacoes"></Route>
						<Route path="/tipos-de-avaliacoes"></Route>
					</Switch>
					</ThemeProvider>
				</Container>
			</Router>
		</Fragment>
	);
}

export default App;
