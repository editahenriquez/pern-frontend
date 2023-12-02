const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
alert(`env.REACT_APP_BASE_URL:${process.env.REACT_APP_BASE_URL}`);
alert(`BASE_URL:${BASE_URL}`);
export default BASE_URL;