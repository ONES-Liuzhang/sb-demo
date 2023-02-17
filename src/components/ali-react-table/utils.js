/**
 * 获取叶子节点
 * @param {*} columns
 * @returns
 */
export function getLeafNode(columns) {
  return columns.length;
}

/**
 * 获取叶子节点数量
 * @param {*} columns
 * @returns
 */
export function getLeafNodeCount(columns) {
  return getLeafNode(columns).length;
}
