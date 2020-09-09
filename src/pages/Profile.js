import React, { useEffect, useState, useContext } from 'react';
import Header from '../Components/Header';
import Api from '../Api/api';
import Message from '../Components/Message';
import { AuthContext } from '../Context/Auth';

export default function Profile(){
    const [ dataProfile, handleDataProfile ] = useState({});
    const [ message, newMessage ] = useState(null);
    const { userDetail: { dataUser } } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await Api.get('/profile/i/');
                const { content } = response.data;

                handleDataProfile(content[0])
            } catch (error) {
                newMessage({ content: error })
            }
        })()
    }, [])

    return(
        <>
        <Header/>
        <div className='control-main'>
            <div className='control-box-profile'>
                <div className="foto-profile">
                    <img src={'https://avatars2.githubusercontent.com/u/61211576?s=460&u=c6735688882014b6d93bda918f892b94b79bdc1a&v=4'} alt='Foto do perfil'/>
                </div>
                <div>
                    <div className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <span className='title-section'>Informações pessoais</span>
                        { dataUser.person_name}
                        { dataProfile.address}
                    </div>

                    <div className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <span className='title-section'>Meus Resíduos</span>
                    </div>

                    <div className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <span className='title-section'>Informações de acesso</span>
                    </div>
                </div>
                <div>
                    <section>
                    </section>
                </div>
            </div>
        </div>
        <Message message={message}/>
        </>
    )
}