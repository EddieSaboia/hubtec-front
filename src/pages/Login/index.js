import React, { useState } from 'react';
import { Form } from './style';

import { Pform } from './style';

export default function Login({history}){
    const [email, setEmail] = useState('');

  async function handleSubmit(event){

  }
    return (
    <>
          <Pform>
            Bem vindo ao <strong>Minhas Tarefas</strong>
          </Pform>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
              type="email" 
              className="email" 
              placeholder="Seu melhor e-mail" 
              value= {email}
              onChange={event => setEmail(event.target.value)}
          />
          <label htmlFor="password">PASSWORD *</label>
          <input 
              type="password" 
              className="password" 
              placeholder="Digite sua senha" 
              value= {email}
              onChange={event => setEmail(event.target.value)}
          />

          <button className="btn" type="submit">Entrar</button>

        </Form>
    </>
    );
}