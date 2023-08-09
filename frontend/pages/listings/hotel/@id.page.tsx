import {usePageContext} from "../../../renderer/usePageContext";
import {Button, Col, DatePicker, Divider, Form, InputNumber, Row, Space} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";

export {Page}

type Listing = {
	Cost: number,
	Description: string,
}

function Page() {
	const context = usePageContext();
	const url = context.urlPathname;
	const id = url.split("/")[3];

	const [listing, setListing] = useState<Listing>({Cost: 0, Description: ""});
	const [idValid, setIdValid] = useState(false);
	const [reservationDates, setReservationDates] = useState<Date[][]>([]);

	const [customerId, setCustomerId] = useState(0);

	useEffect(() => {
		axios.get(`http://localhost:3001/api/hotel-listing/${id}`).then((res) => {
			console.log(res.data);
			setListing(res.data[0]);
		});
	}, []);

	useEffect(() => {
		axios.get(`http://localhost:3001/api/reservations/hotel/${id}`).then((res) => {
			console.log(res.data);
			setReservationDates([]);
			res.data.map((x: { StartDate: Date; Duration: any; }) => {
				const end = new Date(x.StartDate);
				end.setDate(end.getDate() + x.Duration);
				setReservationDates([...reservationDates, [x.StartDate, end]]);
			});
		});
	}, []);

	function validate_id() {
		axios.get(`http://localhost:3001/api/check-customer-id/${customerId}`).then((response) => {
			console.log(response);
			const id_valid = response.data.length > 0;
			setIdValid(id_valid);
		}).catch((error) => {
			console.error('Error checking ID:', error);
		});
	}

	return <>
		<Row gutter={[8, 8]}>
			<Col offset={8} span={16}>
				<h1>Book Room</h1>
			</Col>
			<Col offset={8} span={16}>
				{listing.Description}
			</Col>
			<Col offset={8} span={16}>
				Cost: ${listing.Cost}/night
			</Col>
			<Col offset={8} span={16}>
				<Space>
					<InputNumber addonBefore={"ID:"} controls={false} onChange={e => setCustomerId(e?e:0)} defaultValue={customerId}/>
					<Button type="primary" onClick={validate_id}>Validate ID</Button>
				</Space>
			</Col>
			<Col offset={8} span={8}>
				<Divider />
			</Col>
		</Row>
		<Row gutter={[8, 8]}>
			{reservationDates.length > 0 && <Col offset={8} span={16}>
				There are already reservations at this location for the following dates:
				{reservationDates.map((x, index) => {
					return <div key={index}><>{new Date(x[0]).toLocaleDateString()} - {x[1].toLocaleDateString()}</></div>;
				})}
			</Col>}
			<Col offset={8}>
				<Form disabled={!idValid} onFinish={values => {
					console.log(values);
					axios.post(`http://localhost:3001/api/hotel/add-reservation`, {
						StartDate: values.dates[0]["$d"].toISOString().slice(0, 19).replace('T', ' '),
						EndDate: values.dates[1]["$d"].toISOString().slice(0, 19).replace('T', ' '),
						Duration: Math.round((values.dates[1]["$d"] - values.dates[0]["$d"]) / (1000 * 60 * 60 * 24)),
						CustomerID: customerId,
						HotelListingID: id,
					}).then((res) => {
						console.log(res);
					}).catch((error) => {
						console.error('Error making reservation:', error);
					});
				}}>
					<Form.Item label="Rentable Unit ID" name="dates">
						<DatePicker.RangePicker onChange={() => {}}/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">Submit</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	</>;
}