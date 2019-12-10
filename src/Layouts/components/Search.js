import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextField, CircularProgress, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Autocomplete } from '@material-ui/lab'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import axios from 'axios'

const {
	REACT_APP_BASE_API_URL: URL,
	REACT_APP_OFFICIALS_ENDPOINT: ENDPOINT
} = process.env

const useStyles = makeStyles((theme) => ({
	root: {
		width: 300,
		'& .MuiFormControl-root': {
			margin: 0,
			'& .MuiInputBase-root': {
				color: 'white',
				backgroundColor: 'rgba(255, 0, 0, .5)'
			},
			'& .MuiFormLabel-root': {
				color: 'white'
			}
		}
	}
}))

const Search = ({ history }) => {
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const classes = useStyles()

	const handleChange = useCallback(({ currentTarget }) => {
		clearTimeout(window.debounceSearcher)

		const { value } = currentTarget
		setValue(value)

		if (!value) {
			setLoading(false)
			setOpen(false)
		} else {
			setLoading(true)
			window.debounceSearcher = setTimeout(() => {
				let trimmed = value.trim()
				const names = trimmed.split(' ')

				let QUERY
				if (names.length === 2) {
					QUERY = `firstName=/${names[0]}/gi&lastName=/${names[1]}/gi`
				} else {
					QUERY = `regexp=/${names[0]}/gi`
				}

				axios
					.get(`${URL}/${ENDPOINT}?${QUERY}&limit=10`)
					.then(({ data: results }) => {
						console.log(results)
						setOptions(results)
						setLoading(false)
						setOpen(true)
					})
					.catch((error) => {})
			}, 250)
		}
	}, [])

	return (
		<Autocomplete
			className={ classes.root }
			filterOptions={ (opts) => opts }
			freeSolo={ true }
			open={ open }
			options={ options }
			renderInput={ (params) => (
				<TextField
					{ ...params }
					color="secondary"
					fullWidth={ true }
					InputProps={ {
						...params.InputProps,
						endAdornment: loading ? (
							<CircularProgress
								color="inherit"
								size={ 20 }
							/>
						) : null
					} }
					label="Name Search"
					margin="dense"
					size="small"
					value={ value }
					variant="outlined"
					onChange={ handleChange }
				/>
			) }
			renderOption={ (official) => (
				<Link
					to="#"
					onClick={ () => {
						setOpen(false)
						history.push(
							`/states/${official.stateUUID}/officials/${official._id}`
						)
					} }
				>
					{`${official.shortTitle} ${official.officialBio.firstName} ${official.officialBio.lastName} (${official.parties[0]} - ${official.stateId})`}
				</Link>
			) }
		/>
	)
}

Search.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object
}

export default withRouter(Search)
