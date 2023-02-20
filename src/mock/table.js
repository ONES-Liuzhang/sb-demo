import { faker } from "@faker-js/faker";

const withKey = (dataList) => {
  if (!dataList || !Array.isArray(dataList)) return [];

  for (let i = 0; i < dataList.length; i++) {
    const item = dataList[i];
    item.key = item.key ?? faker.datatype.string(4);
    item.children = withKey(item.children);
  }

  return dataList;
};

const dataSource = withKey([
  { prov: "省份Group", type: "group", confirmed: 54406, cured: 4793, dead: 1457, t: "2020-02-15 19:52:02" },
  { prov: "湖北省", confirmed: 54406, cured: 4793, dead: 1457, t: "2020-02-15 19:52:02" },
  { prov: "广东省", confirmed: 1294, cured: 409, dead: 2, t: "2020-02-15 19:52:02" },
  { prov: "河南省", confirmed: 1212, cured: 390, dead: 13, t: "2020-02-15 19:52:02" },
  { prov: "浙江省", confirmed: 1162, cured: 428, dead: 0, t: "2020-02-15 19:52:02" },
  { prov: "湖南省", confirmed: 1001, cured: 417, dead: 2, t: "2020-02-15 19:52:02" },
]);

const columns = [
  { code: "prov", name: "省份", width: 150 },
  { code: "confirmed", name: "确诊", width: 100, align: "right" },
  { code: "cured", name: "治愈", width: 100, align: "right" },
  { code: "dead", name: "死亡", width: 100, align: "right" },
  { code: "t", name: "最后更新时间", width: 180 },
];

const createData = (rangeProps, options = {}) => {
  const { rowsNumber, colsNumber } = rangeProps;
  const { mapColumn, mapRow } = options;
  const columns = [];
  const dataSource = [];
  for (let i = 0; i < colsNumber; i++) {
    const code = faker.word.noun();
    const name = faker.word.noun();
    let colMap = mapColumn && mapColumn({ code, name, colIndex: i });
    colMap = colMap || {
      code,
      name,
      width: 150,
    };
    columns.push(colMap);
  }
  columns.unshift({
    code: "id",
    name: "序号",
    width: 50,
  });

  for (let i = 0; i < rowsNumber; i++) {
    const row = {};
    for (let j = 0; j < columns.length; j++) {
      if (columns[j]?.code) {
        const key = columns[j].code;
        const params = {
          colIndex: j,
          rowIndex: i,
          key,
        };
        row[key] = mapRow && mapRow(params);
        row[key] = row[key] || defaultMapRow(params);
      }
    }
    dataSource.push(row);
  }

  function defaultMapRow({ colIndex, rowIndex, key }) {
    return key === "id" ? rowIndex + 1 : faker.word.noun();
  }

  return {
    columns,
    dataSource,
  };
};

export { dataSource, columns, createData };
