const log = console.log;

void log;

import { identity } from 'delgado';
import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ensureReducer = ( reducer ) => reducer ? reducer : identity;

const createRootReducer = ( getInitialState, reducers ) =>
    ( state = getInitialState(), action ) => {
        if ( process.env.NODE_ENV !== 'production' ) {
            log( state, action );
        }

        return ensureReducer( reducers[ action.type ] )( state, action );
    };

const connect = ( componentConstructor, actions = {}, mapStateToProps = identity ) => reduxConnect(
    mapStateToProps,
    ( dispatch ) => bindActionCreators( { ...actions }, dispatch )
)( componentConstructor );

export { connect, createRootReducer };