import css from './form.module.css'

const Form = () => {
  return (
    <>
      <h1>Email Mailing</h1>
      <form action="">
        <div className={css.formCont}>
            <label>
              <span>Enter campaing name</span>
              <input name='name' type="text" />
            </label>
            <label>
              <span>Choice email domain</span>
              <input name='email' type="text" />
            </label>
            <label>
              <span>Select proxy </span>
              <select name="proxy" id=""></select>
            </label>
            <div>
                <label>
                  <span>Select a group </span>
                  <select name="group" id=""></select>
                </label>
                <label>
                  <span>Select a amount </span>
                  <input name='amount' type="text" />
                </label>
            </div>
            <label>
              <span>Choice email template</span>
              <select name="template" id=""></select>
            </label>
        </div>
        <button type='submit'>Start</button>
      </form>
    </>
  );
};

export default Form;
