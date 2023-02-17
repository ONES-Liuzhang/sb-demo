export default function HeaderRender(opts) {
  const { render } = opts;

  return (pipeline) => {
    const columns = pipeline.getColumns();

    pipeline.columns(processColumns(columns));

    function processColumns(columns) {
      return columns.map((column, index) => {
        const col = { ...column };
        col.title = titleRender(index);
        return col;
      });
    }

    function titleRender(colIdx) {
      if (colIdx === 0) {
        return <td colSpan={columns.length}>{render()}</td>;
      } else {
        return null;
      }
    }

    return pipeline;
  };
}
