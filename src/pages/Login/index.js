import React, { useState, useEffect } from 'react';
import { useSelector ,connect } from 'react-redux'

import { Form, Title } from './style';

import { Input } from './../../components/Input'
import { ButtonLogin } from '../../components/Button';
import { Button } from 'antd';
import authentication from '../../redux/action /login/authentication';
import { REGISTER } from '../../redux/actiontypes';

const bindConnection = Component => {
  const mapStateToProps = state => (
    {
      user: state.user
    }
  )
  return connect(
      null,
      {
        authentication       
      }
  )(Component);
}

const Login = (props) => {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticated } = useSelector(state => state.user)

  function handleSubmit(event) {
    event.preventDefault()
    props.authentication(email, password)
  }

  useEffect(() => {
    if(authenticated)
      return history.push('/dashboard');
  }, [authenticated])
  
  function register(){
    return history.push("/register")
  }

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

        <ButtonLogin type="submit">Entrar</ButtonLogin>

        <Button type="secondary" style={{ marginTop: 10}} onClick={() => register()} >Cadastrar</Button>
      </Form>
      
    </>
  );
}

export default bindConnection(Login)