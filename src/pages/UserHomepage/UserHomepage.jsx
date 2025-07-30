import Container from "../../components/Container/Container";
import { useAuth } from "../../hooks/useAuth";

const UserHomepage = () => {
    const { user } = useAuth();

    return(
        <Container>
            <h1>Вітаємо, {user.userName}, наразі ви бомж і не можете користуватись нашою СУПЕР АДМІН ПАНЕЛЮ. Тому не будьте лохом і офрмлюйте підписку "<a href="#">КРУТИЙ ПЕРЕЦЬ+"</a> щоб мати доступ до всіх функцій</h1> 
        </Container>
    )
}

export default UserHomepage