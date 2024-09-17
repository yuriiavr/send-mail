import { Link } from 'react-router-dom';
import css from './sideBar.module.css'

const SideBar = () => {
    
    return(
        <div className={css.sideBar}>
            <img className={css.logo} src={require('../../img/logo.png')} alt="logo" />
            <Link className={css.linkImg} to='/homepage'><img src={require('../../img/sender.png')} alt="sender" /></Link>
            <Link className={css.linkImg} to='/trackpage'><img src={require('../../img/table.png')} alt="table" /></Link>
        </div>
    )
};

export default SideBar;
