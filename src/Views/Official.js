import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
	Divider,
	Grid,
	CircularProgress,
	CardActions,
	Breadcrumbs,
	Link,
	Typography,
	Card,
	Paper,
	CardContent,
	CardHeader,
	IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { ArrowBack } from '@material-ui/icons'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import moment from 'moment'

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

		'& > .MuiCard-root': {
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
	},
	outerCard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing(6, 3)
	},
	photoRow: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bioRow: {
		width: '100%'
	},
	bioCard: {
		width: '70%'
	},
	bioPaper: {
		padding: theme.spacing(2)
	},
	imagePaper: {
		padding: theme.spacing(2),
		height: 165
	}
}))

const Official = (props) => {
	const { history, match, location } = props

	const classes = useStyles()

	const [loading, setLoading] = useState(true)
	const [official, setOfficial] = useState([])

	useEffect(() => {
		const {
			REACT_APP_BASE_API_URL: URL,
			REACT_APP_STATES_ENDPOINT: STATES_ENDPOINT,
			REACT_APP_OFFICIALS_ENDPOINT: OFFICIALS_ENDPOINT
		} = process.env

		const { stateId: STATE_PARAM, officialId: OFFICIAL_PARAM } = match.params

		axios
			.get(
				`${URL}/${STATES_ENDPOINT}/${STATE_PARAM}/${OFFICIALS_ENDPOINT}/${OFFICIAL_PARAM}`
			)
			.then(({ data: officialData }) => {
				setOfficial(officialData)
				setLoading(false)
			})
			.catch((error) => history.push('/states'))
	}, [history, match.params])

	const handleBack = useCallback(() => history.goBack(), [history])

	if (loading) return <CircularProgress />

	const { officialBio } = official

	return (
		<>
			<Helmet>
				<title>{`${official.shortTitle} ${officialBio.firstName[0]}. ${officialBio.lastName}`}</title>
			</Helmet>
			<div className={ classes.root }>
				<Breadcrumbs>
					<Link
						color="inherit"
						component={ RouterLink }
						to="/states"
					>
						States
					</Link>
					<Link
						color="inherit"
						component={ RouterLink }
						to={ `/states/${official.stateUUID}` }
					>
						{official.state}
					</Link>
					<Link
						color="primary"
						component={ RouterLink }
						to={ location.pathname }
					>{`${officialBio.firstName} ${officialBio.lastName}`}</Link>
				</Breadcrumbs>
				<Card>
					<CardHeader
						title={ `${official.title} ${officialBio.firstName} ${officialBio.lastName} (${official.parties} - ${official.state})` }
						titleTypographyProps={ { variant: 'h5' } }
					/>
					<Divider />
					<CardContent className={ classes.outerCard }>
						<Card className={ classes.bioCard }>
							<CardContent>
								<Grid
									container={ true }
									spacing={ 1 }
								>
									<Grid
										className={ classes.photoRow }
										item={ true }
										xs={ 4 }
									>
										<Paper className={ classes.imagePaper }>
											<img
												alt={ `${official.title} ${officialBio.firstName} ${officialBio.lastName}` }
												src={ officialBio.photo }
											/>
										</Paper>
									</Grid>
									<Grid
										item={ true }
										xs={ 8 }
									>
										<Paper className={ classes.imagePaper }>
											<Typography variant="subtitle2">
												{official.title === 'Senator'
													? `Seniority: `
													: `District: `}
												<Typography
													display="inline"
													variant="body2"
												>
													{official.district}
												</Typography>
											</Typography>
											<Typography variant="subtitle2">
												First Elected:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{official.firstElect
														? moment(official.firstElect).format(
																'MMMM Do, YYYY'
														  )
														: '-'}
												</Typography>
											</Typography>
											<Typography variant="subtitle2">
												Current Term Started:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{official.termStart
														? moment(official.termState).format('MMMM Do, YYYY')
														: '-'}
												</Typography>
											</Typography>
										</Paper>
									</Grid>
									<Grid
										className={ classes.bioRow }
										item={ true }
										xs={ 12 }
									>
										<Paper className={ classes.bioPaper }>
											<Typography variant="subtitle2">
												Birth Date:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{moment(official.birthDate).format('MMMM Do, YYYY')}
												</Typography>
											</Typography>
											<Typography variant="subtitle2">
												Birth Place:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{officialBio.birthPlace
														? officialBio.birthPlace
														: '-'}
												</Typography>
											</Typography>
											<Typography variant="subtitle2">
												Middle Name:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{officialBio.middleName
														? officialBio.middleName
														: '-'}
												</Typography>
											</Typography>
											<Typography variant="subtitle2">
												Religion:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{officialBio.religion ? officialBio.religion : '-'}
												</Typography>
											</Typography>
											<Typography variant="subtitle2">
												Family:{' '}
												<Typography
													display="inline"
													variant="body2"
												>
													{officialBio.family ? officialBio.family : '-'}
												</Typography>
											</Typography>
										</Paper>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</CardContent>
					<CardActions>
						<IconButton onClick={ handleBack }>
							<ArrowBack />
						</IconButton>
					</CardActions>
				</Card>
			</div>
		</>
	)
}

Official.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object
}

export default withRouter(Official)
