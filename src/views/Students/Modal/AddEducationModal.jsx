import React, {useState} from 'react'
import {Button, Header, Icon, Modal, Form, Input, TextArea, Select, Checkbox} from 'semantic-ui-react'
import UserService from '../../../services/user_service'
import {toaster} from "evergreen-ui";

const AddEducationModal = ({theTrigger, student_id}) => {
  const [finshed, setFinished] = useState(false)
  const [education, setEducation] = useState({
    degree: '',
    school: '',
    major: '',
    is_finished: finshed,
    start_at: '',
    end_at: '',
    grade: '',
    description: ''
  })
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false)
  const current_id = UserService.currentUser().id

  const handleChange = (event) => {
    event.preventDefault();
    setEducation({...education, [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    setLoading(true);
    UserService.postStudentEducation(education, student_id).then(
      () => {
        setLoading(false);
        setOpen(false)
        toaster.notify("Added successfully", {duration: 5})
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setError(returnError);
        setOpen(false)
        toaster.notify(returnError, {duration: 5})
      }
    )
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={theTrigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='book' content='Add education'/>
      <Modal.Content>
        <Form>

            <Form.Field
              name='degree'
              control={Input}
              label='Degree name'
              placeholder='Degree name'
              onChange={handleChange}
            />
            <Form.Field
              name='major'
              control={Input}
              label='Education major'
              placeholder='Education major'
              onChange={handleChange}
            />
            <Form.Field
              name='school'
              control={Input}
              label='School'
              placeholder='School name'
              onChange={handleChange}
            />
            <Form.Group widths='equal'>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              name='start_at'
              control={Input}
              label='Start'
              placeholder='Started date'
              onChange={handleChange}
            />

            <Form.Field
              name='end_at'
              control={Input}
              label='Finish'
              placeholder='Finish date'
              onChange={handleChange}
              disabled={finshed}
            />

          </Form.Group>
          <Form.Field
            name='is_finished'
            label='Still at school?'
            control={Checkbox}
            onClick={() => setFinished(!finshed)}
            onChange={handleChange}
          />
          <Form.Field
            name='description'
            control={TextArea}
            label='Description'
            placeholder='What about the education..'
            onChange={handleChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove'/> Cancel
        </Button>
        <Button color='green' onClick={handleSubmit}>
          <Icon name='checkmark'/> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddEducationModal