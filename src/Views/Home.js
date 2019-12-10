import React from 'react'
import {
	Divider,
	Card,
	CardContent,
	CardHeader,
	Typography,
	CardActions,
	Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingTop: theme.spacing(36),
		alignItems: 'flex-start',
		'& > .MuiCard-root': {
			width: '100%',
			padding: theme.spacing(2)
		}
	}
}))

const Home = () => {
	const classes = useStyles()

	return (
		<div className={ classes.root }>
			<Card>
				<CardHeader title="Welcome!" />
				<Divider />
				<CardContent>
					<Typography variant="body1">
						You can look through a list of states or just use the search bar to
						directly search for officials.
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						color="secondary"
						component={ Link }
						to="/states"
					>
						Alright
					</Button>
				</CardActions>
			</Card>
		</div>
	)
}

export default Home
