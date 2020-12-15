import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";

function CustomAccordion({ title, children }) {
    const theme = useTheme();
    return (
		<Accordion defaultExpanded style={{marginBottom: 8}}>
			<AccordionSummary
                style = {{
                    backgroundColor: theme.palette.primary.main,
                    color: "#EEE"
                }}
				expandIcon={<ExpandMore style={{color: "#EEE"}} />}
				aria-controls="panel1a-content"
			>
				<Typography
					component="h4"
					variant="subtitle1"
					style={{ fontWeight: "bold" }}
				>
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
}

export default CustomAccordion;
