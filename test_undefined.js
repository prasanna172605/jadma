fetch('http://localhost:3000/api/v1/courses/undefined')
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error)
