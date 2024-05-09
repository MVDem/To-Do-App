import { useNavigate } from 'react-router-dom';
import styles from './sign.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../App';

function SignPage() {
  const state = useContext(UserContext);
  const navigate = useNavigate();
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get('username');
    e.currentTarget.reset();
    state?.user?.loginHandler!(userName as string);
    navigate('/active', { replace: true });
  };
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={(e) => handlerSubmit(e)} className={styles.form}>
        <input type="text" name="username" placeholder="username" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
export default SignPage;
