import { IoMdStar } from 'react-icons/io'
import { IoMenuSharp } from 'react-icons/io5'

//imports................................................................

function Navabr() {
	return (
		<div className='w-full sticky top-0 bg-[#1976D2] flex justify-between shadow-black/30 shadow-md py-2 px-3'>
			<div className='flex items-center justify-center text-white gap-4 px-2'>
				<IoMenuSharp />
				<h1 className='text-xs'>Typography</h1>
			</div>
			<div className='flex items-center justify-center text-white gap-4 px-2'>
				<IoMdStar />
				<div className='size-6 rounded-full bg-gray-400 flex items-center justify-center text-center text-xs'>
					OP
				</div>
			</div>
		</div>
	)
}

export default Navabr
