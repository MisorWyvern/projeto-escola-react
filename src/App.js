import { Container, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { deepPurple, red } from "@material-ui/core/colors";
import { Mood } from "@material-ui/icons";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PersistentDrawerRight from "./components/PersistentDrawerRight/PersistentDrawerRight";
import Alunos from "./pages/Alunos";
import HomePage from "./pages/Home";
import Programas from "./pages/Programas";
import AdicionarAluno from "./pages/Alunos/AdicionarAluno";
import EditarAluno from "./pages/Alunos/EditarAluno";
import AdicionarProgramas from "./pages/Programas/AdicionarProgramas";
import EditarPrograma from "./pages/Programas/EditarPrograma";

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
					</ThemeProvider>
				</Container>
			</Router>
		</Fragment>
	);
}

export default App;
