import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import {
	AppBar,
	Container,
	Toolbar,
	IconButton,
	LinearProgress,
	Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Flag as FlagIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Search } from './components'

const useStyles = makeStyles((theme) => ({
	main: {
		height: '100vh',
		width: '100vw',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		'& .space': {
			flexGrow: 1
		},
		'& .states-button': {
			color: 'white',
			marginRight: theme.spacing(2)
		},
		'& .header-button': {
			color: 'white'
		},
		'& > .MuiContainer-root': {
			flexGrow: 1
		}
	}
}))

const Layout = ({ children }) => {
	const classes = useStyles()

	return (
		<main className={ classes.main }>
			<AppBar position="relative">
				<Toolbar>
					<IconButton
						className="states-button"
						component={ Link }
						to="/states"
					>
						<FlagIcon edge="start" />
					</IconButton>
					<Search />

					<div className="space" />
					<Button
						component={ Link }
						size="large"
						to="/"
					>
						<span className="header-button">
							Congressional Member Directory
						</span>
					</Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg">
				<Suspense fallback={ <LinearProgress color="secondary" /> }>
					{children}
				</Suspense>
			</Container>
		</main>
	)
}

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	])
}

export default Layout
