module.exports = {

  checkLengthForObj: (obj) => {
    let size = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },

  siftCommonArray: (array1, array2) => {
    let array1update = array1.filter( arrayItem => {
      if (array2.find(key => key === arrayItem) === undefined) {
        return arrayItem;
      }
    });
    let array2update = array2.filter( arrayItem => {
      if (array1.find(key => key === arrayItem) === undefined) {
        return arrayItem;
      }
    });
    return [array1update, array2update];
  },

  checkForRepeated: (timeslots) => {
    let counts = [];
    for(let i = 0; i <= timeslots.length; i++) {
        if(counts[timeslots[i]] === undefined) {
            counts[timeslots[i]] = 1;
        } else {
            return false;
        }
    }
    return true;
  },

  createTimeslots: (output) => {
    let timeslotsGroup = {};

    output.forEach(key => {
      if (key.count === 1) { // only push into array if the targeting timeslot's status is "ongoing"
        if (!timeslotsGroup[key.slot]) {
          timeslotsGroup[key.slot] = [];
          timeslotsGroup[key.slot].push([key['name'], key['email']]);
        } else {
          timeslotsGroup[key.slot].push([key['name'], key['email']]);
        }
      }
    });
    return timeslotsGroup;
  },

  createTempVars: (output, timeslots, userStatusTF, userName, userEmail) => {
    const templateVars = {
      hostURL: output[0].hosturl,
      guestURL: output[0].guesturl,
      title: output[0].title,
      description: output[0].description,
      location: output[0].location,
      timeslotsGroup: timeslots,
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


