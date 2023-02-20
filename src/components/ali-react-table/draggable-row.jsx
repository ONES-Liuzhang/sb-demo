import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

/**
 * 自定义可拖拽行
 *
 * 取消连线
 */
const DraggableRow = React.memo((props) => {
  const { row, rowIndex, trProps } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useDraggable({
    id: `row-${rowIndex}`,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999, cursor: "grab" } : { cursor: "pointer" }),
  };
  return (
    <tr
      ref={setNodeRef}
      {...trProps}
      // onClick={() => {
      //   console.log("onRowClick", row, rowIndex);
      // }}
      style={{
        ...trProps.style,
        ...style,
      }}
      {...listeners}
      {...attributes}
    />
  );
});

export default DraggableRow;
