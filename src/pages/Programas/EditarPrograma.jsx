import { useParams } from "react-router-dom";

function EditarPrograma() {
    const {idPrograma} = useParams();
    return(
    <h1>Olá Teste Programa idPrograma {idPrograma}</h1>
    );
}

export default EditarPrograma;