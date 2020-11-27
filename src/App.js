import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Fragment } from "react";
import Alunos from "./pages/Alunos";
import { Mood } from "@material-ui/icons";
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
				<Container>
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
