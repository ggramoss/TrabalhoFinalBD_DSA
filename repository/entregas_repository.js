const {Client} = require ('pg')

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12345',
    database: 'postgres',
};


async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM entregas')
    const listaentregas = res.rows;
    await cliente.end();
    return listaentregas;
}

async function buscarPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM entregas WHERE id=$1',[id]);
    const entrega = res.rows[0];
    await cliente.end();
    return entrega;
}

async function inserir(entrega) {
    const sql =
      'INSERT INTO entregas (id, remetente, destinatario, endereco, data_envio) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [
      entrega.id,
      entrega.remetente,
      entrega.destinatario,
      entrega.endereco,
      entrega.data_envio,
    ];
  
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql, values);
    const entregaInserida = res.rows[0];
    await cliente.end();
    return entregaInserida;
  }
async function atualizar(id, entrega) {
    const sql = 'UPDATE entregas set remetente=$1, destinatario=$2, endereco=$3, data_envio=$4 WHERE id=$5 RETURNING *'
    const values = [
        entrega.remetente,
        entrega.destinatario,
        entrega.endereco,
        entrega.data_envio,
        entrega.id
      ];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const entregaAtualizada = res.rows[0];
    await cliente.end();
    return entregaAtualizada;    
}

async function deletar(id) {
    const sql = 'DELETE FROM entregas WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const entregaDeletada = res.rows[0];
    await cliente.end();
    return entregaDeletada ;    
}
module.exports = { 
    listar,
    buscarPorId, 
    inserir,
    atualizar,
    deletar
}
