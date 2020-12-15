import Alunos from "../pages/Alunos";
import AdicionarAluno from "../pages/Alunos/AdicionarAluno";
import EditarAluno from "../pages/Alunos/EditarAluno";
import Programas from "../pages/Programas";
import AdicionarProgramas from "../pages/Programas/AdicionarProgramas";
import EditarPrograma from "../pages/Programas/EditarPrograma";
import HomePage from "../pages/Home";
import { Route } from "react-router-dom";
import VisualizarPrograma from "../pages/Programas/VisualizarPrograma";

function RouteConfig() {

    const routes = [
        {
            path: "/alunos/editar-aluno/:idAluno",
            component: <EditarAluno />,
        },
        {
            path: "/alunos/adicionar-aluno",
            component: <AdicionarAluno />,
        },
        {
            path: "/alunos",
            component: <Alunos />,
        },
        {
            path: "/mentores",
            component: <></>,
        },
        { 
            path: "/programas/adicionar-programa", 
            component: <AdicionarProgramas />, 
        },
        {
            path: "/programas/editar-programa/:idPrograma",
            component: <EditarPrograma/>,
        },
        {
            path: "/programas/view/:idPrograma",
            component: <VisualizarPrograma />,
        },
        {
            path: "/programas",
            component: <Programas />,
        },
        {
            path: "/disciplinas",
            component: <></>,
        },
        {
            path: "/avaliacoes",
            component: <></>,
        },
        {
            path: "/tipos-de-avaliacoes",
            component: <></>,
        },
        {
            path: "/",
            component: <HomePage />,
        },
    ];

    return(
        routes.map((route, index) => {
            return <Route key={index} exact path={route.path}>{route.component}</Route>;
        })
    );
    
}


export default RouteConfig;