import React from "react";
import Box from "../box";
import { dataSource, columns, createData } from "../../mock/table";
import { useTablePipeline, features } from "ali-react-table";
import AliReactTable from "./table";
import { HeaderRender } from "./pipeline";
import { cloneDeep } from "lodash-es";
import DraggableRow from "./draggable-row";
import { faker } from "@faker-js/faker";

const Base = React.memo(() => {
  return <AliReactTable dataSource={dataSource} columns={[columns[0]]} />;
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

/** 大数据表格 - 支持固定宽度 auto*/
const BigDataTable2 = React.memo(() => {
  const { columns, dataSource } = createData(
    {
      rowsNumber: 200,
      colsNumber: 3,
    },
    {
      mapRow: ({ colIndex, rowIndex, key }) => {
        return key === "id" ? rowIndex + 1 : colIndex === 1 ? faker.lorem.text() : faker.word.noun();
      },
    }
  );

  const pipeline = useTablePipeline();
  pipeline.input({ columns, dataSource }).primaryKey("id");
  pipeline.mapColumns((col) => {
    col.minWidth = col.minWidth ?? 100;
    return col;
  });

  return (
    <div className="bigDataTable2">
      <AliReactTable
        style={{ height: 300, overflow: "auto" }}
        useOuterBorder
        virtual={{
          horizontal: true,
          vertical: true,
          header: true,
        }}
        {...pipeline.getProps()}
      />
    </div>
  );
});

/** 大数据表格 - 支持固定宽度 - 100% */
const BigDataTable3 = React.memo(() => {
  const { columns, dataSource } = createData(
    {
      rowsNumber: 200,
      colsNumber: 3,
    },
    {
      mapRow: ({ colIndex, rowIndex, key }) => {
        return key === "id" ? rowIndex + 1 : colIndex === 1 ? faker.lorem.text() : faker.word.noun();
      },
    }
  );
  // hack 添加一列 auto
  columns.push({
    name: "_hack 宽度自适应列",
    code: "_hack",
    width: "auto",
  });
  const pipeline = useTablePipeline();
  pipeline.input({ columns, dataSource }).primaryKey("id");
  pipeline.mapColumns((col) => {
    col.minWidth = col.minWidth ?? 100;
    return col;
  });

  return (
    <div className="bigDataTable3">
      {/* <button onClick={onBtnTrigger}>切换列配置</button> */}
      <AliReactTable
        style={{ height: 300, overflow: "auto" }}
        useOuterBorder
        virtual={{
          horizontal: true,
          vertical: true,
          header: true,
        }}
        {...pipeline.getProps()}
      />
    </div>
  );
});

/** 列宽拖拽 */
const ColumnDraggableTable = () => {
  const { columns, dataSource } = React.useRef(
    createData({
      rowsNumber: 10,
      colsNumber: 10,
    })
  ).current;
  const pipeline = useTablePipeline()
    .input({ columns, dataSource })
    .use(
      features.columnResize({
        fallbackSize: 120,
        handleBackground: "#ddd",
        handleHoverBackground: "#aaa",
        handleActiveBackground: "#89bff7",
      })
    );

  return <AliReactTable {...pipeline.getProps()} />;
};

const RowDraggableTable = () => {
  const { columns, dataSource } = React.useRef(
    createData({
      rowsNumber: 300,
      colsNumber: 10,
    })
  ).current;
  const pipeline = useTablePipeline().input({ columns, dataSource });
  const tableProps = pipeline.getProps();

  console.log(tableProps);
  return (
    <AliReactTable
      style={{ height: "300px", overflow: "auto" }}
      {...tableProps}
      components={{
        Row: DraggableRow,
      }}
    />
  );
};

/**
 * 自定义表头 ❌ 无法实现
 * 需要修改 ali-react-table 内部代码
 *
 * headerRender
 */
const CustomHeaderTable = () => {
  const pipeline = useTablePipeline();
  pipeline
    .input({
      dataSource,
      columns,
    })
    .primaryKey("key")
    .use(
      HeaderRender({
        render: () => <div>自定义表头</div>,
      })
    );

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
      <Box
        title="大数据表格 - 支持固定宽度 auto"
        desc={`
        1. Table 宽度配置为 auto，整体宽度由外部容器 table-wrapper 撑开
        2. 为所有 col 都配置 min-width，可配置 defaultCellWidth（否则 Table 的默认最大宽度为 100%,无法撑开 table-wrapper）
        3. 如果要固定某列的宽度，则需要配置 width 和 min-width，并且它们应该配置相同的值

        （第一列为固定宽度，它配置了 width: 50px; min-width: 50px; 表格宽度减小时它不会按比例减小宽度）
      `}
      >
        <BigDataTable2 />
      </Box>
      <Box
        title="大数据表格 - 支持固定宽度 100%"
        desc={`
        1. Table 宽度配置为 100%
        2. 为所有 col 都配置 min-width，可配置 defaultCellWidth（否则 Table 无法撑开 table-wrapper）
        3. 如果要固定某列的宽度，则需要配置 width 和 min-width，并且它们应该配置相同的值
      `}
      >
        <BigDataTable3 />
      </Box>
      <Box title="列宽可拖拽">
        <ColumnDraggableTable />
      </Box>
      <Box title="行拖拽">
        <RowDraggableTable />
      </Box>
      <Box
        title="自定义表头 - headerRender"
        desc={`
        无法实现整行自定义，需要修改底层
          1. 设置 hasHeader 为 false
          2. newHeader = headerRender()
          3. 处理新 Header 横向滚动条逻辑
      `}
      >
        <CustomHeaderTable />
      </Box>
    </div>
  );
};

export default AliReactTablePage;
