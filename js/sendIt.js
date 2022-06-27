const sendmail = require("sendmail")();

function sendIt() {
  sendmail(
    {
      from: "denislazo1610@gmail.com",
      to: "denislazo1610@gmail.com",
      subject: "Hello World",
      html: "Mail of test sendmail ",
    },
    function (err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
    }
  );
}

module.exports = { sendIt };
