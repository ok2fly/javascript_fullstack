const http = require('http')

http.createServer((req,res) => {
  console.log(req.url,req.method)
  res.writeHead(200,{
    'content-type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'x-auth, content-type',
    'Accsee-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Credentials':true,

  })
  //允许 cookie 传输的
  // res.end(JSON.stringify({
  //   bookName:'PHP'
    
  // }))
  res.end(`
    getBook(${JSON.stringify({bookName:'PHP'})})
  `)
})
.listen(3000,() => {
  console.log('Server is running')
})