const router = require("express").Router();
const redis = require("redis");
const knex = require("knex");

// create user
router.post("/users", (req, res, next) => {
  let knex_client = get("knex-client");
  knex_client
    .insert({
      name: req.body.name,
      email: req.body.email,
      exam: req.body.exam
    })
    .into("user")
    .then(data => {
      console.log("data inserted");
      res.send(JSON.stringify(data));
    });
});

// get question based on exam type:
// redis-server query ex.-> ques|exam_name-cat
// url ex. --> http://localhost:3000/ques/{cat}

router.get("/ques/%7B:exam_name%7D", (req, res, next) => {
  let knex_client = req.app.get("knex-client");
  let client = req.app.get("client");
  // let connection = req.app.get("connection");
  // console.log(req.params.exam_name);
  client.get(`ques|exam_name-${req.params.exam_name}`, (err, result) => {
    if (result) {
      console.log("Redis-server");
      res.send(result);
    } else {
      knex_client("question")
        .where("exams", req.params.exam_name)
        .then(data => {
          let responseJSON = JSON.stringify(data);
          client.set(`ques|exam_name-${req.params.exam_name}`, responseJSON);
          console.log("Database");
          res.send(responseJSON);
        });
    }
  });
});

// get question object based on question_id:
// redis-server query ex.-> ques|ques_id-1
// url ex. --> http://localhost:3000/ques/2

router.get("/ques/:ques_id", (req, res, next) => {
  let knex_client = req.app.get("knex-client");
  let client = req.app.get("client");
  // let connection = req.app.get("connection");
  let id = parseInt(req.params.ques_id);
  if (isNaN(id)) {
    res.send({});
  } else {
    client.get(`ques|ques_id-${req.params.ques_id}`, (err, result) => {
      if (result) {
        console.log("Redis-server");
        res.send(result);
      } else {
        knex_client("question")
          .where("id", req.params.ques_id)
          .then(data => {
            let responseJSON = JSON.stringify(data);
            client.set(`ques|ques_id-${req.params.ques_id}`, responseJSON);
            console.log("Database");
            res.send(responseJSON);
          });
      }
    });
  }
});

// get all user who attempted a particular question:
// redis-server query ex.-> ques|ques_id|users-2
// url ex. --> http://localhost:3000/ques/3/users

router.get("/ques/:ques_id/users", (req, res, next) => {
  let client = req.app.get("client");
  let knex_client = req.app.get("knex-client");
  // let connection = req.app.get("connection");
  let id = parseInt(req.params.ques_id);
  if (isNaN(id)) {
    res.send({});
  } else {
    client.get(`ques|ques_id|users-${req.params.ques_id}`, (err, result) => {
      if (result) {
        console.log("Redis-server");
        res.send(result);
      } else {
        knex_client("user_question")
          .where("question_id", req.params.ques_id)
          .then(data => {
            let responseJSON = JSON.stringify(data);
            client.set(
              `ques|ques_id|users-${req.params.ques_id}`,
              responseJSON
            );
            console.log("Database");
            res.send(responseJSON);
          });
      }
    });
  }
});

// get all questions attempted by a particular user:
// redis-server query ex.-> users|user_id|ques-2
// url ex. --> http://localhost:3000/users/2/ques

router.get("/users/:user_id/ques", (req, res, next) => {
  let client = req.app.get("client");
  let knex_client = req.app.get("knex-client");
  // let connection = req.app.get("connection");
  let id = parseInt(req.params.user_id);
  if (isNaN(id)) {
    res.send({});
  } else {
    client.get(`users|user_id|ques-${req.params.user_id}`, (err, result) => {
      if (result) {
        console.log("Redis-server");
        res.send(result);
      } else {
        knex_client("user_question")
          .where("user_id", req.params.user_id)
          .then(data => {
            let responseJSON = JSON.stringify(data);
            client.set(
              `users|user_id|ques-${req.params.user_id}`,
              responseJSON
            );
            console.log("Database");
            res.send(responseJSON);
          });
      }
    });
  }
});

module.exports = router;
