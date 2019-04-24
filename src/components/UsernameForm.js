import React, { Component } from 'react';
import { connect } from 'react-redux';

const UsernameForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<label>
				Name:
				<input type="text" value={props.value} onChange={props.handleChange} />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
}

