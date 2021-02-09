
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

