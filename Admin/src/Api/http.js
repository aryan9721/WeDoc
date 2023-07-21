import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import {  RECRUIT_URL } from '../common/config'
import { createUploadLink } from 'apollo-upload-client'

// const accessToken = localStorage.getItem('token');

const httpLinkUrl = createUploadLink({
  uri: RECRUIT_URL
  // headers: {
  //     authorization: accessToken ? `Bearer ${accessToken}` : '',
  // },
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem('authToken');
  if(authToken){
    return {
      headers: {
        authorization: authToken ? `Bearer ${authToken.replace(/^"(.+)"$/,'$1')}` : ''
      }
    };

  } else {
    return {
      headers: headers
    };

  }
  
});

const httpLink = authLink.concat(httpLinkUrl);

export default httpLink;
