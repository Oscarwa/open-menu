import { Button, Card } from "react-bootstrap";

const cookTimeMap = ["", "#3caf8c", "#ffd952", "#f14b74"];

export const MenuSection = ({ title, items, addItem }) => {
  const addItemToOrder = (item, variant) => {
    addItem(item, title, variant);
  };
  return (
    <section className="mb-5">
      <h2>{title}</h2>
      {items.map((i) => (
        <Card key={i.id} className="mb-2">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h4>
                {i.name}{" "}
                {i.cookTime ? (
                  <i
                    className="fa-regular fa-clock fa-2xs ms-2"
                    style={{ color: cookTimeMap[i.cookTime] }}
                  ></i>
                ) : null}
                {i.vegetarian ? (
                  <i
                    className="fa-solid fa-leaf fa-2xs ms-2"
                    style={{ color: "#3caf8c" }}
                  ></i>
                ) : null}
                {i.recommended ? (
                  <i
                    className="fa-solid fa-award fa-sm ms-2"
                    style={{ color: "#74c0fc" }}
                  ></i>
                ) : null}
              </h4>
              <span>${i.price}</span>
            </div>
            <Card.Text className="d-flex justify-content-between">
              <div className="text-secondary">{i.description}</div>
              <div>
                {i.variants ? (
                  <div>
                    {i.variants.map((v) => (
                      <Button
                        key={v}
                        className="ms-2"
                        size="sm"
                        variant="outline-success"
                        onClick={() => addItemToOrder(i, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={() => addItemToOrder(i)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                )}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
};
