import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {userActions} from '../../redux/_actions';
class LogoutPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	};

	componentDidMount(){
		this.props.dispatch(userActions.logout());
	}

	render(){
		return (
			<Redirect to="/" />
		)
	}

}

export default connect()(LogoutPage);