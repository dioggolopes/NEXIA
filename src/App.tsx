import { useState } from 'react'
import './App.css'
import Dashboard from './Components/Dashboard'
import Sales from './Components/Sales'
function App() {
  const [screen, setScreen] = useState<
  'home' | 'login' | 'dashboard' | 'sales'
>('home')
  
 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin() {
    if (email === 'demo@nexia.com' && password === '123456') {
      setError('')
      setScreen('dashboard')
    } else {
      setError('E-mail ou senha incorretos.')
    }
  }

  if (screen === 'home') {
    return (
      <main className="nexia-page">
        <div className="background-glow"></div>

        <div className="nexia-content">

          <div className="brand-name">
            NEXIA
          </div>

          <h1>
            Inteligência que
            <br />
            <span>antecipa o futuro.</span>
          </h1>

          <p className="description">
            Transforme seus dados em decisões,
            oportunidades e crescimento.
          </p>

          <button
            className="enter-button"
            onClick={() => setScreen('login')}
          >
            Entrar na NEXIA
            <span>→</span>
          </button>

          <div className="security">
            <span className="status-dot"></span>
            Ambiente seguro
          </div>

        </div>

        <div className="version">
          NEXIA · 0.1
        </div>
      </main>
    )
  }

  if (screen === 'login') {
    return (
      <main className="login-page">

        <div className="background-glow"></div>

        <div className="login-box">

          <button
            className="back-link"
            onClick={() => setScreen('home')}
          >
            ← Voltar
          </button>

          <div className="login-brand">
            NEXIA
          </div>

          <h1>Bem-vindo de volta.</h1>

          <p>
            Acesse sua inteligência.
          </p>

          <div className="form">

            <label>E-mail</label>

            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label>Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleLogin()
                }
              }}
            />

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              className="login-button"
              onClick={handleLogin}
            >
              Acessar NEXIA
              <span>→</span>
            </button>

          </div>

          <div className="demo-info">
            <span>DEMO</span>
            <p>demo@nexia.com · 123456</p>
          </div>

        </div>

      </main>
    )
  }
if (screen === 'sales') {
  return <Sales />
}
 return (
  <Dashboard
    onOpenSales={() => setScreen('sales')}
  />
)
}

export default App