import {Radio, RadioChangeEvent} from "antd";
import {useState} from "react";

export {Page}

function Page() {
	const [state, setState] = useState("private");
	const options = [
		{label: "Private Lister", value: "private"},
		{label: "Hotel Affiliate", value: "public"},
	]

	const onChange = ({ target: { value } }: RadioChangeEvent) => {
		console.log('radio checked', value);
		setState(value);
	}

	return <>
		Post as:
		<Radio.Group value={state} options={options} onChange={onChange} optionType="button"/>
	</>
}