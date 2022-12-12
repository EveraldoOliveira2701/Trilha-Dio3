import { useNavigate  } from "react-router-dom";
import { MdOutlineAddBox, MdLockOutline, MdEmail} from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleRegistration, SubtitleRegistration, EsqueciText, CriarText, Row, Wrapper } from './styles';


const Registration = () => {

    const navigate = useNavigate()
   
    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Criando conta nova')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleRegistration>Comece agora grátis</TitleRegistration>
                <SubtitleRegistration>Crie sua conta e make the change._</SubtitleRegistration>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdOutlineAddBox />} name="nomecompleto"  control={control} />
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="nomecompleto"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLockOutline />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <EsqueciText>Ao clicar em "criar minha conta grátis",declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</EsqueciText>
                </Row>
                <Row>
                <CriarText>Já tenho conta.</CriarText><CriarText>Criar minha conta</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Registration }