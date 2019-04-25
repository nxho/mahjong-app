import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class MessageList extends Component {
	render() {
		return (
			<div>
				{
					this.props.messages.map(message => (
						<div>{message}</div>
					))
				}
			</div>
		);
	}
}

