const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))


const port = process.env.PORT || 3000;

// Tama alla oleva ei toiminut
// app.use('/', (req, res) => {
//     res.redirect('/comments')
// })

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go for a walk with my dog'
    },
    {
        id: uuid(),
        username: 'Jarmo',
        comment: 'Tanaan ma en aio syoda enaa mitaan'
    },
    {
        id: uuid(),
        username: 'Jorma',
        comment: 'Ma syon illalla makkaraa ja katon Tapparan pelia'
    }
]

// Ensimmainen yritys saada tama toimimaan

app.get('/', (req, res) => {
    res.render('comments/index.ejs', { comments })
})

app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show.ejs', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat}`)
})

// app.listen(3000, () => {
//     console.log("LISTENING PORT 3000")
// })

app.listen(port, "0.0.0.0", function() {
    console.log("Listening to Port 3000")
})



// GET /comments - list all comments
// POST /comments - Create a new comments
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment


