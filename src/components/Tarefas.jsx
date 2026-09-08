import {useState, useEffect} from 'react'
import '../css/estilo.css'

const Tarefas = () => {

    // Hook - useState - Manipula o estado da variável
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const[campo, setCampo] = useState("");
    // HOOK - useEffect - Realiza o efeito colateral, nesse exmplo vai mostrar a tarefa adicionada em tempo real
    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
    }, [tarefas])

    //Funcao Adicionar Tarefa
    const AdicionarTerafa = (e) =>{
      //Previne que a pagina se recarrege automaticamente
      e.preventDefault();
      //Valida se o campo estiver vazio
      if(!campo.trim()) return;

      //novo objeto
      const novaTarefa={
        id: Date.now(),
        texto:campo
      }

      setTarefas([...tarefas, novaTarefa]);
      setCampo('');

    }
    //FUNCAO REMOVER TAREFA
    const RemoverTarefa=(id) =>{
      //VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR
      //SE O ID FOR IGUAL (TAREFA QUE DESEJA APAGAR) A CONDICAO RETORNA FALSO
      // E O ITEM É EXCLUIDO
      const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id)
      setTarefas(apagarTarefa);
    }

  return (
    <div className='max-w-md mx-auto mt-10 bg-indigo-100 rounded-2xl shadow-2xl border-1'>
      <h1 className='text-2xl font-bold mb-5 text-center text-blue-700'>Minha Lista de Tarefas</h1>
      <form onSubmit={AdicionarTerafa} className='flex gap-2 mb-6'>
        <input 
          type="text"
          value={campo}
          onChange={(e) => setCampo(e.target.value)}
          placeholder='Digite sua Tarefa'
          className='flex-1 px-4 py-2 border border-gray-700 rounded-2xl focus:outline-none focus:ring-1 focus:border-transparent text-black placeholder:text-gray-700'
        />
        <button type='submit' className='bg-indigo-600 hover:bg-indigo-800 text-black font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer'>Adicionar</button>
      </form>

      <ul className='space-y-3 mb-2'>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className='flex items-center justify-between p-3 bg-indigo-600 border border-black-300 rounded-2xl shadow-sm hover:bg-indigo-800 transition-colors'>
            <span>{tarefa.texto}</span>
            <button onClick={() => RemoverTarefa(tarefa.id)} 
              
              
              className='flex items-center justify-between p-3 bg-amber-50 border border-black-300 rounded-2xl shadow-sm hover:bg-red-600 transition-colors'
              
              
              >Excluir</button
            
            
            
            
            >

          </li>
        ))}
      </ul>
      {/* COMPARA SE NAO TIVER TAREFAS
       */}
      {tarefas.length == 0 && <p className='text-center italic mt-4'>Nenhuma Tarefa Salva</p>}

    </div>
  )
}

export default Tarefas
