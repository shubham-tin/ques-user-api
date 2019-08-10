// let connection = req.app.get("connection");
// let query = `INSERT into user(name,email,exam) VALUES("${req.body.name}","${
//   req.body.email
// }","${req.body.exam}")`;
// connection.query(query, function(err, result, fields) {
//   if (err) throw err;
//   res.send(JSON.stringify(result));
// });

// let query = `SELECT * FROM question where exams = "${
//   req.params.exam_name
// }"`;
// connection.query(query, function(err, result, fields) {
//   if (err) throw err;
//   let arr = [];
//   result.forEach(element => {
//     arr.push(element);
//   });
//   let responseJSON = JSON.stringify(arr);
//   client.set(`ques|exam_name-${req.params.exam_name}`, responseJSON);
//   console.log("Database");
// res.send(responseJSON);
// });

// let query = `SELECT * FROM question where id = ${req.params.ques_id}`;
// connection.query(query, function(err, result, fields) {
//   if (err) throw err;
//   let responseJSON = JSON.stringify(result);
//   client.set(`ques|ques_id-${req.params.ques_id}`, responseJSON);
//   console.log("Database");
//   res.send(responseJSON);
// });

// let query = `SELECT * FROM user_question where question_id = "${
//   req.params.ques_id
// }"`;
// connection.query(query, function(err, result, fields) {
//   if (err) throw err;
//   let arr = [];
//   result.forEach(element => {
//     arr.push(element);
//   });
//   let responseJSON = JSON.stringify(arr);
//   client.set(`ques|ques_id|users-${req.params.ques_id}`, responseJSON);
//   console.log("Database");
//   res.send(responseJSON);
// });

// let query = `SELECT * FROM user_question where user_id = ${
//   req.params.user_id
// }`;
// connection.query(query, function(err, result, fields) {
//   if (err) throw err;
//   let arr = [];
//   result.forEach(element => {
//     arr.push(element);
//   });
//   let responseJSON = JSON.stringify(arr);
//   client.set(`users|user_id|ques-${req.params.user_id}`, responseJSON);
//   console.log("Database");
//   res.send(responseJSON);
// });
