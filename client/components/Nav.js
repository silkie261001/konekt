import { useContext, useEffect, useState } from 'react';
import Link from 'next/Link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';
import { WindowsFilled } from '@ant-design/icons';

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState('');
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    window.localStorage.removeItem('auth');
    setState(null);
    router.push('/login');
  };
  return (
    <nav
      className='nav bg-dark d-flex justify-content-between'
      style={{ backgroundColor: 'grey' }}
    >
      <Link href='/'>
        <a className='nav-link text-light'>Konekt</a>
      </Link>

      <div className='dropdown'>
        <a
          className='btn btn-secondary dropdown-toggle'
          href='#'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          Dropdown link
        </a>
        <ul className='dropdown-menu'>
          <li>
            <a className='dropdown-item' href='#'>
              Action
            </a>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Another action
            </a>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Something else here
            </a>
          </li>
        </ul>
      </div>

      {state !== null ? (
        <>
          <Link href='/user/dashboard'>
            <a
              className={`nav-link text-light ${
                current === '/user/dashboard' && 'active'
              }`}
            >
              {state && state.user && state.user.name}
            </a>
          </Link>
          <a onClick={logout} className='nav-link text-light'>
            Logout
          </a>
        </>
      ) : (
        <>
          <Link href='/login'>
            <a
              className={`nav-link text-light ${
                current === '/login' && 'active'
              }`}
            >
              Login
            </a>
          </Link>

          <Link href='/register'>
            <a
              className={`nav-link text-light ${
                current === '/register' && 'active'
              }`}
            >
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
