import React, { useState } from 'react'
import { AppBar, Toolbar, CssBaseline, IconButton, Typography, Button, Drawer, Paper, Divider, Container } from '@material-ui/core'
import  MenuIcon  from '@material-ui/icons/Menu'
import { useNavigate} from 'react-router-dom'
import Logo from '../../img/Logo.png'

const Layout = () => {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)

	return (
		<>
			<CssBaseline />
			<AppBar color='secondary'>
				<Toolbar>
					<IconButton edge='start' color='inherit' onClick={() => setOpen(true)}>
						<MenuIcon />
					</IconButton>
					<Typography style={{ flexGrow: 1 }}>Autoevaluacion</Typography>
					<Button variant='text' color='inherit' onClick={() => navigate('/')}>Log out</Button>
				</Toolbar>
			</AppBar>
			<Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
				<Paper style={{ width: 240 }} elevation={0}>
					<div style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
						<IconButton edge='start' color='inherit' onClick={() => setOpen(false)}>
							<MenuIcon />
						</IconButton>
						<img src={Logo} alt='...' style={{ height: 60, marginLeft: 30, marginRight: 'auto' }} />
					</div>
					<Divider />
				</Paper>
			</Drawer>
			<footer style={{ bottom: 0, position: 'fixed', width: '100%' }}>
				<Container maxWidth='sm'>
					<Typography align='center'>Mditran © {new Date().getFullYear()}</Typography>
				</Container>
			</footer>
		</>
	)
}

export default Layout