import '../../license';
import '../aspect-resizer';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'ts-helpers';
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { App } from'./containers/app-angular';
import { NgRedux } from 'ng2-redux';
import { partial } from '../../util';
// Global styles
import '../styles/index.css';
import { store } from '../store/store';
import { Store } from './opaque-tokens';


// Production mode
declare const __PRODUCTION__: boolean;
declare const __STAND_ALONE__: boolean;

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

const UNMOUNT_RETRY = 50;
let appRef = null;
let isStarting = false;
let timeOut = null;

if (__STAND_ALONE__) {
  mount();
}

export function mount() {
  if (appRef || isStarting) {
    return;
  }
  isStarting = true;
  return bootstrap(App, [ NgRedux, { provide: Store, useValue: store } ])
    .then((ref) => {
      isStarting = false;
      appRef = ref;
    });
}

export function unmount(element: HTMLElement) {
  if (appRef) {
    appRef.destroy();
    appRef = null;
    const el = document.createElement('bd-angular');
    element.appendChild(el);
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
  } else if (isStarting) {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(partial(unmount, element), UNMOUNT_RETRY);
  }
}
