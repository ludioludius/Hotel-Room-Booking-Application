import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {Card, Col, Input, Menu, Row, Slider, Space} from "antd";
import type {MenuProps} from "antd";
import axios from "axios";

export {Page}

type Listing = {
	HotelListing_ID: number,
	Cost: number,
	Description: string,
	Name: String,
	NumBeds: number,
	NumPeople: number,
	NumRooms: number,
}

function Page() {
	const [listings, setListings] = useState<Listing[]>([]);

	const [peopleRange, setPeopleRange] = useState<[number, number]>([0, 20]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
	const [items, _] = useState<MenuProps['items']>([
		{
			label: "Price:",
			key: 0,
		},
		{
			label: <Slider range max={1000} defaultValue={priceRange} onChange={setPriceRange}/>,
			key: 1,
		},
		{
			label: "People:",
			key: 2,
		},
		{
			label: <Slider range max={20} defaultValue={peopleRange} onChange={setPeopleRange}/>,
			key: 3,
		},
	]);

	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios.get(`http://localhost:3001/api/HotelListing/${priceRange[0]}/${priceRange[1]}/${peopleRange[0]}/${peopleRange[1]}`).then((res) => {
			console.log(res.data);
			setListings(res.data);
		});
	}, [peopleRange, priceRange]);

	return <>
		<Row>
			<Col span={4}>
				<Menu mode="vertical" items={items} style={{height: "100%"}} />
			</Col>
			<Col span={10} offset={6}>
				<Space direction="vertical">
					<h1>Listings</h1>
					<Space>Search: <Input addonAfter={<SearchOutlined />} onChange={e => setFilter(e.target.value)} /></Space>
					{listings.filter(listing => {
						// filter with search bar
						return listing.Name.toLowerCase().includes(filter.toLowerCase()) || listing.Description.toLowerCase().includes(filter.toLowerCase())
					}).map((listing, index) => {
						return <Row key={index}>
							<Card style={{width: "400px"}}  title={listing.Name} actions={[<a href={"/listings/hotel/" + listing.HotelListing_ID}>book</a>]}>
								<Card.Grid hoverable={false} style={{width: "60%"}}>{listing.Description}</Card.Grid>
								<Card.Grid hoverable={false} style={{width: "40%"}}>
									<Space direction="vertical">
										<div>Beds: {listing.NumBeds}</div>
										<div>Rooms: {listing.NumRooms}</div>
										<div>${listing.Cost}/night</div>
									</Space>
								</Card.Grid>
							</Card>
						</Row>
					})}
				</Space>
			</Col>
		</Row>
	</>
}