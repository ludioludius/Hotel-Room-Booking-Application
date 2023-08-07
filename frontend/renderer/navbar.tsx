import { UserOutlined, UnorderedListOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import {Menu} from 'antd';
import {usePageContext} from "./usePageContext";

const items: MenuProps['items'] = [
	{
		label: 'Post Listing',
		key: '/post',
		icon: <EditOutlined />,
	},
	{
		label: 'View Listings',
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

	return <div style={{display: "flex", justifyContent: "space-between"}}>
		<a href="/">name here</a>
		<Menu disabledOverflow={true} onClick={onClick} selectedKeys={[path]} mode="horizontal" items={items} />
	</div>;
}