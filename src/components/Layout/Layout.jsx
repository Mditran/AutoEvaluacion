import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Control from '../../assets/img/control.png';
import Logo from '../../assets/img/Logo.png';
import Chart_fill from '../../assets/img/Chart_fill.png';
import Chat from '../../assets/img/Chat.png';
import User from '../../assets/img/User.png';
import Calendar from '../../assets/img/Calendar.png';
import Search from '../../assets/img/Search.png';
import Chart from '../../assets/img/Chart.png';
import Folder from '../../assets/img/Folder.png';
import Periodo from '../views/Periodos';
import Dashboard from '../views/Dashboard';
import Labor from '../views/Labores';

const Layout = () => {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log('Entro');
		localStorage.removeItem('auth');
		window.location.href = '/login';
	};
	
	const Menus = [
		{ title: 'Dashboard', src: `${Chart_fill}`, path: '' },
		{ title: 'Periodos', src: `${Chat}`, path: '/app/periodos' },
		{ title: 'Accounts', src: `${User}`, gap: true, path: '/app/accounts' },
		{ title: 'Schedule', src: `${Calendar}`, path: '/app/schedule' },
		{ title: 'Search', src: `${Search}`, path: '/app/search' },
		{ title: 'Analytics', src: `${Chart}`, path: '/app/analytics' },
		{ title: 'Files', src: `${Folder}`, gap: true, path: '/app/files' },
		{ title: 'Log out', src: 'Log_out', path: handleLogout  },
		{ title: 'Labores', src: `${Chat}`,path:'/app/labores'}
	];

	


	return (
		<div className="flex">
		<div
			className={` ${
			open ? 'w-72' : 'w-20 '
			} bg-gray-950 text-gray-300 h-screen p-5  pt-8 relative duration-300`}
		>
			<img
			src={Control}
			alt=""
			className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-950 border-2 rounded-full  ${
				!open && 'rotate-180'
			}`}
			onClick={() => setOpen(!open)}
			/>
			<div className="flex gap-x-4 items-center">
			<img
				src={Logo}
				alt=""
				className={`cursor-pointer duration-500 ${
				open && 'rotate-[360deg]'
				}`}
			/>
			<h1
				className={`text-gray-300 origin-left font-medium text-xl duration-200 ${
				!open && 'scale-0'
				}`}
			>
				Designer
			</h1>
			</div>
			<ul className="pt-6">
			{Menus.map((Menu, index) => (
				<li
				key={index}
				className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
			${Menu.gap ? 'mt-9' : 'mt-2'} ${
					index === 0 && 'bg-light-white'
				} `}
				onClick={() => {
					if (typeof Menu.path === 'function') {
						Menu.path();
					} else {
						navigate(Menu.path);
					}
				}}
				>
				<img src={Menu.src} alt="" />
				<span
					className={`${!open && 'hidden'} origin-left duration-200`}
				>
					{Menu.title}
				</span>
				</li>
			))}
			</ul>
		</div>
		<div className="h-screen flex-1 p-7">
			<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/periodos" element={<Periodo />} />
			<Route path="/labores" element={<Labor/>} />
			</Routes>
		</div>
		</div>
	);
};

export default Layout;
