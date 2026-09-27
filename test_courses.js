fetch('http://localhost:3000/api/v1/courses')
  .then(r => r.json())
  .then(data => {
    data.data.forEach(c => console.log(c.title, "->", c.slug));
  })
  .catch(console.error)
