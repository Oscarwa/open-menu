import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { Cart } from "./components/Cart";
import { Menu, menuSections } from "./components/Menu";
import { useState } from "react";
import { Delivery } from "./components/Delivery";

export const App = () => {
  const initialState = menuSections.reduce((result, s) => {
    result[s] = [];
    return result;
  }, {});
  const [order, setOrder] = useState(initialState);

  const friendlyOrderText = (order) => {
    const totals = menuSections.map((section) => {
      return order && order[section]
        ? order[section].reduce(
            (total, item) => total + item.price * item.qty,
            0
          )
        : 0;
    });

    const finalTotal = totals.reduce((total, subtotal) => total + subtotal, 0);

    const result = order
      ? Object.keys(order)
          .map((section) => {
            return order[section]
              .map((item) => {
                let detailText = "";
                if (item.variants) {
                  const detail = item.variants.reduce((result, variant) => {
                    if (result[variant]) result[variant]++;
                    else {
                      result[variant] = 1;
                    }
                    return result;
                  }, {});
                  detailText = Object.keys(detail)
                    .map((key) => {
                      return `  * ${detail[key]} x ${key}`;
                    })
                    .join("\r\n");
                }
                return `${item.qty} x ${item.name}\n${detailText}`;
              })
              .join("\r\n");
          })
          .join("\r\n")
      : "";

    return result + `\n\n Total: $${finalTotal}`;
  };

  const addItemToOrder = (item, section, variant = "Regular") => {
    if (order[section].length === 0) {
      order[section].push({ ...item, qty: 1, variants: [variant] });
    } else {
      const match = order[section].find((i) => i.id === item.id);
      if (match) {
        match.qty += 1;
        match.variants.push(variant);
      } else {
        order[section].push({ ...item, qty: 1, variants: [variant] });
      }
    }
    setOrder({ ...order });
  };
  const removeItemFromOrder = (item, section, variant) => {
    const match = order[section].find((i) => i.id === item.id);
    if (match.qty === 1) {
      const indexToDelete = order[section].indexOf(match);

      if (indexToDelete !== -1) {
        order[section].splice(indexToDelete, 1);
      }
    } else {
      match.qty -= 1;
      const indexToDelete = match.variants.indexOf(variant);

      if (indexToDelete !== -1) {
        match.variants.splice(indexToDelete, 1);
      }
    }

    setOrder({ ...order });
  };

  const addDelivery = (delivery) => {
    if (delivery) {
      order["Delivery"] = [
        { name: `Delivery to: ${delivery.to}`, price: delivery.fee, qty: 1 },
      ];
    } else {
      order["Delivery"] = [];
    }
    setOrder({ ...order });
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={8}>
            <Menu addItem={addItemToOrder} />
          </Col>
          <Col xs={4}>
            <h3>Your cart!</h3>
            <Cart order={order} removeItem={removeItemFromOrder} />
            <Delivery addDelivery={addDelivery} />
            <a
              href={`https://wa.me/525555555555?text=${encodeURI(
                friendlyOrderText(order)
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-100 mt-4"
              size="lg"
            >
              Order now!
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
