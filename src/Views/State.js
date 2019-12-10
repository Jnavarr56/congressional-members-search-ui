import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
	Divider,
	Grid,
	Chip,
	CircularProgress,
	Typography,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Breadcrumbs,
	CardActions,
	Link,
	IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { ExpandMore } from '@material-ui/icons'
import { ArrowBack } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop: theme.spacing(12),
		position: 'relative',
		'& > .MuiExpansionPanel-root': {
			width: '100%'
		},
		'& > .MuiBreadcrumbs-root': {
			position: 'absolute',
			top: theme.spacing(3),
			left: 0
		}
	},
	officials: {
		flexDirection: 'column'
	}
}))

const State = (props) => {
	const { history, location, match } = props
	const { stateId: STATE_PARAM } = match.params

	const classes = useStyles()

	const [loading, setLoading] = useState(true)
	const [state, setState] = useState({})
	const [officials, setOfficials] = useState([])
	const [officialsOpen, setOfficialsOpen] = useState(true)

	const handleOfficialsOpen = useCallback(
		(e, open) => setOfficialsOpen(open),
		[]
	)

	const handleBack = useCallback(() => history.goBack(), [history])

	useEffect(() => {
		const {
			REACT_APP_BASE_API_URL: URL,
			REACT_APP_STATES_ENDPOINT: STATES_ENDPOINT,
			REACT_APP_OFFICIALS_ENDPOINT: OFFICIALS_ENDPOINT
		} = process.env

		axios
			.get(`${URL}/${STATES_ENDPOINT}/${STATE_PARAM}`)
			.then(({ data: stateData }) => {
				setState(stateData)
				axios
					.get(
						`${URL}/${STATES_ENDPOINT}/${stateData._id}/${OFFICIALS_ENDPOINT}`
					)
					.then(({ data: officialsData }) => {
						setOfficials(officialsData)
						setLoading(false)
					})
					.catch((error) => history.push('/states'))
			})
			.catch((error) => history.push('/states'))
	}, [STATE_PARAM, history, location.history, match])

	if (loading) return <CircularProgress />

	return (
		<>
			<Helmet>
				<title>{state.name}</title>
			</Helmet>
			<div className={ classes.root }>
				<Breadcrumbs>
					<Link
						color="inherit"
						component={ RouterLink }
						to="/states"
					>
						{' '}
						States
					</Link>
					<Link
						color="primary"
						component={ RouterLink }
						to={ location.pathname }
					>
						{state.name}
					</Link>
				</Breadcrumbs>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={ <ExpandMore /> }>
						<Typography variant="h5">{state.name} Facts</Typography>
					</ExpansionPanelSummary>
					<Divider />
					<ExpansionPanelDetails>
						<div>
							<Typography variant="subtitle2">
								Capital:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.capital ? state.capital : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Population:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.population ? state.population : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Motto:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.motto ? state.motto : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Nickname:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.nickName ? state.nickName : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Date of Statehood:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.statehood ? state.statehood : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Flower:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.flower ? state.flower : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Tree:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.tree ? state.tree : '-'}
								</Typography>
							</Typography>
							<Typography variant="subtitle2">
								Bird:{' '}
								<Typography
									display="inline"
									variant="body2"
								>
									{state.bird ? state.bird : '-'}
								</Typography>
							</Typography>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel
					expanded={ officialsOpen }
					onChange={ handleOfficialsOpen }
				>
					<ExpansionPanelSummary expandIcon={ <ExpandMore /> }>
						<Typography variant="h5">{state.name} Congress Members</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={ classes.officials }>
						<span>
							<Typography
								color="primary"
								variant="body1"
							>
								House Representatives
							</Typography>
							<Typography
								color="secondary"
								variant="body1"
							>
								Senators
							</Typography>
						</span>
						<br />
						<Divider />
						<br />
						<Grid
							container={ true }
							spacing={ 1 }
						>
							{officials.map((official) => {
								const color =
									official.title === 'Representative' ? 'primary' : 'secondary'
								const label = `${official.officialBio.firstName} ${official.officialBio.lastName}`

								return (
									<Grid
										item={ true }
										key={ official._id }
										xs={ 2 }
									>
										<Chip
											clickable={ true }
											color={ color }
											component={ RouterLink }
											label={ label }
											to={ `/states/${STATE_PARAM}/officials/${official._id}` }
										/>
									</Grid>
								)
							})}
						</Grid>
					</ExpansionPanelDetails>
					<CardActions>
						<IconButton onClick={ handleBack }>
							<ArrowBack />
						</IconButton>
					</CardActions>
				</ExpansionPanel>
			</div>
		</>
	)
}

State.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object
}

export default withRouter(State)
