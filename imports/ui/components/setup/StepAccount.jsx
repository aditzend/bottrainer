import React from 'react';

import {
    AutoForm, AutoField, ErrorsField, SubmitField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { accountSetupSchema } from '../../../api/setup';

// eslint-disable-next-line react/prefer-stateless-function
class StepAccountComponent extends React.Component {
    render() {
        const { onSubmit, data } = this.props;
        const bridge = new SimpleSchema2Bridge(accountSetupSchema);
        return (
            <AutoForm model={data} schema={bridge} onSubmit={onSubmit}>
                <AutoField name='firstName' placeholder='Su nombre' label={null} />
                <AutoField name='lastName' placeholder='Su apellido' label={null} />
                <AutoField name='email' placeholder='Su correo electrónico' label={null} />
                <AutoField
                    name='password'
                    placeholder='Contraseña'
                    label={null}
                    type='password'
                />
                <AutoField
                    name='passwordVerify'
                    placeholder='Confirme su contraseña'
                    label={null}
                    type='password'
                />
                <br />
                <ErrorsField />
                <div style={{ textAlign: 'center' }}>
                    <SubmitField
                        data-cy='account-create-button'
                        value='Crear cuenta'
                        className='primary'
                    />
                </div>
            </AutoForm>
        );
    }
}

StepAccountComponent.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.object,
};

StepAccountComponent.defaultProps = {
    data: undefined,
};

export default StepAccountComponent;
