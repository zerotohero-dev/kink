/*
 *
 */

// @flow

import type { Fn, Reducer } from 'kink-types';

import * as React from 'react';

const log = console.log;

void log;

import { identity } from 'delgado';
import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ensureReducer = (reducer: ?Fn): Reducer => (reducer ? reducer : identity);

const createRootReducer = (getInitialState: Fn, reducers: { [string]: Fn }) => (
  state: any = getInitialState(),
  action: { type: string }
) => {
  if (process.env.NODE_ENV !== 'production') {
    log(state, action);
  }

  return ensureReducer(reducers[action.type])(state, action);
};

const connect = (
  componentConstructor: React.Node,
  actions: any = {},
  mapStateToProps: Fn = identity
) =>
  reduxConnect(mapStateToProps, dispatch =>
    bindActionCreators({ ...actions }, dispatch)
  )(componentConstructor);

export { connect, createRootReducer };
