import { useState } from 'react'
import type { AIContext } from './Insights'

type NexiaAIProps = { context?: AIContext; onBack: () => void }
type Message = { role: 'assistant' | 'user'; text: string }

const suggestions = [
  'Quais indicadores exigem atenção?',
  'Onde estão as maiores oportunidades?',
  'Como posso aumentar minha margem?',
]

function NexiaAI({ context, onBack }: NexiaAIProps) {
  const [messages, setMessages] = useState<Message[]>(() =>
    context
      ? [
          {
            role: 'assistant',
            text: `Vamos analisar ${context.metric}. Tenho o contexto de ${context.value} (${context.variation}). O que você gostaria de aprofundar?`,
          },
        ]
      : [
          {
            role: 'assistant',
            text: 'Olá, sou a NEXIA IA. Posso transformar seus indicadores em decisões claras. Por onde começamos?',
          },
        ],
  )

  const [input, setInput] = useState(context?.question ?? '')
  const [isProcessing, setIsProcessing] = useState(false)
const [isAnswering, setIsAnswering] = useState(false)
  function sendMessage(question = input) {
    const text = question.trim()

    if (!text || isProcessing) return

    setMessages((current) => [...current, { role: 'user', text }])
    setInput('')
    setIsProcessing(true)

    window.setTimeout(() => {
  setMessages((current) => [
    ...current,
    {
      role: 'assistant',
      text: 'Encontrei sinais positivos nessa leitura. O crescimento está sustentado por recorrência e ticket médio; eu priorizaria acompanhar a margem por segmento para capturar a próxima oportunidade.'
    }
  ])

  setIsProcessing(false)
  setIsAnswering(true)

  window.setTimeout(() => {
    setIsAnswering(false)
  }, 1800)
}, 1100)
  }

  const aiState = isProcessing
    ? 'is-processing'
    : input.trim()
      ? 'is-typing'
      : ''

  return (
    <div className={`ai-page ${aiState} ${isAnswering ? 'is-answering' : ''}`}>
      <header className="ai-header">
        <button className="ai-back" onClick={onBack}>
          ← <span>Voltar aos Insights</span>
        </button>

        <div className="ai-status">
          <i>✦</i> NEXIA IA <span>Online</span>
        </div>
      </header>

      <main className="ai-shell glass-panel">
        {/* LUZ AMBIENTE DA IA */}
        <div className="ai-ambient-light" aria-hidden="true">
          <div className="ai-light-orb" />
          <div className="ai-light-orb ai-light-orb-secondary" />
        </div>
        <svg className="ai-edge-light" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
  <rect
    x="1"
    y="1"
    width="98"
    height="98"
    rx="4"
    fill="none"
    pathLength="1000"
  />
</svg>

        <div className="ai-intro">
          <div className="ai-orb">✦</div>
          <span>NEXIA INTELLIGENCE</span>

          <h1>
            Clareza para a sua <strong>próxima decisão.</strong>
          </h1>
        </div>

        <section className="ai-conversation" aria-live="polite">
          {messages.map((message, index) => (
            <div
              className={`ai-message ${message.role}`}
              key={`${message.role}-${index}`}
            >
              <span>{message.role === 'assistant' ? '✦' : 'Você'}</span>
              <p>{message.text}</p>
            </div>
          ))}

          {isProcessing && (
            <div className="ai-processing">
              <i />
              <i />
              <i />
              Analisando seus dados
            </div>
          )}
        </section>

        <div className="ai-composer">
          <div className="ai-input-wrap">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey
                ) {
                  event.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Pergunte sobre seu negócio..."
              rows={1}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isProcessing}
              aria-label="Enviar pergunta"
            >
              ↑
            </button>
          </div>

          <p>
            Pressione Enter para enviar · Dados simulados para demonstração
          </p>
        </div>
      </main>

      <section className="ai-suggestions">
        <span>COMECE POR AQUI</span>

        <div>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion}
              <b>→</b>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default NexiaAI