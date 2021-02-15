
const Modal = {
    open(){
        // Abrir modal
        // Adcionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },

    close(){
        // Fechar o modal
        // remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    { 
        id: 1,
        description: 'Luz',
        amount:-50000,
        date: '23/01/2021',
     
    },
    {    id: 2,
        description: 'Crição website',
        amount:500000,
        date: '23/01/2021',

    }
    {    id: 3,
        description: 'Internet',
        amount:-20000,
        date: '23/01/2021',

    }

]

const Transaction = {
    incomes(){
        //somar as entradas
    },

    expenses(){
        //somar as saídas
    },

    total(){
        // entradas - Saídas

    }
    

}


const DOM = {
    innerHTMLTransaction(){

        const html = `
        <tr>
            <td class="description">Luz</td>
            <td  class="expenses">- R$ 500,00</td>
            <td class="date">23/01/2021</td>
            <td>
                <img src="assets/minus.svg" alt="Remover Transação">
             </td>
        </tr>
        `
    }
}