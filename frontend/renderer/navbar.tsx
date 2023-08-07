import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Col, Row, Menu} from 'antd';
import {usePageContext} from "./usePageContext";

const items: MenuProps['items'] = [
	{
		label: 'Post Listing',
		key: 'post',
		icon: <MailOutlined />,
	},
	{
		label: 'Button Two',
		key: '',
		icon: <AppstoreOutlined />,
	},
];

export default function Navbar() {
	const pageContext = usePageContext();
	const path = pageContext.url || "";
	console.log(path);

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		window.location.href = e.key;
	};

	return <Row justify="space-between">
		<Col span={8}><a style={{textDecoration: "none"}} href="/">asdf</a></Col>
		<Col span={4}><Menu onClick={onClick} selectedKeys={[path]} mode="horizontal" items={items} /></Col>
	</Row>;
}