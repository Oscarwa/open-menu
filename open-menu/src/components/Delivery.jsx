import { FloatingLabel, Form } from "react-bootstrap";
import deliveryConfig from "../delivery.json";

export const Delivery = ({ addDelivery }) => {
  const onSelect = (item) => {
    const match = deliveryConfig.find((d) => d.to === item);
    addDelivery(match || null);
  };
  return (
    <>
      <FloatingLabel label="Delivery">
        <Form.Select
          className="mt-4"
          onChange={(e) => onSelect(e.target.value)}
        >
          <option>Take out</option>
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
