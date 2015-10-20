var http = require('http'),
    Router = require('router'),
    finalhandler = require('finalhandler'),
    fs = require('fs');

var router = Router()
router.get('/', function (req, res) {
  fs.readFile(__dirname + '/site/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
})

router.get('/main.css', (req, res) => {
  fs.readFile(__dirname + '/site/css/main.css',
    function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading main.css')
      }
      res.writeHead(200)
      res.end(data)
    })
})

var server = http.createServer((req, res) => {
  router(req, res, finalhandler(req, res))
})

server.listen(3000, function (data) {
  console.log('Server listen port 3000')
})

var socketIO = require('socket.io')(server)

socketIO.on('connection', function (socket) {
  socket.emit('chatRes', {hello: 'hello world'})
  socket.on('chatReq', function (data) {
    console.log('user say:'+data);
  })
})
