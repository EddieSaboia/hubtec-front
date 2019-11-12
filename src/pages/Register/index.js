import React, { useState, useEffect } from 'react';
import { useSelector ,connect } from 'react-redux'

import { Form, Title } from './style';

import { Input } from './../../components/Input'
import { Button } from '../../components/Button';
import register from '../../redux/action /login/register';

const bindConnection = Component => {
  return connect(
      null,
      {
        register       
      }
  )(Component);
}

const Register = (props) => {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { authenticated } = useSelector(state => state.user)

  function handleSubmit(event) {
    event.preventDefault()
    props.register(email, password, passwordConfirmation)
  }

  useEffect(() => {
    if(authenticated)
      return history.push('/dashboard');
  }, [authenticated])
  
  return (
    <>
      <Title>
        Bem vindo ao <strong>Minhas Tarefas</strong>
      </Title>
      <Form onSubmit={handleSubmit}>

        <label htmlFor="email">E-MAIL *</label>
        <Input
          type="email"
          className="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <label htmlFor="password">PASSWORD *</label>
        <Input
          type="password"
          className="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <label htmlFor="password">PASSWORD_CONFIRMATION *</label>
        <Input
          type="password"
          className="password"
          placeholder="Digite sua senha"
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
        />

        <Button type="submit">REGISTER</Button>

      </Form>
    </>
  );
}

export default bindConnection(Register)