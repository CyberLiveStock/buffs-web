import React from 'react';
import styles from './ModalFuncionarios.module.css';

const ModalFuncionarios = () => {
    return(
     //MODAL PARA ADICIONAR O FUNCIONÁRIO 
     <div className="modal fade" id="addFuncionarioModal" tabindex="-1" role="dialog"
     aria-labelledby="addFuncionarioModalLabel" aria-hidden="true">
        <div className={`modal-dialog ${styles.divModalDialog}`} role="document">
            <div class='modal-content'>
                {/* FORM - NO CODIGO DO 2 SEMESTRE ESTAVA FORM ACTON = "/CREATE FUNCIONARIO" METHOD = POST */}
                {/* mudar quando tiver a parte de criar funcionario atualizado */}
                <form>
                    
                </form>
            </div>

        </div>
     </div>

    )
}

export default ModalFuncionarios;