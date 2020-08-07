import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './style.css';

function TeacherForm() {
  const history = useHistory()

  const [bio     ,   setBio     ] = useState('');
  const [name    ,   setName    ] = useState('');
  const [cost    ,   setCost    ] = useState('');
  const [avatar  ,   setAvatar  ] = useState('');
  const [subject ,   setSubject ] = useState('');
  const [whatsapp,   setWhatsapp] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return{...scheduleItem, [field]: value}
      }

      return scheduleItem;
    })

    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent){
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(() => {
      alert("Prepare-se para novas aventuras como professor da plataforma")

      history.push('/')
    }).catch((err) => {
      console.error('Erro encontrado: ' + err)
    })

  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
       title="Que incrível que você quer dar aulas." 
       description="O primeiro passo é preencher esse formulário de inscrição."
      />

    <main>
      <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>

          <Input
             name="name"
             label= "Nome completo"
             value={name}
             onChange={(e) => {
               setName(e.target.value)
             }}
          />
          <Input
           name="avatar"
           label="Avatar"
           value={avatar}
           onChange={(e) => {
             setAvatar(e.target.value)
           }}
          />
          <Input
             name="whatsapp"
             label="Whatsapp"
             value={whatsapp}
             onChange={(e) => {
               setWhatsapp(e.target.value)
             }}
          />
          <Textarea 
            name="bio"
            label="Biografia"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value)
            }}
          />

        </fieldset>

        <fieldset>
          <legend>Sobre a Aula</legend>
          
          <Select 
            name="subject"
            label= "Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value)
            }}
            options= {[
            { value: 'Artes',      label: 'Artes'      },
            { value: 'Física',     label: 'Física'     },
            { value: 'Química',    label: 'Química'    },
            { value: 'Biologia',   label: 'Biologia'   },
            { value: 'História',   label: 'História'   },
            { value: 'Filosifia',  label: 'Filosifia'  },
            { value: 'Geografia',  label: 'Geografia'  },
            { value: 'Culinária',  label: 'Culinária'  },
            { value: 'Sociologia', label: 'Sociologia' },
            { value: 'Matemática', label: 'Matemática' },
            ]}
          />

          <Input
           name="cost"
           label="Custo da sua aula por hora (em R$)"
           value={cost}
           onChange={(e) => {
             setCost(e.target.value)
           }}
          />

        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
              + Novo horário
            </button>
          </legend>
         
          { scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="shedule-item">
                <Select 
                  name="week_day"
                  label= "Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                  options= {[
                    { value: '0',label: 'Domingo'       },
                    { value: '1',label: 'Segunda-Feira' },
                    { value: '2',label: 'Terça-Feira'   },
                    { value: '4',label: 'Quarta-Feira'  },
                    { value: '5',label: 'Quinta-Feira'  },
                    { value: '6',label: 'Sexta-Feira'   },
                    { value: '7',label: 'Sábado'        }
                  ]}
                />

                <Input
                 name="from"
                 label="Das"
                 type="time"
                 value={scheduleItem.from}
                 onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input
                 name="to"
                 label="Até"
                 type="time"
                 value={scheduleItem.to}
                 onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />
              </div>
            );
          })}

        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante ! <br />
            Preencha todos os dados
          </p>
          <button type="submit">
            Salvar cadastro
          </button>
        </footer>
      </form>
    </main>

  </div>
  )
}

export default TeacherForm;