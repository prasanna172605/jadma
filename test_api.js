fetch('http://localhost:3000/api/v1/courses/varma-foundation')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(console.error)
