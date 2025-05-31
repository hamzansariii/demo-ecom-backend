const express = require("express")
const app = express()
const port = process.env.PORT || 3010
const cors = require('cors')
require('./models/index')



app.use(cors({ origin: '*' }));
app.use(express.json())
app.use('/api', require('./routes'))


app.get("/", (req, res) => {
    console.log("requesr")
    res.status(200).json({ message: "Hello" })
})



app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})