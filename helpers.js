module.exports = {

  createTimeslots: (output) => {
    let timeslotsGroup = {};

    output.forEach(key => {
      if (!timeslotsGroup[key.slot]) {
        timeslotsGroup[key.slot] = [];
        timeslotsGroup[key.slot].push([key['name'], key['email']]);
      } else {
        timeslotsGroup[key.slot].push([key['name'], key['email']]);
      }
    });
    return timeslotsGroup;
  },

  createTempVars: (output, timeslotsGroup, userStatusTF, userName, userEmail) => {
    const templateVars = {
      hostURL: output[0]['hosturl'],
      guestURL: output[0]['guesturl'],
      title: output[0]['title'],
      description: output[0]['description'],
      location: output[0]['location'],
      timeslotsGroup: timeslotsGroup,
    };

    templateVars['userStatus'] = userStatusTF;
    templateVars['userName'] = userName;
    templateVars['userEmail'] = userEmail;
    return templateVars;
  },

  genHostURL: () => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 25; i ++) {
      text = text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  genGuestURL: () => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 25; i ++) {
      text = text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  escape: (str) => {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  },

  createTimestamp: () => {
      const date = new Date();
      return date.getTime();
  },

  genRandomNum: () => {
    let text = '';
    let possible = '0123456789';
    for (let i = 0; i < 6; i ++) {
      text = text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return Number(text);
  },


};


