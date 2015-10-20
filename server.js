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

server.listen(8080, function (data) {
  console.log('Server listen port 8080')
})

var socketIO = require('socket.io')(server)

socketIO.on('connection', function (socket) {

  socket.on('chatRes', function (data) {
    socketIO.emit('newChat', {text: data.text})
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

})
