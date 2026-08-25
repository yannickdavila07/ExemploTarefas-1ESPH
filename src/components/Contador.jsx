import {useState} from 'react'

const Contador = () => {

    // HOOK - userState - Manipula o estado da variável
    const [contador,setContador] = useState(0);


  return (
    <>
        <h2>Contagem Inicial: {contador}</h2>
        <button onClick={() => setContador(contador + 1)}>Aumentar</button>
        

    </>
  )
}

export default Contador
