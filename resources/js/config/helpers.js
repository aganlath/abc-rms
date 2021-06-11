import { Message } from 'element-ui';
import notificationMessages from './messages';

export const createCommaSeparatedList = (array, propertyName) => {
    return (_.map(array, propertyName)).join(', ');
}

export const showErrorMessage = (path) => {
    Message.error(getNotification(path));
};

export const showError = (message) => {
    Message.error(message);
};

export const showSuccessMessage = (path) => {
    Message.success(getNotification(path));
};

let getNotification = notification => _.get(notificationMessages, notification);
