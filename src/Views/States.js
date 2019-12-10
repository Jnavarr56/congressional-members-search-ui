import React, { useEffect, useState } from 'react'
import {
	Divider,
	Card,
	Grid,
	CardContent,
	CardHeader,
	CircularProgress,
	Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import qs from 'query-string'
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingTop: theme.spacing(12),
		alignItems: 'flex-start',
		'& > .MuiCard-root': {
			width: '100%',
			padding: theme.spacing(2)
		}
	}
}))

const States = () => {
	const [loading, setLoading] = useState(true)
	const [states, setStates] = useState([])

	const classes = useStyles()

	useEffect(() => {
		const {
			REACT_APP_BASE_API_URL: URL,
			REACT_APP_STATES_ENDPOINT: ENDPOINT
		} = process.env
		const QUERY = qs.stringify({ fields: 'name', sort: 'name' })

		axios
			.get(`${URL}/${ENDPOINT}?${QUERY}`)
			.then(({ data }) => setStates(data))
			.catch(() => alert('error'))
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <CircularProgress />

	return (
		<>
			<Helmet>
				<title>States</title>
			</Helmet>
			<div className={ classes.root }>
				<Card>
					<CardHeader title="States" />
					<Divider />
					<CardContent>
						<Grid
							container={ true }
							spacing={ 1 }
						>
							{states.map(({ name, _id }) => (
								<Grid
									item={ true }
									key={ _id }
									xs={ 2 }
								>
									<Button
										color="secondary"
										component={ RouterLink }
										to={ `/states/${_id}` }
									>
										{name}
									</Button>
								</Grid>
							))}
						</Grid>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default States
