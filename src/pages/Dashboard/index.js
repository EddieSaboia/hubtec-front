import React, { useEffect, useState, useRef } from 'react';
import { Column } from './styles.js'
import { useSelector, connect } from 'react-redux'
import getTasks from './../../redux/action /tasks/getTasks'
import editTask from './../../redux/action /tasks/editTask'
import addTask from './../../redux/action /tasks/addTasks'
import deleteTask from './../../redux/action /tasks/deleteTask'
import logout from './../../redux/action /login/logout'
import { Modal, Button, Icon, notification } from 'antd';
import { Input } from './../../components/Input'
import { Form } from '../../components/Form/index.js';
import { Title, TitleCard } from '../../components/Label/index.js';
import { ListTask } from '../../components/List'
import { ColumnButton, ColumnButtonActions, ContainerButtons } from './../../components/Column'
import { Card } from './../../components/Card'
import { RemoveButton, EditButton } from './../../components/Button'
import Alert from 'react-bootstrap/Alert'

const bindConnection = Component => {
  return connect(
    null,
    {
      getTasks,
      editTask,
      addTask,
      deleteTask,
      logout
    }
  )(Component);
}

const Dashboard = (props) => {
  const { history } = props;
  const { authenticated, } = useSelector(state => state.user)
  const tasks = useSelector(state => state.tasks)
  const { error } = tasks
  const prevError = usePrevious({ error });
  const [show, setShow] = useState(true);

  if (!localStorage.getItem("access-token")) {
    history.push("/")
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    const user_id = localStorage.getItem('user');
    props.getTasks({
      headers: { user_id }
    })
  }, []);

  useEffect(() => {
    console.log(prevError, "prevError")
    console.log(error, "error")
    if (prevError) {
      if (prevError.error !== error && prevError.error !== "") {
        setModalVisible(false);
      }else{
        alert("deu erro seu animal conserta isso ae")
      }
    }
  }, [error])

  const [state, setState] = useState({
    formData: {
      name: "dsadsa ",
      description: "dsada",
      end_time: "",
    },
    editedId: "",
    statusEdit: ""
  })

  const {
    to_do,
    doing,
    done
  } = useSelector(state => state.tasks)

  const onChange = (event) => {
    setState({
      ...state,
      formData: {
        ...state.formData,
        [event.target.name]: event.target.value
      }
    })
  }

  const [modalVisible, setModalVisible] = useState(false);

  const TaskIt = (id, status) => {
    setModalVisible(true)

    let task = {}
    switch (status) {

      case "to_do":
        task = to_do.filter(t => t.id == id)
        break;

      case "doing":
        task = doing.filter(t => t.id == id)
        break;

      case "done":
        task = done.filter(t => t.id == id)
        break;

      default:
        break;

    }
    setState({
      ...state,
      formData: {
        ...task[0]
      },
      editedId: id,
      statusEdit: status
    });
  }

  const handleSubmit = (state) => {
    if (state.editedId != "") {

      const user_id = localStorage.getItem('user');
      props.editTask(state.editedId, state.statusEdit, state.formData, {
        headers: { user_id }
      })

      setModalVisible(false)
    } else {

      const user_id = localStorage.getItem('user');
      props.addTask(state.formData, {
        headers: { user_id }
      });
      // setModalVisible(false)

    }
  }

  const deleteTask = (id, status) => {

    const user_id = localStorage.getItem('user');
    props.deleteTask(id, status, {
      headers: { user_id }
    })

  }

  const moveTask = (id, status, task, oldStatus) => {
    const body = {
      ...task,
      status: status
    }
    const user_id = localStorage.getItem('user');
    props.editTask(id, status, body, oldStatus, {
      headers: { user_id }
    })
  }

  const logoutt = () => {
    props.logout();
  }


  return (
    <>
      <div>


        <ContainerButtons>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            <Icon type="plus" />
          </Button>

          <Button type="danger" onClick={() => logoutt()}>
            <Icon type="logout" />
          </Button>
        </ContainerButtons>
        <Modal
          title="Adicionar Tarefas"
          visible={modalVisible}
          onOk={() => (state.editedId != "") ? handleSubmit(state) : handleSubmit(state)}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button
              key="Back" onClick={() => setModalVisible(false)}
            >Voltar</Button>,
            <Button
              key="submit" type="primary" onClick={() => (state.editedId != "") ? handleSubmit(state) : handleSubmit(state)}
            >Enviar</Button>,
          ]}
        >
          <Form onSubmit={handleSubmit}>

            <Title htmlFor="name">Nome *</Title>
            <Input
              type="text"
              name="name"
              placeholder="Digite o nome da tarefa"
              value={state.formData.name}
              onChange={onChange}
            />

            <Title htmlFor="description">Descrição *</Title>
            <Input
              type="text"
              name="description"
              placeholder="Descrição"
              value={state.formData.description}
              onChange={onChange}
            />

            <Title htmlFor="end_time">Data final *</Title>
            <Input
              type="date"
              name="end_time"
              placeholder="Digite o dia final"
              value={state.formData.end_time}
              onChange={onChange}
            />

          </Form>
        </Modal>

      </div>
      <Column>
        <TitleCard>A fazer</TitleCard>
        <TitleCard>Fezendo</TitleCard>
        <TitleCard>Feito</TitleCard>
      </Column>
      <Column>
        <div>
          <ListTask>
            {to_do.map((task, index) => (
              <Card key={index}>
                <Title>{task.name}</Title>
                <p>{task.description}</p>
                <p>{task.end_time}</p>

                <ColumnButton>
                  <EditButton style={{ marginLeft: 10, marginBottom: 10 }} type="secondary" onClick={() => TaskIt(task.id, task.status)}>
                    <Icon type="edit" />
                  </EditButton>
                  <RemoveButton style={{ marginLeft: 10, marginBottom: 10 }} type="danger" onClick={() => deleteTask(task.id, task.status)}>
                    <Icon type="delete" />
                  </RemoveButton>
                </ColumnButton>

                <ColumnButton>
                  {task.status !== "to_do" &&
                    <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary"
                      onClick={() => moveTask(task.id, ((task.status == "doing") ? "to_do" : "doing"), task, task.status)}
                    >
                      A Fazer
                    </Button>
                  }
                  {task.status !== "done" &&
                    <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary"
                      onClick={() => moveTask(task.id, ((task.status == "to_do") ? "doing" : "done"), task, task.status)}
                    >
                      Fazendo
                    </Button>
                  }
                </ColumnButton>
              </Card>
            ))}
          </ListTask>
        </div>
        <div>
          <ListTask>
            {doing.map((task, index) => (
              <Card key={index}>
                <Title>{task.name}</Title>
                <p>{task.description}</p>
                <p>{task.end_time}</p>
                <ColumnButtonActions>
                  <EditButton style={{ marginLeft: 10, marginBottom: 10 }} type="secondary" onClick={() => TaskIt(task.id, task.status)}>
                    <Icon type="edit" />
                  </EditButton>
                  <RemoveButton style={{ marginLeft: 10, marginBottom: 10 }} type="danger" onClick={() => deleteTask(task.id, task.status)}>
                    <Icon type="delete" />
                  </RemoveButton>
                </ColumnButtonActions>

                <ColumnButton>
                  {task.status !== "to_do" &&
                    <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary"
                      onClick={() => moveTask(task.id, ((task.status == "doing") ? "to_do" : "doing"), task, task.status)}
                    >
                      A Fazer
                    </Button>
                  }
                  {task.status !== "done" &&
                    <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary"
                      onClick={() => moveTask(task.id, ((task.status == "to_do") ? "doing" : "done"), task, task.status)}
                    >
                      Feito
                    </Button>
                  }
                </ColumnButton>
              </Card>
            ))}
          </ListTask>
        </div>
        <div>
          <ListTask>
            {done.map((task, index) => (
              <Card key={index}>
                <Title>{task.name}</Title>
                <p>{task.description}</p>
                <p>{task.end_time}</p>
                <ColumnButton>
                  <EditButton style={{ marginLeft: 10, marginBottom: 10 }} type="secondary" onClick={() => TaskIt(task.id, task.status)}>
                    <Icon type="edit" />
                  </EditButton>
                  <RemoveButton style={{ marginLeft: 10, marginBottom: 10 }} type="danger" onClick={() => deleteTask(task.id, task.status)}>
                    <Icon type="delete" />
                  </RemoveButton>
                </ColumnButton>
                <ColumnButton>
                  {task.status !== "to_do" &&
                    <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary"
                      onClick={() => moveTask(task.id, ((task.status == "doing") ? "to_do" : "doing"), task, task.status)}
                    >
                      Fazendo
                    </Button>
                  }
                  {task.status !== "done" &&
                    <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary"
                      onClick={() => moveTask(task.id, ((task.status == "to_do") ? "doing" : "done"), task, task.status)}
                    >
                      Feito
                    </Button>
                  }
                </ColumnButton>
              </Card>
            ))}
          </ListTask>
        </div>
      </Column>

    </>
  )

}

export default bindConnection(Dashboard);