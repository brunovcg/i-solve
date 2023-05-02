import { Container, Form, Input, Title, TextArea } from '../../../../../../../../components';
import { object, string } from 'yup';
import './CreateGroupDialog.scss';
import { CONSTANTS } from '../../../../../../../../constants';
import { cognitoQueries } from '../../../../../../../../queries';
import { CreateGroupDialogProps, OnSubmitCreatePayloadGroup } from './CreateGroupDialog.types';
import { toast } from 'react-toastify';

const { FORM } = CONSTANTS.GOOGLE_ICONS;
const { useCreateGroupMutation } = cognitoQueries;

export default function CreateGroupDialog({ onSubmitSuccess }: CreateGroupDialogProps) {
  const { mutate: createGroup } = useCreateGroupMutation();

  const schema = object().shape({
    groupName: string().required('Campo obrigatório'),
    description: string(),
  });

  const onGroupCreated = () => {
    onSubmitSuccess();
    toast.info('Grupo Criado');
  };

  function onSubmit(payload: OnSubmitCreatePayloadGroup) {
    createGroup({ ...payload, onSubmitSuccess: onGroupCreated });
  }

  return (
    <Container className="im-create-group-dialog">
      <Form schema={schema} onSubmit={onSubmit}>
        <Title icon={FORM} text="Formuário de Criação de Grupo" marginBottom="40px" />
        <Input name="groupName" showHeader={false} label="Nome" className="im-create-group-dialog-input-name" />
        <TextArea height="90px" showHeader={false} optionalLabel name="description" label="Descrição" />
      </Form>
    </Container>
  );
}
