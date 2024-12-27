import { DatePicker, Input, Select, Table } from 'antd'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import * as Yup from 'yup'
import { v4 as idGenerator } from 'uuid'
import dayjs from 'dayjs'
import UsersColumn from './UsersColumn'

//imports................................................................
const getAge = birthDate =>
	Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10)

const leagues = ['laliga', 'champions league', 'premier league']

function Users() {
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [addNew, setAddNew] = useState(false)
	const [updated, setUpdated] = useState(false)
	const [data, setData] = useState([
		{
			key: '1',
			name: 'John Brown',
			DOB: '12/12/1998',
			height: 1.79,
			status: 'active',
			position: 'forward',
			leagues: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			DOB: '12/02/2000',
			height: 1.76,
			status: 'retired',
			position: 'backward',
			leagues: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			DOB: '12/10/2001',
			height: 1.69,
			status: 'active',
			position: 'midfielder',
			leagues: ['cool', 'teacher'],
		},
		{
			key: '4',
			name: 'Jim Green',
			DOB: '12/12/1988',
			height: 1.76,
			status: 'retired',
			position: 'backward',
			leagues: ['loser'],
		},
		{
			key: '5',
			name: 'Joe Black',
			DOB: '12/12/1988',
			height: 1.69,
			status: 'active',
			position: 'midfielder',
			leagues: ['cool', 'teacher'],
		},
	])
	const columns = UsersColumn()
	const onSelectChange = newSelectedRowKeys => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys)
		setSelectedRowKeys(newSelectedRowKeys)
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	}

	const formik = useFormik({
		initialValues: {
			key: '',
			name: '',
			position: '',
			height: '',
			leagues: [],
			status: 'active',
			DOB: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required(),
			height: Yup.number().required(),
			position: Yup.string().required(),
			DOB: Yup.string().required(),
			name: Yup.string().required(),
		}),
		onSubmit: user => {
			setData(prev => [
				...prev,
				{
					...user,
					key: idGenerator(),
					age: dayjs().diff(dayjs(user.DOB), 'years'),
				},
			])
			setAddNew(false)
		},
	})

	useEffect(() => {
		setData(prev =>
			prev.map(user => {
				return { ...user, age: dayjs().diff(dayjs(user.DOB), 'years') }
			})
		)
	}, [updated])
	console.log(data)

	return (
		<div className='p-6 flex flex-col gap-5 w-full max-h-dvh overflow-y-auto'>
			{addNew ? (
				<>
					<h1 className='capitalize text-xl'>User Information Form</h1>
					<form
						onSubmit={formik.handleSubmit}
						className='w-[70%] flex flex-col gap-5'
					>
						<div className='grid grid-cols-2 gap-5'>
							<Input
								type='text'
								name='name'
								size='large'
								id='name'
								placeholder='Player Name'
								value={formik.values.name}
								onChange={formik.handleChange}
								className='outline-none border text-xs rounded-md p-1'
							/>
							<DatePicker
								type='date'
								size='large'
								name='DOB'
								id='DOB'
								format={'DD/MM/YYYY'}
								placeholder='Date of Birth'
								onChange={value =>
									formik.setFieldValue('DOB', dayjs(value).format('DD/MM/YYYY'))
								}
								className='outline-none border text-xs rounded-md p-1'
							/>
							<Select
								onChange={value => formik.setFieldValue('leagues', value)}
								placeholder='Select Played Leagues'
								className='w-full'
								size='large'
								showSearch
								mode='multiple'
								optionFilterProp='children'
								filterOption={(input, option) =>
									option.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
							>
								{leagues.map(league => (
									<Select.Option value={league} key={league}>
										{league}
									</Select.Option>
								))}
							</Select>
							<Select
								onChange={value => formik.setFieldValue('status', value)}
								placeholder='Status'
								className='w-full'
								size='large'
							>
								<Select.Option value={'active'}>Active</Select.Option>
								<Select.Option value={'retired'}>Retired</Select.Option>
							</Select>
							<Input
								suffix='m'
								name='height'
								value={formik.values.height}
								onChange={formik.handleChange}
								placeholder='Height'
								size='large'
							/>
							<Select
								onChange={value => formik.setFieldValue('position', value)}
								placeholder='Position'
								className='w-full'
								size='large'
							>
								<Select.Option value='forward'>Forward</Select.Option>
								<Select.Option value='backward'>Backward</Select.Option>
								<Select.Option value='midfielder'>Midfielder</Select.Option>
							</Select>
						</div>
						<div className='w-full flex justify-end'>
							<button
								type='submit'
								className='bg-[#1976D2] text-white text-sm rounded px-5 py-1'
							>
								Submit
							</button>
						</div>
					</form>
				</>
			) : (
				<>
					<h1 className='capitalize text-xl'>User Management</h1>
					<div className='w-full shadow'>
						<div className='w-full flex p-2 justify-between items-center'>
							<div className='flex justify-center items-center gap-3'>
								<input
									className='outline-none border rounded text-xs p-2'
									type='search'
									placeholder='Search by name, DOB, etc...'
								/>
								<FaFilter className='cursor-pointer text-sm text-gray-500' />
							</div>
							<button
								onClick={() => setAddNew(true)}
								className='uppercase text-[#1976D2] h-fit rounded text-xs border border-[#1976D2] px-5 py-1'
							>
								new
							</button>
						</div>
						<Table
							columns={columns}
							pagination={{ pageSize: 5 }}
							rowSelection={rowSelection}
							dataSource={data}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Users
