import { Accordion, Button } from "react-bootstrap";
import { menuSections } from "./Menu";

const sections = menuSections;

export const Cart = ({ order, removeItem }) => {
  const totals = sections.map((section) => {
    return order[section].reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  });

  const finalTotal = totals.reduce((total, subtotal) => total + subtotal, 0);
  return (
    <>
      <Accordion defaultActiveKey="total" alwaysOpen>
        {sections.map((section) => {
          return order[section].map((item) => (
            <CartItem
              key={item.id}
              item={item}
              section={section}
              removeItem={removeItem}
            />
          ));
        })}
        <Accordion.Item eventKey="total" e>
          <Accordion.Header>
            <div>Total: ${finalTotal}</div>
          </Accordion.Header>
          <Accordion.Body>
            {totals.map((t, index) => (
              <div key={index} className="d-flex justify-content-between">
                <span>Total of {sections[index]}</span>
                <span>${t}</span>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

const CartItem = ({ item, section, removeItem }) => {
  const removeItemFromOrder = (variant) => {
    removeItem(item, section, variant);
  };
  return (
    <Accordion.Item eventKey={item.id}>
      <Accordion.Header>
        {item.qty} x {item.name}
      </Accordion.Header>
      {item.variants ? (
        <Accordion.Body>
          {item.variants.map((v) => (
            <div className="d-flex justify-content-between mb-2">
              <span>{v}</span>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => removeItemFromOrder(v)}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </div>
          ))}
        </Accordion.Body>
      ) : null}
    </Accordion.Item>
  );
};
