/* eslint-disable react/prop-types */
import Counter from "./Counter";
import Logo from "./Logo";
import { useItemStore } from "/<%= srcPath %>/stores/itemsStore";

export default function Header() {
  const items = useItemStore((state) => state.items);
  return (
    <header>
      <Logo />
      <h3> <%= appTitle %></h3>
      <Counter
        numberOfItemsPacked={items.filter((item) => item.packed).length}
        totalNumberofItems={items.length}
      />
    </header>
  );
}
