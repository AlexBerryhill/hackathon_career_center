fetch("https://momsstore.herokuapp.com/customer")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
