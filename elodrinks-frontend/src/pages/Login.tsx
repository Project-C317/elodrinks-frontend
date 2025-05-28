const style = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #101820);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 500px; 
    max-width: none;
    overflow: hidden;
    transition: all 0.3s ease;
}
.form-container {
    padding: 40px 40px;
}
.form-toggle {
    display: flex;
    background: #f1f3f4;
    border-radius: 50px;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
}
.toggle-btn {
    flex: 1;
    padding: 12px 20px;
    text-align: center;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    color: #666;
    transition: all 0.3s ease;
    z-index: 2;
    position: relative;
}
.toggle-btn.active {
    color: white;
}
.toggle-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(135deg,#101820);
    border-radius: 50px;
    transition: transform 0.3s ease;
    z-index: 1;
}
.toggle-slider.signup {
    transform: translateX(100%);
}
.form-group {
    margin-bottom: 10px;
    position: relative;
}
.form-input {
    width: 100%;
    padding: 15px 20px;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.3s ease;
    color: #000; 
    background-color: #fff; 
}
.form-input:focus {
    outline: none;
    border-color: #101820;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.form-input::placeholder {
    color: #999;
}
.submit-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #101820);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}
.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}
.submit-btn:active {
    transform: translateY(0);
}
.forgot-password {
    text-align: center;
    margin-top: 20px;
}
.forgot-password a {
    color: #101820;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
}
.forgot-password a:hover {
    color: rgb(24, 70, 117);
    text-decoration: underline;
}
.form-section {
    display: none;
    animation: fadeIn 0.3s ease;
}
.form-section.active {
    display: block;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.success-message, .error-message {
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    display: none;
}
.success-message {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
.error-message {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
.show-password {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 14px;
}
@media (max-width: 480px) {
    .container {
        margin: 10px;
    }
    .form-container {
        padding: 30px 20px;
    }
}
`;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../services/api";
import { FiLock, FiUnlock } from "react-icons/fi";

type User = {
    id: number;
    name: string;
    surname: string;
    age: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
    createdAt: string;
};

function getInitialUsers(): User[] {
    const users = localStorage.getItem("users");
    if (users) return JSON.parse(users);
    const demoUsers = [
        {
            id: 1,
            name: "João",
            surname: "Silva",
            age: "30",
            cpf: "123.456.789-00",
            email: "joao@exemplo.com",
            phone: "(11) 91234-5678",
            password: "123456",
            createdAt: new Date().toISOString(),
        },
    ];
    localStorage.setItem("users", JSON.stringify(demoUsers));
    return demoUsers;
}

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
        {}
    );
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupSurname, setSignupSurname] = useState("");
    const [signupAge, setSignupAge] = useState("");
    const [signupCpf, setSignupCpf] = useState("");
    const [signupPhone, setSignupPhone] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
    const [users] = useState<User[]>(getInitialUsers);
    const navigate = useNavigate();

    const handleToggle = (login: boolean) => {
        setIsLogin(login);
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleShowPassword = (field: string) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await publicApi.loginUser({
                Email: loginEmail,
                Password: loginPassword,
            });

            const { token } = response.data;

            // Salva o token no localStorage
            localStorage.setItem("token", token);
            setErrorMessage("");

            setTimeout(() => {
                navigate("/home");
            }, 1500);
        } catch {
            setErrorMessage("Email ou senha incorretos!");
            setSuccessMessage("");
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
        setErrorMessage("As senhas não coincidem!");
        return;
    }

    try {
        const newUser = {
            Name: signupName,
            Surname: signupSurname,
            Age: signupAge,
            Cpf: signupCpf,
            Email: signupEmail,
            Phone: signupPhone,
            Password: signupPassword,
        };

        await publicApi.registerUser(newUser);

        setSuccessMessage("Conta criada com sucesso! Você pode fazer login agora.");
        setErrorMessage("");

        // Limpa os campos
        setSignupName("");
        setSignupSurname("");
        setSignupAge("");
        setSignupCpf("");
        setSignupEmail("");
        setSignupPhone("");
        setSignupPassword("");
        setSignupConfirmPassword("");

        setTimeout(() => {
            navigate("/"); 
        }, 2000);
    } catch {
        setErrorMessage("Erro ao criar conta. Verifique os dados e tente novamente.");
        setSuccessMessage("");
    }
};

    const handleForgotPassword = () => {
        const email = prompt("Digite seu email para recuperação de senha:");
        if (email) {
            const user = users.find((u) => u.email === email);
            if (user) {
                setSuccessMessage("Instruções de recuperação enviadas para seu email!");
                setErrorMessage("");
            } else {
                setErrorMessage("Email não encontrado!");
                setSuccessMessage("");
            }
        }
    };

    return (
        <>
            <style>{style}</style>
            <div className="container">
                <div className="form-container">
                    <div className="form-toggle">
                        <button
                            className={`toggle-btn${isLogin ? " active" : ""}`}
                            type="button"
                            onClick={() => handleToggle(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`toggle-btn${!isLogin ? " active" : ""}`}
                            type="button"
                            onClick={() => handleToggle(false)}
                        >
                            Cadastrar
                        </button>
                        <div
                            className={`toggle-slider${!isLogin ? " signup" : ""}`}
                            id="toggleSlider"
                        ></div>
                    </div>
                    <div
                        className="success-message"
                        id="successMessage"
                        style={{ display: successMessage ? "block" : "none" }}
                    >
                        {successMessage}
                    </div>
                    <div
                        className="error-message"
                        id="errorMessage"
                        style={{ display: errorMessage ? "block" : "none" }}
                    >
                        {errorMessage}
                    </div>
                    {/* Login Form */}
                    <div
                        className={`form-section${isLogin ? " active" : ""}`}
                        id="loginForm"
                    >
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group" style={{ position: "relative" }}>
                                <input
                                    type={showPassword.loginPassword ? "text" : "password"}
                                    className="form-input"
                                    id="loginPassword"
                                    placeholder="Senha"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => handleShowPassword("loginPassword")}
                                    tabIndex={-1}
                                >
                                    {showPassword.loginPassword ? <FiUnlock /> : <FiLock />}
                                </button>
                            </div>
                            <button type="submit" className="submit-btn">
                                Entrar
                            </button>
                        </form>
                        <div className="forgot-password">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleForgotPassword();
                                }}
                            >
                                Esqueceu a senha?
                            </a>
                        </div>
                    </div>
                    {/* Signup Form */}
                    <div
                        className={`form-section${!isLogin ? " active" : ""}`}
                        id="signupForm"
                    >
                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Nome"
                                    required
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Sobrenome"
                                    required
                                    value={signupSurname}
                                    onChange={(e) => setSignupSurname(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Idade"
                                    required
                                    value={signupAge}
                                    onChange={(e) => setSignupAge(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="CPF"
                                    required
                                    value={signupCpf}
                                    onChange={(e) => setSignupCpf(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Telefone"
                                    required
                                    value={signupPhone}
                                    onChange={(e) => setSignupPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Email"
                                    required
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group" style={{ position: "relative" }}>
                                <input
                                    type={showPassword.signupPassword ? "text" : "password"}
                                    className="form-input"
                                    placeholder="Senha"
                                    required
                                    minLength={6}
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => handleShowPassword("signupPassword")}
                                    tabIndex={-1}
                                >
                                    {showPassword.signupPassword ? <FiUnlock /> : <FiLock />}
                                </button>
                            </div>
                            <div className="form-group" style={{ position: "relative" }}>
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    className="form-input"
                                    placeholder="Confirmar senha"
                                    required
                                    value={signupConfirmPassword}
                                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() => handleShowPassword("confirmPassword")}
                                    tabIndex={-1}
                                >
                                    {showPassword.confirmPassword ? <FiUnlock /> : <FiLock />}
                                </button>
                            </div>
                            <button type="submit" className="submit-btn">
                                Criar Conta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
