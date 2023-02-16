import React from "react";
import Box from "../box";
import { dataSource, columns, createData } from "../../mock/table";
import { BaseTable as AliReactTable, useTablePipeline, features } from "ali-react-table";
import { cloneDeep } from "lodash-es";

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
const BigDataTable = () => {
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
};

const AliReactTablePage = () => {
  return (
    <div>
      <Base />
    </div>
  );
};

export default AliReactTablePage;
