import { Link, useNavigate } from "react-router-dom";
import css from "./LogInPage.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, loginUser } from "../../redux/auth/operations";
import { useNotifications } from '../../components/Notifications/Notifications';
import Container from "../../components/Container/Container";

export default function LogIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const { currentTarget: formRef } = event;
        const { email, password } = formRef.elements;
        const credentials = {
            email: email.value,
            password: password.value,
        };

        try {
            await dispatch(loginUser(credentials)).unwrap();
            showNotification("Login successful!", 'success');
            navigate("/", { replace: true });
            dispatch(fetchCurrentUser());

        } catch (error) {
            const errorMessage = error.message || "Invalid email or password. Please try again.";
            showNotification(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <div className={css.loginSection}>
                <h1 className={css.heading}>
                    Log In to Your Account
                </h1>

                <form className={css.form} onSubmit={handleSubmit}>
                    <label className={css.label}>
                        <span>Email</span>
                        <input
                            className={css.input}
                            name="email"
                            type="email"
                            required
                        />
                    </label>
                    <label className={css.label}>
                        <span>Password</span>
                        <input
                            className={css.input}
                            autoComplete="on"
                            name="password"
                            type="password"
                            required
                        />
                    </label>
                    <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log In"}
                    </button>
                    <span className={css.signupText}>
                        Don't have an account?{" "}
                        <Link className={css.link} to={"/signup"}>
                            Sign Up
                        </Link>
                    </span>
                </form>
            </div>
        </Container>
    );
}