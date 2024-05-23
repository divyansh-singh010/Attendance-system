import { ReactSession } from 'react-client-session';

function loggedOutNavigator(navigate) {
	function navigator() {
		ReactSession.setStoreType('localStorage');
		const faculty_token = localStorage.getItem('faculty_access_token');
		const student_token = localStorage.getItem('student_access_token');
		if (faculty_token) {
			navigate('/profhome');
		}
		if (student_token) {
			navigate('/student');
		}
	}
	return navigator;
}

export default loggedOutNavigator;
