module.exports = {

  escape: (str) => {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  },

  createTimestap: () => {
      const date = new Date();
      return date;
  },

  calcDaysAgo: (timestamp) => {
      const date = new Date();
      let num = (date.getTime() - timestamp) / (1000 * 3600 * 24);
      let text = '';
      const years = Math.floor(num / 365);
      if (years) {
        text += years;
        if (years <=1) {text += ' year ';} else {text +=' years ';}
      }
      const months = Math.floor(num % 365 / 30);
      if (months) {
        text += months;
        if (months <=1) {text += ' month ';} else {text +=' months ';}
      }
      const days = Math.floor(num % 30);
      if (days) {
        text += days;
        if (days <=1) {text += ' day ';} else {text +=' days ';}
      }
      if (text !== '') {return text + 'ago';}
      return 'today';
    },

  generateRandomString: (digit) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < digit; i ++) {
      text = text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  generateRandomURL: () => {
    return 'doodledoop' + generateRandomString(13);
  },

  validateEmail: (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

};


