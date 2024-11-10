const express = require('express')
const app = express()
app.use(express.json());
const port = 2000
var cors = require('cors')

//#region Mongo DB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rn1nhf:0drUxII9Xa7BQEz3@cluster0.22tlsbv.mongodb.net/food');

const Product = mongoose.model('Product', {
  name: String,
  image: String,
  ingredients: [String],
  description: String
});
//#endregion

app.use(cors())

app.get('/api/product', async (req, res) => {
  let allProducts = await Product.find()
  res.json(allProducts)
})

app.post('/api/product', async (req, res) => {
  let product = req.body
  if(!product._id) product._id = new mongoose.Types.ObjectId()
  await Product.findByIdAndUpdate(product._id, product, {upsert: true})
  res.json({'status': true})
})
  
app.get('/', (req, res) => {
    res.send('Less 22  - Mongo DB/Atlas')
  })

app.listen(port, () => {
  console.log(`Less 22 http://localhost:${port}`)
})