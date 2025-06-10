import { Link, useLocation } from 'react-router-dom';
import css from './sideBar.module.css';
import { useState } from 'react';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const openAdd = () => {
        setIsOpen(!isOpen);
    };

    const isHome = location.pathname === '/';
    const isTrack = location.pathname === '/trackpage';

    return (
        <div className={css.sideBar}>
            <img className={css.logo} src={require('../../img/logo.png')} alt="logo" />
            <Link className={css.linkImg} to='/'>
                <img
                    src={require(`../../img/${isHome ? 'mail-hover' : 'mail'}.png`)}
                    alt="mail"
                    style={{width: '30px'}}
                />
            </Link>
            <Link className={css.linkImg} to='/trackpage'>
                <img
                    src={require(`../../img/${isTrack ? 'stat-hover' : 'stat'}.png`)}
                    alt="stat"
                    style={{width: '30px'}}
                />
            </Link>
            <div style={{ position: 'relative' }}>
                <button className={css.button} onClick={openAdd}>
                    <img src={require('../../img/add.png')} alt="add" />
                </button>
                <div className={css.addCont} style={{ display: isOpen ? 'flex' : 'none' }}>
                    <Link className={css.link} to='/addTemplate'>Tamplate</Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;