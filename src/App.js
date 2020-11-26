import { Fragment } from "react";

const { default: PersistentDrawerRight } = require("./components/PersistentDrawerRight/PersistentDrawerRight");

function App() {
  const drawerTitle = "Projeto Escola React";
  return (
    <Fragment>
      <PersistentDrawerRight drawerTitle={drawerTitle}/>
    </Fragment>
  );
}

export default App;
