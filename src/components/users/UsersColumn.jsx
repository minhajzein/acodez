import { Tag } from 'antd'
import { useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'

//imports................................................................

const UsersColumn = (deleteRow, editRow) => {
	const [float, setFloat] = useState(false)

	return [
		{
			title: 'User',
			dataIndex: 'name',
			key: 'name',
			render: text => <a>{text}</a>,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Leagues Played',
			dataIndex: 'leagues',
			key: 'leagues',
			render: (_, { leagues }) => (
				<>
					{leagues.map(league => {
						return <Tag key={league}>{league.toUpperCase()}</Tag>
					})}
				</>
			),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_, { status }) =>
				status === 'active' ? (
					<Tag color='#87d068'>{status}</Tag>
				) : (
					<Tag color='#f50'>{status}</Tag>
				),
		},
		{
			title: 'Height',
			dataIndex: 'height',
			key: 'hieght',
		},
		{
			title: 'Position',
			dataIndex: 'position',
			key: 'position',
		},
		{
			key: 'action',
			render: (_, record) => <SlOptionsVertical />,
		},
	]
}
export default UsersColumn
