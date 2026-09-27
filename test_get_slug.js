fetch('http://localhost:3000/api/v1/courses/1-basic-varmakalai-training')
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error)
