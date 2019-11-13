import React, {
	useState,
} from 'react';

import './LandingPageForm.css';

export default function LandingPageForm({ children, onHide, onSubmit }) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const numOfSteps = children.length;
	if (!numOfSteps) {
		return null;
	}

	const handleNext = (e) => {
		e.preventDefault();

		setCurrentStepIndex(currentStepIndex + 1);
	};

	const handleBack = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex(currentStepIndex - 1);
		} else {
			onHide();
		}
	};

	let btnText = 'Submit';
	let className = 'submit-btn';
	let submitFunc = onSubmit;
	if (currentStepIndex >= 0 && currentStepIndex < numOfSteps - 1) {
		btnText = 'Next';
		className = 'next-btn';
		submitFunc = handleNext;
	}

	return (
		<form className='landing-page-form' onSubmit={submitFunc}>
			{children[currentStepIndex]}
			<button className={className} type="submit" onClick={submitFunc}>{btnText}</button>
			<button className='back-btn' type="button" onClick={handleBack}>Back</button>
		</form>
	);
}
