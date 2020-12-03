const { Button } = require("@material-ui/core");
const { ArrowBackIos } = require("@material-ui/icons");

export default function BotaoVoltar() {
   return(
       <Button variant="contained" color="primary" startIcon={<ArrowBackIos/>}>
           Voltar
       </Button>
   );     
}