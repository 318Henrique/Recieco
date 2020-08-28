import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Header';
import "../../styles/style.css";
import iconAdd from '../../assets/icon-add.png';
import iconSearch from '../../assets/icon-search.png';
import ListPerson from '../../Components/ListPerson';
import Api from '../../Api/api';
import Message from '../../Components/Message';

export default function People(){
  const [list, handleList] = useState([]);
  const [ messagePage, newMessage ] = useState(null);
  const searchRef= useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.get('/admin/person');
        const { content } = response.data;
        
        if(!content.length) return newMessage({ content: "Nenhuma pessoa encontrada!" })

        handleList(content);

      } catch (error) {
        newMessage({ content: error });
      }
    })()
  }, [])

  function removeItem(id){
    handleList(prevList => prevList.filter(item => item.id !== id))
  }

  function activeSearch(isActive){
    if(!searchRef) return;
    
    if(isActive){
      document.querySelector('#root').addEventListener('click', event => {
        if(event.srcElement !== searchRef.current) return searchRef.current.classList.remove('inputSearchActived');
      })

      searchRef.current.classList.add('inputSearchActived');
    }

    else searchRef.current.classList.remove('inputSearchActived');
  }

  return(
    <>
    <Header/>
    <div className='control-main box-main-form'>
      <div className='header-form'>
        <h1>Lista de Pessoas</h1>
        <div className='title-search'>
          <div className='inputSearch' onClick={() => activeSearch(true)} ref={searchRef}>
            <button>
              <img src={iconSearch} alt=''/>
            </button>
            <input type='search' name='search' onBlur={() => activeSearch(false)}/>
          </div>
          <button className='add'>
            <img src={iconAdd} alt='' title='Novo'/>
          </button>
        </div>
      </div>
      <div className='content-list'>
        {
          list.map(content => <ListPerson
            content={content}
            key={content.id}
            removeItem={idContent => removeItem(idContent)}
            />
          )
        }
      </div>
    </div>
    <Message message={messagePage}/>
    </>
  )
}