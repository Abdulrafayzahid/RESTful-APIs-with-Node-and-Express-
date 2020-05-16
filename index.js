const express = require('express');
const app = express();
const Joi = require('joi')
app.use(express.json())

const courses = [
    {id :1, name: "course1"},
    {id :2, name: "course2"},
    {id :3, name: "course3"}
]

app.get('/',(req, res) => {
    res.send("Hello world!!")
})


app.get('/api', (req,res) => {
    res.send("On get page")
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/course/:id', (req, res) => {
    const getCourse = courses.find(c => c.id === parseInt(req.params.id));

    if(!getCourse) return res.status(404).send("Course with given ID was not found");
    res.send(getCourse)
})

app.post('/api/course', (req,res) => {
   

    const {error} = validate(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }

    courses.push(course)
    res.send(course)
})


app.put('/api/course/:id', (req, res) => {
    
    const getCourse = courses.find(c => c.id === parseInt(req.params.id));
    if(!getCourse) return res.status(404).send("Course with given ID was not found");
   
    const {error} = validate(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    getCourse.name = req.body.name

    res.send(getCourse)
})

app.delete('/api/course/:id', (req, res) => {
    const getCourse = courses.find(c => c.id === parseInt(req.params.id));
    if(!getCourse) return res.status(404).send("Course with given ID was not found");

    const indexOf = courses.indexOf(getCourse)
    courses.splice(indexOf, 1)

    res.send(getCourse)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`));

function validate(body){
    const scheme = {
        name : Joi.string().min(3).required()
    }

    return Joi.validate(body, scheme)
}

