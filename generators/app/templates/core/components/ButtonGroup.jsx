/* eslint-disable react/prop-types */
import { useItemStore } from "../stores/itemsStore";
import Button from "./Button";

export default function ButtonGroup() {
  const markAllAsComplete = useItemStore((state) => state.markAllAsComplete);
  const markAllAsInComplete = useItemStore(
    (state) => state.markAllAsInComplete
  );
  const resetToInitial = useItemStore((state) => state.resetToInitial);
  const removeAllItems = useItemStore((state) => state.removeAllItems);

  return (
    <section className="button-group">
      <Button onClick={markAllAsComplete} buttonType="secondary">
        Mark all as complete
      </Button>
      <Button onClick={markAllAsInComplete} buttonType="secondary">
        Mark all as incomplete
      </Button>
      <Button onClick={resetToInitial} buttonType="secondary">
        Reset to initial
      </Button>
      <Button onClick={removeAllItems} buttonType="secondary">
        Remove all items
      </Button>
    </section>
  );
}
