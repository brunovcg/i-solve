import { Container, Form, Input, TextArea, Title } from '../../components';
import { object, string } from 'yup';
import './Complain.scss';

export default function Complain() {
  const schema = object().shape({
    title: string().required('Campo obrigatório'),
    description: string().required('Campo obrigatório'),
  });

  const onSubmit = (payload: { title: string; description: string }) => {
    console.log(payload);
  };

  return (
    <div className="im-complain">
      <Container className="im-complain-content">
        <Form schema={schema} onSubmit={onSubmit} className="im-complain-form">
          <Title text="Enviar Reclamação" />
          <Input label="Título" name="title" maxLength={100} />
          <TextArea label="Descrição" name="description" maxLength={500} />
          <Container className="im-input-file">
            <input type="file" />
          </Container>
        </Form>
      </Container>
    </div>
  );
}
