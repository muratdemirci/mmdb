import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
// TODO: install rxjs

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear,
};

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning',
};

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

// convenience methods
function success(message, options) {
    alert({...options, type: AlertType.Success, message});
}

function error(message, options) {
    alert({...options, type: AlertType.Error, message});
}

function info(message, options) {
    alert({...options, type: AlertType.Info, message});
}

function warn(message, options) {
    alert({...options, type: AlertType.Warning, message});
}

// core alert method
function alert(alert) {
    alert.id = alert.id || defaultId;
    alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
    alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
    alertSubject.next({id});
}
