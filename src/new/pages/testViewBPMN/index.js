import React from 'react';
import { BpmnViewer, xml, instances } from '../../../@components/bpmnMonitor';

const TestViewBPMN = (props) => {
	const errorHandler = () => {
		console.log('do something when error');
	};

	const showHandler = () => {
		console.log('do something after rendering');
	};

	const clickElementHandler = (element) => {
		console.log(element);
	};

	return (
		<div style={{ width: '100vw', height: '600px' }}>
			<BpmnViewer
				xml={xml}
				instances={instances}
				onError={errorHandler}
				onShown={showHandler}
				onClickElement={clickElementHandler}
				showZoomPanel={true}
			/>
			<div />
		</div>
	);
};

export default TestViewBPMN;
