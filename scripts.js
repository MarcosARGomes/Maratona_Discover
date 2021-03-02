
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

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions",JSON.stringify(transactions))
    }
}

const Transaction = {
    
    
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
        

       
    },

    remove(index){
        Transaction.all.splice(index,1)

        App.reload()
    },

    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            };
        });
        return income
    },

    expenses(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                income += transaction.amount;
            };
        });
        return income
    },

    total(){
        return Transaction.expenses() + Transaction.incomes();

    }
    

}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction,index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction,index){

        const CSSclass = transaction.amount > 0 ? "income": "expenses"
        const amount = Utils.formatCurrency(transaction.amount)
        

        const html = 
        `
            <td class="description">${transaction.description}</td>
            <td  class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="Remover Transação">
             </td>
        
        `
        return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
    
        document
            .getElementById('expensesDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
    
    
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {

    formatAmount(value){
        value = value *100

     

        return Math.round(value)
    },

    formatDate(date){
        const splittedDate = date.split("-")
        
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g,"")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })


        
        return signal + value
    }
   
}

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description:Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

        
 

    validateFields(){
        const{description, amount,date} = Form.getValues()
        if(description.trim() === "" ||
            amount.trim()==="" ||
            date.trim() === "" ){
                throw new Error ("Por favor, preencha todos os campos")
        }
    },

    formatValues(){
        let {description, amount,date} = Form.getValues()

        amount= Utils.formatAmount(amount)

        date=Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }
    },
    
    saveTrasaction(transaction){
        Transaction.add(transaction)

    },

    clearFields(){
        Form.description.value= ""
        Form.amount.value=""
        Form.date.value=""
    },

    submit(event){
       
        event.preventDefault()

        try{
            Form.validateFields() //validar dados
            const transaction = Form.formatValues()//formatar valores dos campos
            Form.saveTrasaction(transaction) // salvar
            Form.clearFields()//limpar os campos do formulario
            Modal.close()//fechar a tela
        }catch (error){
            alert(error.message)
        }


        
    }


}

const App= {
    init() {
        Transaction.all.forEach( (transaction, index) => {
            DOM.addTransaction(transaction,index)
        })
        
        DOM.updateBalance()
        
        Storage.set(Transaction.all)
    },

    reload () {
        DOM.clearTransactions()
        App.init()

    },
}




App.init ()

Form.submit()
