import { FloatingLabel, Form } from "react-bootstrap";
import deliveryConfig from "../delivery.json";

export const Delivery = ({ addDelivery }) => {
  const onSelect = (item) => {
    const match = deliveryConfig.find((d) => d.to === item);
    console.log(match);
    addDelivery(match || null);
  };
  return (
    <>
      <FloatingLabel label="Delivery">
        <Form.Select
          className="mt-4"
          onChange={(e) => onSelect(e.target.value)}
        >
          <option>Select an option</option>
          {deliveryConfig.map((d) => (
            <option value={d.to}>
              {d.to} - ${d.fee}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </>
  );
};
