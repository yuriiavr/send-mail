import css from "./form.module.css";

const Form = () => {
  return (
    <div className={css.formSection}>
      <h1 className={css.title}>Email Mailing</h1>
      <form className={css.form} action="">
        <div className={css.formCont}>
          <label>
            <span>Enter campaing name</span>
            <input name="name" type="text" />
          </label>
          <label>
            <span>Choice email domain</span>
            <div className={css.selectStyles}>
              <img
                className={css.selectArrow}
                src={require("../../img/select-arrow.png")}
                alt=""
              />
              <select name="email" id=""></select>
            </div>
          </label>
          <label>
            <span>Select proxy </span>
            <div className={css.selectStyles}>
              <img
                className={css.selectArrow}
                src={require("../../img/select-arrow.png")}
                alt=""
              />
              <select className={css.smallInp} name="proxy" id=""></select>
            </div>
          </label>
          <div>
            <label>
              <span>Select a group </span>
              <div className={css.selectStyles}>
                <img
                  className={css.selectArrow}
                  src={require("../../img/select-arrow.png")}
                  alt=""
                />
                <select className={css.smallInp} name="group" id=""></select>
              </div>
            </label>
            <label>
              <span>Select a amount </span>
              <input className={css.smallInp} name="amount" type="text" />
            </label>
          </div>
          <label>
            <span>Choice email template</span>
            <div className={css.selectStyles}>
              <img
                className={css.selectArrow}
                src={require("../../img/select-arrow.png")}
                alt=""
              />
              <select name="proxy" id=""></select>
            </div>
          </label>
        </div>
        <button className={css.startButton} type="submit">Start</button>
      </form>
    </div>
  );
};

export default Form;
