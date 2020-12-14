import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
	Home,
	LibraryBooks,
	Mood,
	PeopleAlt,
	Receipt,
	School,
	Timeline
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: drawerWidth,
	},
	title: {
		flexGrow: 1,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-start",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	},
}));

export default function PersistentDrawerRight(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const listaIconesSuperior = [<Mood />, <PeopleAlt />, <School />];
	const linksSuperior = ["/alunos", "/mentores", "/programas"];
	const listaIconesInferior = [<LibraryBooks />, <Receipt />, <Timeline />];
	const linksInferior = ["/disciplinas", "/avaliacoes", "/tipos-de-avaliacoes"];
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<Typography variant="h6" noWrap className={classes.title}>
						{props.drawerTitle}
					</Typography>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="end"
						onClick={handleDrawerOpen}
						className={clsx(open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<Link to="/">
					<List>
						<ListItem index="0" button key="Home">
							<ListItemIcon>
								<Home />
							</ListItemIcon>
							<ListItemText>Página Inicial</ListItemText>
						</ListItem>
					</List>
				</Link>
				<Divider />
				<List>
					{["Alunos", "Mentores", "Programas"].map((text, index) => (
						<Link to={linksSuperior[index]}>
							<ListItem button key={text}>
								<ListItemIcon>{listaIconesSuperior[index]}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
				<List>
					{["Disciplinas", "Avaliações", "Tipos de Avaliações"].map(
						(text, index) => (
							<Link to={linksInferior[index]}>
								<ListItem button key={text}>
									<ListItemIcon>{listaIconesInferior[index]}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							</Link>
						)
					)}
				</List>
			</Drawer>
		</div>
	);
}
