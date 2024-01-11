import { MenuSection } from "./MenuSection";
import menuConfig from "../menu.json";

export const menuSections = [...menuConfig.map((s) => s.name), "Delivery"];

export const Menu = ({ addItem }) => {
  return (
    <div>
      <h1 className="text-center">Menu</h1>
      {menuConfig.map((section) => {
        return (
          <MenuSection
            key={section.name}
            title={section.name}
            items={section.items}
            addItem={addItem}
          />
        );
      })}
    </div>
  );
};
