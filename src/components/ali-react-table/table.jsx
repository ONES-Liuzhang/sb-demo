import { BaseTable } from "ali-react-table";
import { DndContext } from "@dnd-kit/core";

const AliReactTable = (props) => {
  return (
    <DndContext>
      <BaseTable {...props} />;
    </DndContext>
  );
};

export default AliReactTable;
