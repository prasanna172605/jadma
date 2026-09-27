fetch('http://localhost:3000/api/v1/courses/bf71b357-6ea5-4995-a1d6-e79092eae6df')
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error)
