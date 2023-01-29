/**
 * 1. dev 环境 express 中间件
 */
module.exports = (router) => {
  console.log("custom middleware 拦截")
  router.use('/aaa', async (req, res, next) => {
    res.send("嘻嘻嘻")
    await next()
  })
}