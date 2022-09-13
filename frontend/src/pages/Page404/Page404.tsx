import React from 'react'
import { FaSadCry } from 'react-icons/fa'

const Page404: React.FC = () => {
  return (
    <section style={{
      width: '100vw',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ display: 'flex', gap: '10px' }}>
        <FaSadCry />
        Ops! Página não encontrada
      </h1>
    </section>
  )
}

export default Page404
