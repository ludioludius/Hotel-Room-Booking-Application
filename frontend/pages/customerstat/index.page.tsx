import {Button, Col, Divider, Form, Input, InputNumber, Radio, RadioChangeEvent, Row, Space} from "antd";
import {useState} from "react";
import axios from "axios";

const {TextArea} = Input;

export {Page}

function Page() {
    const [statsData, setStatsData] = useState(null);
  
    const fetchStatsData = () => {
      axios.get("http://localhost:3001/nested-group-by")
        .then(response => {
          setStatsData(response.data);
        })
        .catch(error => {
          console.error("Error fetching stats:", error);
        });
    };
  
    return (
        <>
        <h2>Customer Stats</h2>
        <Button type="primary" onClick={fetchStatsData}>Display Stats</Button>
        {statsData && (
            <div>
            <h1>Number of Reservations per Customer</h1>
            <table>
                <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Number of Reservations</th>
                </tr>
                </thead>
                <tbody>
                {statsData.map((item, index) => (
                    <tr key={index}>
                    <td>{item.CustomerID}</td>
                    <td>{item.num_reservations}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      )}
    </>
    );
  }