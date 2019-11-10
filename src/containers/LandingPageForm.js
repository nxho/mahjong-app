import React, {
	useEffect,
	useState,
} from 'react';

import './LandingPageForm.css';

export default function LandingPageForm({ children, onHide, onFocusInput, onSubmit }) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const numOfSteps = children.length;
	if (!numOfSteps) {
		return null;
	}

	useEffect(() => {
		onFocusInput();
	});

	const handleNext = () => {
		setCurrentStepIndex(currentStepIndex + 1);
	};

	const handleBack = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex(currentStepIndex - 1);
		} else {
			onHide();
		}
	};

	return (
		<div className='landing-page-form'>
			{children[currentStepIndex]}
			{
				(currentStepIndex >= 0 && currentStepIndex < numOfSteps - 1
					&& <button className='next-btn' type="button" onClick={handleNext}>Next</button>)
					|| <button className='submit-btn' type="button" onClick={onSubmit}>Submit</button>
			}
			<button className='back-btn' type="button" onClick={handleBack}>Back</button>
		</div>
	);
}
