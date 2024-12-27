import Navabr from './components/navabar/Navabr'
import Sidebar from './components/sidebar/Sidebar'
import Users from './components/users/Users'

//imports................................................................

function App() {
	return (
		<div className='w-full flex flex-col relative max-h-dvh'>
			<Navabr />
			<div className='w-full flex h-dvh'>
				<Sidebar />
				<Users />
			</div>
		</div>
	)
}

export default App
