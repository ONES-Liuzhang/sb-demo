import React from "react";
import Box from "../box";
import { dataSource, columns, createData } from "../../mock/table";
import { BaseTable as AliReactTable, useTablePipeline, features } from "ali-react-table";
import { cloneDeep } from "lodash-es";
import DraggableRow from "./draggable-row";

const Base = React.memo(() => {
  return <AliReactTable dataSource={dataSource} columns={columns} />;
});

/**
 * hack row render
 *
 * 关键点：计算 colspan，根据 type 渲染 group
 */
const RowRender = React.memo(() => {
  const curDataSource = cloneDeep(dataSource);
  const fullColNumber = columns.length;
  const components = {
    Row: (props) => {
      const { row, trProps } = props;
      if (row?.type === "group") {
        return (
          <tr key={row.key} className="ones-virtual-table--row group-title">
            <td className="art-table-cell first last" colSpan={fullColNumber}>{`自定义渲染行-${row.prov}`}</td>
          </tr>
        );
      }
      return <tr key={row.key} {...trProps}></tr>;
    },
  };
  return (
    <AliReactTable
      style={{
        height: 300,
        width: 400,
      }}
      components={components}
      dataSource={curDataSource}
      columns={columns}
    />
  );
});

/** 行分组 */
const Group = React.memo(() => {
  // ctx
  const pipeline = useTablePipeline();
  pipeline
    .input({
      dataSource: [
        {
          key: "root",
          groupTitle: "分组标题1",
          children: dataSource,
        },
      ],
      columns,
    })
    .primaryKey("key")
    .use(features.rowGrouping({ defaultOpenAll: true }));

  return <AliReactTable {...pipeline.getProps()} />;
});

/** 大数据表格 */
const BigDataTable = React.memo(() => {
  const { columns, dataSource } = createData({
    rowsNumber: 200,
    colsNumber: 10,
  });
  const pipeline = useTablePipeline();
  pipeline.input({ columns, dataSource }).primaryKey("id");

  return (
    <AliReactTable
      style={{ width: 500, height: 300, overflow: "auto" }}
      useOuterBorder
      virtual={{
        horizontal: true,
        vertical: true,
        header: true,
      }}
      {...pipeline.getProps()}
    />
  );
});

/** 拖拽 */
const DraggableTable = () => {
  const pipeline = useTablePipeline({
    components: {
      Row: DraggableRow,
    },
  });
  pipeline
    .input({
      dataSource,
      columns,
    })
    .primaryKey("key");

  return (
    <AliReactTable
      {...pipeline.getProps()}
      components={{
        Row: DraggableRow,
      }}
    />
  );
};

/** 默认 Filter */

/** 自定义表头 */
const CustomHeaderTable = () => {
  const pipeline = useTablePipeline({
    components: DraggableRow,
  });
  pipeline
    .input({
      dataSource,
      columns,
    })
    .primaryKey("key");

  return <AliReactTable {...pipeline.getProps()} />;
};

const AliReactTablePage = () => {
  return (
    <div>
      <Box title="基本用法">
        <Base />
      </Box>
      <Box title="模拟 rowRender" desc="使用 `components.Row` 自定义">
        <RowRender />
      </Box>
      <Box title="行分组">
        <Group />
      </Box>
      <Box title="大数据">
        <BigDataTable />
      </Box>
      <Box title="拖拽">
        <DraggableTable />
      </Box>
      <Box title="自定义表头">
        <CustomHeaderTable />
      </Box>
    </div>
  );
};

export default AliReactTablePage;
