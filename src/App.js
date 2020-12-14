import { Container, createMuiTheme } from "@material-ui/core";
import { deepPurple, purple, red } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core/styles";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PersistentDrawerRight from "./components/PersistentDrawerRight/PersistentDrawerRight";
import Alunos from "./pages/Alunos";
import AdicionarAluno from "./pages/Alunos/AdicionarAluno";
import EditarAluno from "./pages/Alunos/EditarAluno";
import HomePage from "./pages/Home";
import Programas from "./pages/Programas";
import AdicionarProgramas from "./pages/Programas/AdicionarProgramas";
import EditarPrograma from "./pages/Programas/EditarPrograma";

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
							<Route path="/mentores"></Route>
							<Route path="/disciplinas"></Route>
							<Route path="/avaliacoes"></Route>
							<Route path="/tipos-de-avaliacoes"></Route>
							<Route
								path="/programas/editar-programa/:idPrograma"
								component={EditarPrograma}
							/>
							<Route
								path="/programas/adicionar-programa"
								component={AdicionarProgramas}
							/>
							<Route path="/programas" component={Programas} />
							<Route
								path="/alunos/editar-aluno/:idAluno"
								component={EditarAluno}
							/>
							<Route
								path="/alunos/adicionar-aluno"
								component={AdicionarAluno}
							/>
							<Route path="/alunos" component={Alunos} />
							<Route path="/" component={HomePage} />
						</Switch>
					</Container>
				</Router>
			</ThemeProvider>
		</Fragment>
	);
}

export default App;
