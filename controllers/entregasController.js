const repositoryEntregas = require('../repository/entregas_repository')

async function listar(req, res) {
  try{
    const listaEntregas = await repositoryEntregas.listar();
    res.json(listaEntregas);    

  }catch(error){
    console.error('Erro ao buscar a entrega:', error);
    res.status(404).json({ error: 'Erro ao buscar a entrega' });
  }

}

async function buscarPorId(req,res) {
  try{
    const id = req.params.id;
    const entrega = await repositoryEntregas.buscarPorId(id);
    if(entrega){
        res.status(201).json(entrega);
    }
    else {
        res.status(404).json(
            {
                numero: 404,
                msg: "Erro: Entrega não encontrado."
            }
        );
    }
  }catch(error){
    console.error('Erro ao buscar a entrega:', error);
    res.status(500).json({ error: 'Erro ao buscar a entrega' });

  }
}

async function inserir(req, res) {
    try {
      const entrega = req.body;
  
      if (
        entrega &&
        entrega.remetente &&
        entrega.destinatario &&
        entrega.endereco &&
        entrega.data_envio
      ) {
        const entregaInserida = await repositoryEntregas.inserir(entrega);
        res.status(201).json(entregaInserida);
      } else {
        res.status(400).json({
          numero: 400,
          msg: 'Erro: Os parâmetros de entrega estão inválidos',
        });
      }
    } catch (error) {
      console.error('Erro ao inserir a entrega:', error);
      res.status(500).json({ error: 'Erro ao inserir a entrega' });
    }
  }
  

  async function atualizar(req, res) {
    try {
      const id = req.params.id;
      const entrega = req.body;
  
      if (
        entrega &&
        entrega.remetente &&
        entrega.destinatario &&
        entrega.endereco &&
        entrega.data_envio
      ) {
        const entregaAlterada = await repositoryEntregas.atualizar(id, entrega);
        if (entregaAlterada) {
          res.json(entregaAlterada);
        } else {
          res.status(404).json({
            numero: 404,
            msg: 'Erro: Entrega não encontrada.',
          });
        }
      } else {
        res.status(400).json({
          numero: 400,
          msg: 'Erro: Os parâmetros de entrega estão inválidos',
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar a entrega:', error);
      res.status(500).json({ error: 'Erro ao atualizar a entrega' });
    }
  }

  async function deletar(req, res) {
    try {
      const id = req.params.id;
      const entregaDeletada = await repositoryEntregas.deletar(id);
      if (entregaDeletada) {
        res.json(entregaDeletada);
      } else {
        res.status(404).json({
          numero: 404,
          msg: 'Erro: Entrega não encontrada.',
        });
      }
    } catch (error) {
      console.error('Erro ao deletar a entrega:', error);
      res.status(500).json({ error: 'Erro ao deletar a entrega' });
    }
  }

module.exports = {
    listar,
    buscarPorId,
    inserir, 
    atualizar,
    deletar
}