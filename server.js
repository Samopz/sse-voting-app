const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 3000

 
app.use(cors())

const votes = {}

app.use(express.static('public'));

app.get('/vote', (req, res) => {
    console.log(req.query)
    const { name } = req.query;

    if (votes[name]) {
        votes[name] += 1
    } else {
        votes[name] = 1
    }

    return res.status(200).json({ message: 'vote successful'})
})

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');


    const sendData = (data) => {
        console.log(votes)
        const newData = Object.assign(data)
        res.write(`data: ${JSON.stringify(newData)}\n\n`)
    }

    setInterval(() => {
        console.log(votes)
        sendData({ votes })
    }, 10000) //10sec

      setInterval(
        () =>
          sendData({
            time: `Current time: ${new Date().toLocaleTimeString()}`,
          }),
        5000
      );

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

