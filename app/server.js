const app         = require('express')();
const low         = require('lowdb');
const FileSync    = require('lowdb/adapters/FileSync');
const adapter     = new FileSync('db.json');
const db          = low(adapter);
const bodyParser  = require('body-parser');
var dia           = new Date();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

db.defaults({ search_g: [] }).write()
db.defaults({ result_g: [{"id": 0,"Data": "Data","palavra": "Palavra","posicao": "Posição"}] }).write()
db.defaults({ palavr_g: [] }).write()


app.get("/",(req,res) => {
  res.send("server run ...");
});

app.get('/estatistica', (req, res ) => {
  let view = db.get('result_g').write();
  res.send(view);
})

app.get('/position',(req, res) => {
  let position = db.get('search_g').size("id").value()
  res.json(parseFloat(position));
});

app.get('/palavras', (req, res ) => {
  let view = db.get('palavr_g').write();
  res.send(view);
})

app.get('/resert',(req, res) =>{
  db.get('search_g').remove({ palavra: "ok" }).write();
  db.get('result_g').remove({}).write();
  res.send("DELETE");
})

app.get('/remove_all',(req, res) =>{
  db.get('palavr_g').remove({}).write();
  res.send("DELETE");
})

app.post('/add_position', (req, res) => {
  var dados      = db.get('search_g').write()
  var id         = dados.length-1
  const result   = db.get('search_g')
  .push({
          "id":id+1 ,
          "palavra": req.body.palavra,
        }).write();
  res.send("status 200");
});

app.post('/add_result', (req, res) => {
  var d = new Date();
  var curr_date  = d.getDate();
  var curr_month = d.getMonth() + 1; 
  var curr_year  = d.getFullYear();
  var dados      = db.get('result_g').write()
  var id         = dados.length
  const result   = db.get('result_g')
  
  .push({
          "id":      id+1 ,
          "Data":    curr_date + "-" + curr_month + "-" + curr_year,
          "palavra": decodeURI(req.body.palavra),
          "posicao": req.body.posicao
        }).write();
  res.send("status 200");
});

app.post('/add_palavras', (req, res) => {
  var dados      = db.get('palavr_g').write()
  var id         = dados.length
  const result   = db.get('palavr_g')
  .push({
          "id"      : id+1 ,
          "url"     : req.body.url,
          "palavras": req.body.palavras
        }).write();
  res.send("status 200");
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});

