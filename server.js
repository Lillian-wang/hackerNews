const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

let lists = [];
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/api/getLists', (req, res) => {
  res.send(lists);
});

app.post('/api/addList', (req, res) => {
  lists.push(req.body.itemContent)
  console.log('req', req.body, 'lists', lists)
  res.json({ message: 'OK!' })
});

app.delete('/api/deleteItem/:itemId', (req, res) => {
  lists.splice(req.params.itemId, 1);
  res.json({ message: 'OK!' })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
