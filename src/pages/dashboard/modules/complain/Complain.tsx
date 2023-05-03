import { Container, Form, Input, TextArea, Title } from '../../../../components';
import { object, string } from 'yup';
import './Complain.scss';
import { ticketServices } from '../../../../services';
import { UserContext } from '../../../../contexts';
import { useContext, useRef } from 'react';
import { ticketQueries } from '../../../../queries';
import { InputForwardRef } from '../../../../components/modules/form-group/input/Input.types';
import { TextAreaForwardRef } from '../../../../components/modules/form-group/text-area/TextArea.types';
import { toast } from 'react-toastify';

const { sendComplain } = ticketServices;
const { listTicketsQuery } = ticketQueries;

export default function Complain() {
  const { user } = useContext(UserContext);
  const schema = object().shape({
    title: string().required('Campo obrigatório'),
    description: string().required('Campo obrigatório'),
  });
  const { tickets } = listTicketsQuery();
  const lastIndex = (tickets?.at(-1)?.id ?? 0) + 1;
  const inputRef = useRef<InputForwardRef>(null);
  const textareaRef = useRef<TextAreaForwardRef>(null);

  const onSubmit = (payload: { title: string; description: string }) => {
    const onSuccess = () => {
      inputRef?.current?.resetInputValue();
      textareaRef?.current?.resetTextAreaValue();
      toast.success('Reclamação enviada, entraremos em contato brevemente.');
    };

    sendComplain(
      {
        id: lastIndex,
        client: user.username,
        email: user.email,
        message: payload.description,
        pedido: lastIndex,
        title: payload.title,
      },
      onSuccess
    );
  };

  return (
    <div className="im-complain">
      <Container className="im-complain-content">
        <Form schema={schema} onSubmit={onSubmit} className="im-complain-form">
          <Title text="Enviar Reclamação" />
          <Input label="Título" name="title" ref={inputRef} />
          <TextArea label="Descrição" name="description" ref={textareaRef} />
        </Form>
      </Container>
    </div>
  );
}
