import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyOptions } from '../styles/NotifyOptions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, toggleFavorite } from 'redux/operations';
import { BsFillStarFill, BsFillPersonDashFill } from 'react-icons/bs';
import { getFilterContacts } from '../../redux/selectors';
import { ContactsList, ContactItem, Contact, DeleteButton, Icon } from './ContactList.styled.jsx';

export function ContactList() {
  const contacts = useSelector(getFilterContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = (id, name) => {
    dispatch(deleteContact(id));
    toast.info(`Contact with name ${name} has been deleted!`, NotifyOptions);
  };

  const handleToggleFavorite = (id, isFavorite, name) => {
    dispatch(toggleFavorite({ id, isFavorite, name }));
    if (isFavorite) {
      toast.info(`Contact with name ${name} has been removed from favorites!`, NotifyOptions);
    } else {
      toast.info(`Contact with name ${name} has been added to favorites!`, NotifyOptions);
    }
  };

  return (
    <ContactsList>
      {contacts.map(({ id, name, number, isFavorite }) => {
        return (
          <ContactItem key={id}>
            <Contact>
              {name}: {number}
            </Contact>
            <Icon
              isFavorite={isFavorite}
              onClick={() => handleToggleFavorite(id, isFavorite, name)}
            >
              <BsFillStarFill color={isFavorite ? 'yellow' : 'gray'} />
            </Icon>
            <DeleteButton onClick={() => handleDeleteContact(id, name)}>
              <BsFillPersonDashFill />
            </DeleteButton>
          </ContactItem>
        );
      })}
    </ContactsList>
  );
}
