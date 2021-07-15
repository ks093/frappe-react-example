import React,{ useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiConstants';
function Home(props) {
    const [state , setState] = useState({
        response: null
    })
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    if(!state.response){
        fetch(`${API_BASE_URL}/api/resource/User/${localStorage.getItem('email')}`, requestOptions)
        .then(res => res.json())
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);