import React from "react";

/**
 * 自定义可拖拽行
 */
const DraggableRow = React.memo((props) => {
  const { row, rowIndex, trProps } = props;
  // const { isDragging, dragProps } = row.draggableProps;
  return (
    <tr
      {...trProps}
      // {...dragProps}
      onClick={() => {
        console.log("onRowClick", row, rowIndex);
      }}
      style={{
        ...trProps.style,
        cursor: "move",
        // opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
});

export default DraggableRow;
