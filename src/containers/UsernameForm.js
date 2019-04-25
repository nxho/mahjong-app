import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions';

class UsernameForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
		}
	}

	componentDidMount() {
		this.usernameInput.focus();
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.setUsername(this.state.username);

		this.setState({
			username: '',
		});

		if (this.props.onSubmit != null) {
			this.props.onSubmit();
		}
	}

	handleChange = (e) => {
		this.setState({
			username: e.target.value,
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input
						ref={(input) => { this.usernameInput = input; }}
						type="text"
						value={this.state.username}
						onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setUsername: (username) => dispatch(setUsername(username)),
});

export default connect(
	null,
	mapDispatchToProps,
)(UsernameForm);

