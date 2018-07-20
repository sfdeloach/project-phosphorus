// bcrypt password hash function
import * as passwdjs from '@rbtdev/node-cmd-bcrypt';
import { EventEmitter } from '@angular/core';

const options = {
  rounds: 12,
  json: true
};

export const bcrypter = new EventEmitter<string>();

export function bcrypt(value) {
  passwdjs([value], options)
    .on('line', onLine)
    .on('error', onError);
}

function onLine(line) {
  bcrypter.emit(line);
}

function onError(err) {
  console.error(err);
}

export function decrypt(hexValue) {} // TODO
