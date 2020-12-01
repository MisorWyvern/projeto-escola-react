import { Container } from "@material-ui/core";
import { Mood } from "@material-ui/icons";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alunos, { AdicionarAluno } from "./pages/Alunos";
import HomePage from "./pages/Home";

const {
	default: PersistentDrawerRight,
} = require("./components/PersistentDrawerRight/PersistentDrawerRight");

function App() {
  const drawerTitle = "Projeto Escola React";
	return (
		<Fragment>
			<Router>
				<PersistentDrawerRight drawerTitle={drawerTitle} />
				<Container className="container-switch">
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/alunos">
							<Alunos icone={<Mood/>} />
						</Route>
						<Route path=""></Route>
						<Route path=""></Route>
						<Route path=""></Route>
						<Route path=""></Route>
						<Route path=""></Route>
					</Switch>
				</Container>
			</Router>
		</Fragment>
	);
}

export default App;
