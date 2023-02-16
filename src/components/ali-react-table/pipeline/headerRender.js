export const headerRender = (opts) => {
  return (pipeline) => {
    pipeline.getColumns();
  };
};
