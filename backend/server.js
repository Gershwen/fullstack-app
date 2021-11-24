const express = require("express");
const app = express();

//we use body parser middlewear to get what gets posted in the body of the HTTP
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//generates random id which we will assign to new projects
const newID = () => {
  return Math.floor(Math.random() * Date.now());
};

//Web projects are saved in the below array
const projects = [
  {
    id: 1,
    title: "React Game!",
    description: "Tic tac toe game created using Create React app.",
    URL: "http://heroku/myapp/game/",
  },
  {
    id: 2,
    title: "Online store",
    description: "Online store created with HTML, CSS and JavaScript.",
    URL: "https://git.com/myrepos/shop/index",
  },
];

//GET
app.get("/api", function (req, res) {
  res.json({ message: `${JSON.stringify(projects)}` });
});

//POST
app.post("/api", (req, res) => {
  const id = newID();
  var newProject = {
    id: `${id}`,
    title: `${req.body.title}`,
    description: `${req.body.description}`,
    URL: `${req.body.URL}`,
  };
  projects.push(newProject);
  res.send("Project added with ID:" + `${id}`);
});

//DELETE
app.delete("/api", (req, res) => {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == parseInt(`${req.body.id}`)) {
      projects.splice(i, 1);
      let k = i + 1;
      res.send("Project ID: " + k + " deleted");
    }
  }
});

//PUT
app.put("/api", (req, res) => {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == parseInt(`${req.body.id}`)) {
      (projects[i].title = `${req.body.title}`),
        (projects[i].description = `${req.body.description}`),
        (projects[i].URL = `${req.body.URL}`);
      res.send("Project with ID:" + `${req.query.id}` + " has been updated");
    }
  }
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
    'frontend', 'build','index.html'));
    });
    }

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Credit: Melusi for assisting me
