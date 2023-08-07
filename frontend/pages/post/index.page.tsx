import {Button, Col, Divider, Form, Input, InputNumber, Radio, RadioChangeEvent, Row, Space} from "antd";
import {useState} from "react";
import axios from "axios";

const {TextArea} = Input;

export {Page}

function Page() {
	const [state, setState] = useState("private");
	const options = [
		{label: "Private Lister", value: "private"},
		{label: "Hotel Affiliate", value: "hotel"},
	]

	function onChange({ target: { value } }: RadioChangeEvent)  {
		console.log('radio checked', value);
		setId(0);
		setIdValid(false);
		setState(value);
	}

	function changeId(a: number | null) {
		setId(a ? a : 0);
	}

	const [id, setId] = useState(0);
	const [idValid, setIdValid] = useState(false);

	function validate_id() {
		console.log(state);
		axios.post("http://localhost:3001/check-poster-id", {
			id_type: state,
			ID: id,
		}).then((response) => {
			console.log(response);
			const id_valid = response.data.found;
			setIdValid(id_valid);
		}).catch((error) => {
			console.error('Error checking ID:', error);
		});
	}

	return <>
		<Row gutter={[8, 8]}>
			<Col offset={8} span={16}>
				<h1>Create Listing</h1>
			</Col>
			<Col offset={8} span={16}>
				<Space>
					Post as: <Radio.Group value={state} options={options} onChange={onChange} optionType="button"/>
				</Space>
			</Col>
			<Col offset={8} span={16}>
				<Space>
					<InputNumber addonBefore={"ID:"} controls={false} onChange={changeId} value={id}/>
					<Button type="primary" onClick={validate_id}>Validate ID</Button>
				</Space>
			</Col>
			<Col offset={8} span={8}>
				<Divider />
			</Col>
		</Row>
		<Row gutter={[8, 8]}>
			<Col offset={8}>
			{state === "private" ?
				<Form disabled={!idValid}>
					<Form.Item label="Rentable Unit ID">
						<Input />
					</Form.Item>
					<Form.Item label="Cost ($/night)">
						<Input />
					</Form.Item>
					<Form.Item label="Description">
						<TextArea />
					</Form.Item>
				</Form> : <Form disabled={!idValid}>
					<Form.Item label="Rentable Unit ID">
						<Input />
					</Form.Item>
					<Form.Item label="Room Number">
						<Input />
					</Form.Item>
					<Form.Item label="Cost ($/night)">
						<Input />
					</Form.Item>
					<Form.Item label="Description">
						<TextArea />
					</Form.Item>
				</Form>
			}
			</Col>
		</Row>
	</>
}