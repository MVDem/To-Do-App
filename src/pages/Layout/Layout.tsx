import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoAddCircle } from 'react-icons/io5';

function Layout() {
  const state = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };
  return (
    <>
      <header className={styles.header}>
        {state?.user?.username && (
          <div
            className={isMenuOpen ? styles.burgerBtn : styles.burgerBtnActive}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <RxHamburgerMenu />
          </div>
        )}
      </header>
      <main className={styles.main}>
        {state?.user?.username && (
          <section className={styles.sidebar}>
            <div className={styles.avatarContainer}></div>

            <nav className={styles.nav}>
              <ul>
                <li>
                  <h2>Hi, {state?.user?.username} !</h2>
                </li>
                <li>
                  <NavLink to={'/active'}>Active To Do</NavLink>
                </li>
                <li>
                  <NavLink to={'/completed'}>Completed To Do</NavLink>
                </li>
                <li>
                  <NavLink to={'/categories'}>Categories</NavLink>
                </li>
              </ul>
            </nav>
          </section>
        )}
        <div
          className={!isMenuOpen ? styles.overlay : styles.overlaydesactive}
          onClick={handleOpenMenu}
        >
          <Outlet />
        </div>
        {state?.user?.username && (
          <section className={styles.create}>
            <NavLink to={'/create'} className={styles.createBtn}>
              <IoAddCircle />
            </NavLink>
          </section>
        )}
      </main>
      {/* <footer className={styles.footer}></footer> */}
    </>
  );
}
export default Layout;
