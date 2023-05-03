import { Button, Container, Form, TextArea } from '../../../../components';
import { CONSTANTS } from '../../../../constants';
import { ticketQueries } from '../../../../queries';
import './Inbox.scss';
import { useDialog } from '../../../../hooks';
import { object, string } from 'yup';
import { ticketServices } from '../../../../services';

const { listTicketsQuery } = ticketQueries;
const { sendAnswer } = ticketServices;

const { REPLY, SEND, CLOSE } = CONSTANTS.GOOGLE_ICONS;

export default function Inbox() {
  const { tickets } = listTicketsQuery();

  const schema = object().shape({
    answer: string().required('Campo Obrigatório'),
  });
  const { dialogRenderer, setDialog, closeDialog } = useDialog({
    width: '400px',
    height: '370px',
    usePortal: false,
    defaultCloseButton: false,
  });

  const onSubmit = (id: number, payload: { answer: string }) => sendAnswer(payload, id, closeDialog);

  const openDialog = (id: number) => {
    setDialog({
      title: 'Responder',
      content: (
        <Container className="im-inbox-dialog-content">
          <Form onSubmit={(payload) => onSubmit(id, payload)} schema={schema} defaultSubmit={false}>
            <TextArea height="100px" label="Resposta" name="answer" className="im-dialog-text" />
            <div className="im-dialog-button-group">
              <Button icon={SEND} text="Enviar" variant="primary" type="submit" />
              <Button icon={CLOSE} text="Fechar" variant="cancel" onClick={closeDialog} stopPropagation />
            </div>
          </Form>
        </Container>
      ),
    });
  };

  return (
    <div className="im-message-list">
      {tickets?.map(
        (ticket: { id: number; client: string; email: string; title: string; message: string; pedido: number; answer: string }) => (
          <Container key={ticket.id} className="im-message-group">
            <div className="im-message-header">
              <span>
                <strong>Customer:</strong> {ticket.client}
              </span>
              <span>
                <strong>N. Pedido:</strong> {ticket.pedido}
              </span>
              <Button icon={REPLY} text="Responder" small variant="text" onClick={() => openDialog(ticket.id)} />
            </div>
            <div>
              <strong>{ticket.title}</strong>
            </div>
            <div className="im-message">{ticket.message}</div>
            {ticket.answer && (
              <div className="im-answer-wrapper">
                <strong className="im-answer"> Resposta:</strong> <span>{ticket.answer}</span>
              </div>
            )}
          </Container>
        )
      )}
      {dialogRenderer}
    </div>
  );
}
