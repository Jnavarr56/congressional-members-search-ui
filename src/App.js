import React, { lazy } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline, ThemeProvider, useTheme } from '@material-ui/core'
import { Layout } from './Layouts'

const App = () => {
	const theme = useTheme()

	return (
		<ThemeProvider theme={ theme }>
			<CssBaseline />

			<BrowserRouter>
				<Layout>
					<Switch>
						<Route
							component={ lazy(() => import('./Views/Home')) }
							exact={ true }
							path="/"
						/>
						<Route
							component={ lazy(() => import('./Views/States')) }
							exact={ true }
							path="/states"
						/>
						<Route
							component={ lazy(() => import('./Views/State')) }
							exact={ true }
							path="/states/:stateId"
						/>
						<Route
							component={ lazy(() => import('./Views/Official')) }
							exact={ true }
							path="/states/:stateId/officials/:officialId"
						/>
						<Route render={ () => <Redirect to="/" /> } />
					</Switch>
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
