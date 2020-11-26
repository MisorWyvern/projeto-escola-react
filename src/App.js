const { default: PersistentDrawerRight } = require("./components/PersistentDrawerRight/PersistentDrawerRight");

function App() {
  const drawerTitle = "Projeto Escola React";
  return (
    <div>
      <PersistentDrawerRight drawerTitle={drawerTitle}/>
    </div>
  );
}

export default App;
