import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

export default () => (
    <div style={{ textAlign: 'center' }}>
        <Header as='h1' content='Bienvenid@ a Analytics' className='setup-welcome-header' />
        <br />
        <span className='step-text'>Vamos a crear su cuenta de administrador</span>
        <br />
        <br />
        <br />
        <br />
        <Link to='/setup/account'><Button data-cy='start-setup' size='big' primary content='Comenzar' /></Link>
    </div>
);
