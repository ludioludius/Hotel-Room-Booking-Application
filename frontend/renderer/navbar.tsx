import { UserOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Col, Row, Menu} from 'antd';
import {usePageContext} from "./usePageContext";

const items: MenuProps['items'] = [
	{
		label: 'Post Listing',
		key: '/post',
		icon: <EditOutlined />,
	},
	{
		label: 'Button Two',
		key: '/listings',
		icon: <UnorderedListOutlined />,
	},
	{
		label: 'Button Three',
		key: '/user',
		icon: <UserOutlined />,
	},
];

export default function Navbar() {
	const pageContext = usePageContext();
	const path = pageContext.urlPathname || "";
	console.log(path);

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		window.location.href = e.key;
	};

	return <Row justify="space-between">
		<Col><a style={{textDecoration: "none"}} href="/">asdf</a></Col>
		<Col><Menu onClick={onClick} selectedKeys={[path]} mode="horizontal" items={items} /></Col>
	</Row>;
}