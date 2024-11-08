const pool = require('../config/db');

exports.inserirCep = async (req, res) => {
    const { cep, rua, bairro, cidade, estado } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO endereco (cep, rua, bairro, cidade, estado)values($1, $2, $3, $4, $5)RETURNING *', [cep, rua, bairro, cidade, estado]
        )
        res.status(201).json({
            message: 'Cep inserido com sucesso',
            dados: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error ao inserir o cep" })
    }
}

exports.buscarCep = async (req, res) => {
    const { cep } = req.params
    try {
        const result = await pool.query("SELECT id, enderecoCompleto from endereco where cep = $1", [cep]
        )
        if (result.rows.length > 0) {
            res.status(201).json(result.rows[0])
        } else {
            res.status(404).json({ message: "Não foi encontrado o cep" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Não foi encontrado o endereço" })
    }

}

exports.buscarPorid = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT * from endereco where id = $1", [id])
        if (result.rows.length > 0) {
            res.status(201).json(result.rows[0])
        } else {
            res.status(404).json({ message: "Não consegui achar nenhum endereço" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "não foi encontrado o endereço por id" })
    }
}

exports.filtrarPorCidade = async (req, res) => {
    const { cidade } = req.query
    let filtro = [];
    try {
        const result = await pool.query("SELECT id, enderecoCompleto from endereco where cidade = $1", [cidade])
        if (result.rows.length > 0) {
            for (i = 0; i < result.rows.length; i++) {
                filtro.push(result.rows[i])
            }
            res.status(201).json(filtro)

        } else {
            res.status(404).json({ message: "não foi possivel filtrar pela cidade" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "não foi possivel achar o cep" })
    }
}

exports.updateEndereco = async (req, res) => {
    const {campo, valor} = req.body
    const {id} = req.params
    try{
        const query = `UPDATE endereco SET ${campo} = $1 where id = $2 RETURNING *`
        const result = await pool.query(query, [valor, id])
        res.status(201).json({
            dados : result.rows[0],
            message : `${campo} foi atualizado`
        })
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Não conseguimos atualizar o seu endereço"})
    }
}

exports.deleteEndereco = async (req, res) =>{
    const {id} = req.params
    try{
        const result = await pool.query("DELETE from endereco where id = $1 RETURNING *", [id] )
        res.status(201).json(result.rows[0])
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'não foi possivel deletar o endereço desejado'})
    }
}