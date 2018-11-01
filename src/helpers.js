const helpers = {
  dateChatFormat: dateString => {
    let date = new Date(dateString);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var hh = date.getHours();
    var mins = date.getMinutes();
    var ss = date.getSeconds();

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    var today = dd + "/" + mm + "/" + yyyy + " " + hh + ":" + mins + ":" + ss;
    return today;
  }
};

export default helpers;
