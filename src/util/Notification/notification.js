import {notification} from 'antd'

notification.config({
    duration: 3,
  });

export const notifyFunction = (type, message, description) => { //type: success, error, info, warning, warn, open, close, destroy
    notification[type]({
        message: message,
        description: description
    });
}