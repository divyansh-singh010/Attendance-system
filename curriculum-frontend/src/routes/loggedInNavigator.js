import { ReactSession } from 'react-client-session';

function loggedInNavigator(navigate) {
	function navigator() {
		ReactSession.setStoreType('localStorage');
		const faculty_token = localStorage.getItem('faculty_access_token');
		const student_token = localStorage.getItem('student_access_token');
		if (!faculty_token && !student_token) {
			navigate('/');
		}
	}
	return navigator;
}

export default loggedInNavigator;
