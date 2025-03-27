import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContextProvider";

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useContext must be used within the ItemsContextProvider");
  }
  return context;
}
