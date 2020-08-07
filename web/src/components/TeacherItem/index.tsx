import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  bio: string;
  cost: number;
  name: string;
  avatar: string;
  subject: string;
  whatsapp: String;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }


  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name}/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>  
      </header>

      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora 
          <strong>R${teacher.cost}</strong>
        </p>
        <a 
          target="_blank" 
          onChange={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          type="button">
            <img src={whatsappIcon} alt="whatsapp"/>
            Entrar em contato
        </a>
      </footer>
    </article>
  )
}
export default TeacherItem;